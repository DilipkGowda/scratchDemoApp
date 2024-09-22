import { useEffect, useRef, useState, lazy, useContext, Suspense } from "react";
import { SpriteContext } from "../context/SpriteContext";
import { deepClone } from "../utils/shared";

const Sprite = lazy(() => import("./Sprite"));

export default function SpritePlayArea() {
  const [motions, setMotions] = useState({});
  const spriteRefs = useRef([]);
  const collisionDetectedRef = useRef(false);
  const { selectedSprites, setPlay, play } = useContext(SpriteContext);

  const checkCollision = (rect1, rect2) => {
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    );
  };

  useEffect(() => {
    if (!selectedSprites?.length) return;
    let timers = [];
    let spriteStates = selectedSprites.map((sprite) => {
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
      let currentPosition = currPos || { x: 0, y: 0, rotate: 0 };

      const animateStep = (motionIndex) => {
        if (motionIndex >= sprite.motions.length) {
          if (sprite.repeat) {
            animateStep(0);
          }
          return;
        }

        const motion = sprite.motions[motionIndex];
        const nextPosition = {
          x: currentPosition.x + (motion.action.x ?? 0),
          y: currentPosition.y + (motion.action.y ?? 0),
          rotate: currentPosition.rotate + (motion.action.rotate ?? 0),
        };

        const duration = 500;

        const startTime = performance.now();
        const updatePosition = (time) => {
          const elapsedTime = time - startTime;
          const progress = Math.min(elapsedTime / duration, 1);
          const interpolatedPosition = {
            x:
              currentPosition.x +
              (nextPosition.x - currentPosition.x) * progress,
            y:
              currentPosition.y +
              (nextPosition.y - currentPosition.y) * progress,
            rotate:
              currentPosition.rotate +
              (nextPosition.rotate - currentPosition.rotate) * progress,
          };
          setMotions((prev) => ({
            ...prev,
            [sprite.id]: `translate(${interpolatedPosition.x}px, ${interpolatedPosition.y}px) rotate(${interpolatedPosition.rotate}deg)`,
          }));
          const currentSpriteRect =
            spriteRefs.current[index]?.getBoundingClientRect();
          if (currentSpriteRect) {
            for (let i = 0; i < spriteRefs.current.length; i++) {
              if (i !== index && !collisionDetectedRef.current) {
                const otherSpriteRect =
                  spriteRefs.current[i]?.getBoundingClientRect();

                if (
                  otherSpriteRect &&
                  checkCollision(currentSpriteRect, otherSpriteRect)
                ) {
                  collisionDetectedRef.current = true;
                  const otherSprite = spriteStates.find(
                    (s) => s.id === selectedSprites[i].id
                  );
                  if (otherSprite) {
                    const tempMotions = [...spriteStates[index].motions];
                    const tempSpriteStates = deepClone(spriteStates);
                    tempSpriteStates[index].motions = [
                      ...spriteStates[i].motions,
                    ];
                    tempSpriteStates[i].motions = [...tempMotions];
                    animateSprite(tempSpriteStates[index], index);
                    animateSprite(tempSpriteStates[i], i);
                  }
                  setTimeout(() => {
                    collisionDetectedRef.current = false;
                  }, 100);
                }
              }
            }
          }

          if (progress < 1) {
            window.requestAnimationFrame(updatePosition);
          } else {
            currentPosition = nextPosition;
            animateStep(motionIndex + 1);
          }
        };

        window.requestAnimationFrame(updatePosition);
      };

      animateStep(0);
    };

    if (play && selectedSprites.length) {
      spriteStates.forEach((sprite, index) => {
        if (sprite.motions.length) {
          animateSprite(sprite, index);
        }
      });
    } else {
      setMotions({});
    }

    return () => {
      timers.forEach((timerId) => clearTimeout(timerId));
    };
  }, [play, selectedSprites]);

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
          {selectedSprites.map((sprite, index) => (
            <Sprite
              key={sprite.id + "wrapper"}
              ref={(el) => (spriteRefs.current[index] = el)}
              sprite={sprite}
              motion={play ? motions[sprite.id] : ""}
            />
          ))}
        </Suspense>{" "}
      </div>
    </div>
  );
}
