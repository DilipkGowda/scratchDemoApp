// src/components/PlayButton.tsx
import React from "react";
import useSpritesContext from "../context/userSpritesContext";

const PlayButton: React.FC = () => {
  const { playAllSprites } = useSpritesContext();

  return (
    <button
      onClick={playAllSprites}
      className="bg-red-500 text-white p-3 rounded-full"
    >
      Play All Animations
    </button>
  );
};

export default PlayButton;
