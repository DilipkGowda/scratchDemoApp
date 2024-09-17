// src/components/SpriteArea.tsx
import React, { useEffect } from "react";
import Sprite from "./Sprite";
import { detectCollision } from "../utils/collisionDetection";
import useSpritesContext from "../context/userSpritesContext";

const SpriteArea: React.FC = () => {
  const { sprites, updateSpritePosition } = useSpritesContext();

  useEffect(() => {
    const checkCollisions = () => {
      for (let i = 0; i < sprites.length; i++) {
        for (let j = i + 1; j < sprites.length; j++) {
          if (detectCollision(sprites[i], sprites[j])) {
            // Swap animations on collision
            const temp = sprites[i].movement;
            sprites[i].movement = sprites[j].movement;
            sprites[j].movement = temp;
            // Optionally, update the state if necessary
          }
        }
      }
    };

    checkCollisions();
  }, [sprites]);

  return (
    <div className="relative w-full h-full bg-gray-200">
      {sprites.map((sprite) => (
        <Sprite key={sprite.id} {...sprite} />
      ))}
    </div>
  );
};

export default SpriteArea;
