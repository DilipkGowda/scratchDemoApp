import { useEffect, useRef, useState, Suspense, lazy } from "react";

const Sprite = lazy(() => import("./Sprite"));

export default function SpritePlayArea({ sprites, setPlay, play }) {
  const [positions, setPositions] = useState({});
  const [motions, setMotions] = useState({});
  const spriteRefs = useRef([]);
  const collisionDetectedRef = useRef(false);

  const checkCollision = (rect1, rect2) => {
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    );
  };

  useEffect(() => {
    let timers = [];
    let spriteStates = sprites.map((sprite) => {
      const repeat = sprite?.motions?.some(
        (motion) => motion.motionName === "Repeat"
      );
      return {
        id: sprite.id,
        motions: sprite?.motions ? [...sprite.motions] : [],
        repeat,
      };
    });

    const animateSprite = (sprite, index, currPos) => {
      let totalDelay = 0;
      let currentPosition = currPos || { x: 0, y: 0, rotate: 0 };

      sprite.motions.forEach((motion, motionIndex) => {
        const delay = motionIndex * 1000;
        totalDelay += delay;

        const timerId = setTimeout(() => {
          currentPosition = {
            x: currentPosition.x + (motion.action.x ?? 0),
            y: currentPosition.y + (motion.action.y ?? 0),
            rotate: currentPosition.rotate + (motion.action.rotate ?? 0),
          };

          setPositions((prev) => ({ ...prev, [sprite.id]: currentPosition }));
          setMotions((prev) => ({
            ...prev,
            [sprite.id]: `translate(${currentPosition.x}px, ${currentPosition.y}px) rotate(${currentPosition.rotate}deg)`,
          }));

          const currentSpriteRect =
            spriteRefs.current[index]?.getBoundingClientRect();
          for (let i = 0; i < spriteRefs.current.length; i++) {
            if (i !== index && !collisionDetectedRef.current) {
              const otherSpriteRect =
                spriteRefs.current[i]?.getBoundingClientRect();
              if (
                otherSpriteRect &&
                currentSpriteRect &&
                checkCollision(currentSpriteRect, otherSpriteRect)
              ) {
                collisionDetectedRef.current = true;

                const otherSprite = spriteStates.find(
                  (s) => s.id === sprites[i].id
                );
                if (otherSprite) {
                  const tempMotions = [...spriteStates[index].motions];
                  spriteStates[index].motions = [...spriteStates[i].motions];
                  spriteStates[i].motions = [...tempMotions];

                  animateSprite(spriteStates[index], index, currentPosition);
                  animateSprite(spriteStates[i], i, currentPosition);
                }

                setTimeout(() => {
                  collisionDetectedRef.current = false;
                }, 1000);
              }
            }
          }
        }, totalDelay);

        timers.push(timerId);
      });

      if (sprite.repeat) {
        const repeatTimerId = setTimeout(() => {
          animateSprite(sprite, index, currentPosition);
        }, totalDelay);
        timers.push(repeatTimerId);
      }
    };

    if (play && sprites.length) {
      spriteStates.forEach((sprite, index) => {
        if (sprite.motions.length) {
          animateSprite(sprite, index);
        }
      });
    }

    return () => {
      timers.forEach((timerId) => clearTimeout(timerId));
    };
  }, [play, sprites]);

  return (
    <div className="h-full w-full flex justify-center flex-col">
      <div
        className="mt-2 ml-4 bg-blue-500 w-[70px] flex justify-center items-center text-center rounded-xl text-white cursor-pointer"
        onClick={() => setPlay(!play)}
      >
        {play ? "Stop" : "Play"}
      </div>
      <div className="flex-1 h-full overflow-auto flex justify-center items-center">
        <Suspense fallback={<div>Loading sprites...</div>}>
          {sprites.map((sprite, index) => (
            <Sprite
              key={sprite.id + "wrapper"}
              ref={(el) => (spriteRefs.current[index] = el)}
              sprite={sprite}
              motion={play ? motions[sprite.id] : ""}
            />
          ))}
        </Suspense>
      </div>
    </div>
  );
}
