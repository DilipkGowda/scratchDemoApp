// src/components/Sprite.tsx
import React from "react";
import { motion } from "framer-motion";
import { useDrag } from "react-dnd";
import { Sprite as SpriteType } from "../context/SpritesContext";

interface SpriteProps extends SpriteType {}

const Sprite: React.FC<SpriteProps> = ({
  id,
  position,
  rotation,
  spriteImage,
  movement,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "SPRITE",
    item: { id: 1 },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <motion.div
      ref={drag}
      className="absolute"
      style={{
        left: position.x,
        top: position.y,
        transform: `rotate(${rotation}deg)`,
      }}
      animate={{ x: position.x, y: position.y }}
      drag
    >
      <img src={spriteImage} alt="sprite" className="w-16 h-16" />
    </motion.div>
  );
};

export default Sprite;
