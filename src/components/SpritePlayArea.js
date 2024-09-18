import { useEffect, useRef, useState } from "react";
import { deepClone } from "../utils/shared";

export default function SpritePlayArea({ sprites, setPlay, play }) {
  const [motions, setMotions] = useState({});
  const [positions, setPositions] = useState({});
  const spriteRefs = useRef([]);

  console.log("spriteRefs", spriteRefs.current);
  useEffect(() => {
    let timers = [];

    const animateSprite = (sprite, position) => {
      let totalDelay = 0;
      let currentPosition = position || { x: 0, y: 0, rotate: 0 };
      let spriteStates = sprites.map((sprite) => ({
        id: sprite.id,
        motions: [...sprite.motions], // Clone motions to avoid modifying original data
        repeat: sprite.repeat,
      }));

      sprite.motions.forEach((motion, index) => {
        const delay = index * 500;
        totalDelay += delay;

        const timerId = setTimeout(() => {
          currentPosition = {
            x: currentPosition.x + (motion.action.x ?? 0),
            y: currentPosition.y + (motion.action.y ?? 0),
            rotate: currentPosition.rotate + (motion.action.rotate ?? 0),
          };

          setPositions((prev) => ({
            ...prev,
            [sprite.id]: currentPosition,
          }));

          setMotions((prev) => ({
            ...prev,
            [sprite.id]: `translate(${currentPosition.x}px, ${currentPosition.y}px) rotate(${currentPosition.rotate}deg)`,
          }));
          
          const currentSpriteRect =
            spriteRefs.current[index]?.getBoundingClientRect();
          for (let i = 0; i < spriteRefs.current.length; i++) {
            if (i !== index) {
              const otherSpriteRect =
                spriteRefs.current[i]?.getBoundingClientRect();
              console.log(
                "positions",
                checkCollision(currentSpriteRect, otherSpriteRect)
              );
              if (
                otherSpriteRect &&
                currentSpriteRect &&
                checkCollision(currentSpriteRect, otherSpriteRect)
              ) {
                // Swap animations when a collision is detected
                const otherSprite = spriteStates.find(
                  (s) => s.id === sprites[i].id
                );
                if (otherSprite) {
                  // Swap motions
                  const tempMotions = [...spriteStates[index].motions];
                  spriteStates[index].motions = [...spriteStates[i].motions];
                  spriteStates[i].motions = [...tempMotions];

                  // Restart the animations for both characters after swap
                  animateSprite(spriteStates[index], index);
                  animateSprite(spriteStates[i], i);
                }
              }
            }
          }
        }, totalDelay);

        timers.push(timerId);
      });
      if (sprite.repeat) {
        const repeatTimerId = setTimeout(() => {
          animateSprite(sprite, currentPosition);
        }, totalDelay);

        timers.push(repeatTimerId);
      }
    };

    if (play && sprites.length) {
      sprites.forEach((sprite) => {
        const repeat =
          sprite?.motions?.filter((motion) => motion.motionName === "Repeat") ||
          [];
        if (sprite?.motions?.length) {
          animateSprite({ ...sprite, repeat: !!repeat.length });
        }
      });
    }
    return () => {
      timers.forEach((timerId) => clearTimeout(timerId));
    };
  }, [play, sprites]);

  const checkCollision = (rect1, rect2) => {
    console.log("rect1, rect2", { rect1, rect2 });
    return (
      rect1.left < rect2.right &&
      rect1.right > rect2.left &&
      rect1.top < rect2.bottom &&
      rect1.bottom > rect2.top
    );
  };

  return (
    <div className="h-full w-full flex justify-center flex-col">
      <div
        className="mt-2 ml-4 bg-blue-500 w-[70px] flex justify-center items-center text-center rounded-xl text-white cursor-pointer"
        onClick={() => setPlay(!play)}
      >
        {play ? "Stop" : "Play"}
      </div>
      <div className="flex-1 h-full overflow-auto flex justify-center items-center">
        {!!sprites.length &&
          sprites.map((sprite, index) => (
            <div
              ref={(el) => (spriteRefs.current[index] = el)}
              key={sprite?.id + "wrapper"}
              className="flex-none overflow-y-auto p-2"
              style={{
                transform: play && motions[sprite.id] ? motions[sprite.id] : "",
                transition: play && "transform 0.6s linear",
              }}
            >
              <img
                key={sprite.id}
                src={sprite.sprite}
                alt="Sprite"
                className="aspect-square w-[100] h-[100px]"
              />
            </div>
          ))}
      </div>
    </div>
  );
}
