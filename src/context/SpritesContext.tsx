// import React, { createContext, useState } from "react";

// interface Sprite {
//   id: string;
//   position: { x: number; y: number };
//   movement: any;
// }

// interface SpritesContextType {
//   sprites: Sprite[];
//   updateSpritePosition: (
//     id: string,
//     position: { x: number; y: number }
//   ) => void;
//   playAllSprites: () => void;
// }

// export const SpritesContext = createContext<SpritesContextType | undefined>(
//   undefined
// );

// export const SpritesProvider: React.FC = ({ children }) => {
//   const [sprites, setSprites] = useState<Sprite[]>([]);

//   const updateSpritePosition = (
//     id: string,
//     position: { x: number; y: number }
//   ) => {
//     setSprites((prevSprites) =>
//       prevSprites.map((sprite) =>
//         sprite.id === id ? { ...sprite, position } : sprite
//       )
//     );
//   };

//   const playAllSprites = () => {
//     sprites.forEach((sprite) => {
//       // Trigger sprite animations here
//     });
//   };

//   return (
//     <SpritesContext.Provider
//       value={{ sprites, updateSpritePosition, playAllSprites }}
//     >
//       {children}
//     </SpritesContext.Provider>
//   );
// };

// src/context/SpritesContext.tsx
import React, { createContext, useState, ReactNode } from "react";
import Cat from "../assests/images/cat.svg";
interface Movement {
  type: "move" | "turn" | "goTo" | "repeat";
  value: number | { x: number; y: number };
}

export interface Sprite {
  id: string;
  position: { x: number; y: number };
  rotation: number;
  spriteImage: string;
  movement?: Movement[]; // Define a more specific type if possible
}

export interface SpritesContextType {
  sprites: Sprite[];
  updateSpritePosition: (
    id: string,
    position: { x: number; y: number }
  ) => void;
  playAllSprites: () => void;
  addSprite: (sprite: Sprite) => void;
}

export const SpritesContext = createContext<SpritesContextType | undefined>(
  undefined
);

interface SpritesProviderProps {
  children: ReactNode;
}

export const SpritesProvider: React.FC<SpritesProviderProps> = ({
  children,
}) => {
  const [sprites, setSprites] = useState<Sprite[]>([]);

  const updateSpritePosition = (
    id: string,
    position: { x: number; y: number }
  ) => {
    setSprites((prevSprites) =>
      prevSprites.map((sprite) =>
        sprite.id === id ? { ...sprite, position } : sprite
      )
    );
  };

  const playAllSprites = () => {
    // Implement animation triggering logic here
    console.log("Playing all sprite animations");
  };

  const addSprite = (sprite: Sprite) => {
    setSprites((prevSprites) => [...prevSprites, sprite]);
  };

  return (
    <SpritesContext.Provider
      value={{ sprites, updateSpritePosition, playAllSprites, addSprite }}
    >
      {children}
    </SpritesContext.Provider>
  );
};
