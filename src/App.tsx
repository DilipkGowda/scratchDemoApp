// // src/App.tsx
// import React from "react";
// import SpriteArea from "./components1/SpriteArea";
// import PlayButton from "./components1/PlayButton";
// import { SpritesProvider } from "./context/SpritesContext";
// import Motions from "./components1/Motions";

// const App: React.FC = () => {
//   return (
//     <SpritesProvider>
//       <div className="container mx-auto p-4">
//         <PlayButton />
//         <Motions />
//         <SpriteArea />
//       </div>
//     </SpritesProvider>
//   );
// };

// export default App;

import Sidebar from "./components/Sidebar";
import MidArea from "./components/SpritePlayArea";
import SpritesSelector from "./components/PreviewArea";
import { useState } from "react";
import { sprites } from "./constants";
import { deepClone } from "./utils/shared";

export default function App() {
  const [selectedSprites, setSelectedSprites] = useState<{id: number; sprite: Node}[]>([]);
  const [actions, setActions] = useState<
    Array<{
      id: number;
      motions: {
        id: number;
        motionName: string;
        action: { x: number; y: number; rotate: number };
      }[];
    }>
  >([]);

  function onAddSprite({
    sprite,
  }: {
    sprite: { id: number; sprite: Node };
  }): void {
    setSelectedSprites(prevSprites => [...prevSprites, sprite]);
  }

  function handleOnAddAction(
    newActions: {
      id: number;
      motionName: string;
      action: { x: number; y: number; rotate: number };
    }[]
  ) {
    let actionsCopy = deepClone(actions);
    actionsCopy.push({ id: Math.floor(Math.random() * 100), motions: newActions });
    setActions(actionsCopy);
  }

  return (
    <div className="bg-blue-100 pt-6 font-sans h-full w-full">
      <div className="h-full overflow-hidden flex flex-row  ">
        <Sidebar handleOnAddAction={handleOnAddAction} />
        <MidArea sprites={selectedSprites} actions={actions} />
        <SpritesSelector onAddSprite={onAddSprite} />
      </div>
    </div>
  );
}
