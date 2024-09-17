// src/utils/collisionDetection.ts
import { Sprite } from "../context/SpritesContext";

export const detectCollision = (sprite1: Sprite, sprite2: Sprite): boolean => {
  const rect1 = {
    x: sprite1.position.x,
    y: sprite1.position.y,
    width: 64, // Assuming sprite width
    height: 64, // Assuming sprite height
  };
  const rect2 = {
    x: sprite2.position.x,
    y: sprite2.position.y,
    width: 64,
    height: 64,
  };

  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.height + rect1.y > rect2.y
  );
};
