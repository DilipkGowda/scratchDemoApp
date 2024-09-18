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
import SpritePlayArea from "./components/SpritePlayArea";
import SpritesSelectArea from "./components/SpritesSelectArea";
import { useState } from "react";
import { sprites } from "./constants";
import { deepClone } from "./utils/shared";

export default function App() {
  const [play, setPlay] = useState<boolean>(false);
  const [selectedActions, setSelectedActions] = useState([]);
  const [addingMotion, setAddingMotion] = useState<{
    isAdding: boolean;
    index: null | number;
  }>({
    isAdding: false,
    index: null,
  });
  const [selectedSprites, setSelectedSprites] = useState<
    {
      id: number;
      sprite: Node;
      motions?: Array<{
        id: number;
        motions: {
          id: number;
          motionName: string;
          action: { x: number; y: number; rotate: number };
        }[];
      }>;
    }[]
  >([]);
  const [selectedSprite, setSelectedSprite] = useState<{
    id: number;
    sprite: Node;
  } | null>(null);
  const [actions, setActions] = useState<
    Array<{
      id: number;
      motions: {
        id: number;
        motionName: string;
        action: { x: number; y: number; rotate: number };
      }[];
      spriteId: number;
    }>
  >([]);

  function onAddSprite({
    sprite,
  }: {
    sprite: { id: number; sprite: Node };
  }): void {
    setSelectedSprites((prevSprites) => [...prevSprites, sprite]);
  }

  function onAddMotions({
    sprite,
    index,
  }: {
    sprite: { id: number; sprite: Node };
    index: null | number;
  }) {
    setSelectedSprite(sprite);
    setAddingMotion({
      isAdding: true,
      index,
    });
  }

  function handleOnAddAction(
    newActions: {
      id: number;
      motionName: string;
      action: { x: number; y: number; rotate: number };
    }[]
  ) {
    if (!selectedSprite) return;
    let actionsCopy = deepClone(actions);
    actionsCopy.push({
      id: Math.floor(Math.random() * 100),
      motions: newActions,
      spriteId: selectedSprite.id,
    });
    let copySelectedSprites = deepClone(selectedSprites);
    const selectedIndex = copySelectedSprites.findIndex(
      (sprite: { id: number; sprite: Node }) => sprite.id === selectedSprite.id
    );
    copySelectedSprites[selectedIndex]["motions"] = newActions;
    setSelectedSprites(copySelectedSprites);
    setActions(actionsCopy);
    setAddingMotion({
      isAdding: false,
      index: null,
    });
    setSelectedSprite(null);
  }

  return (
    <div className="bg-blue-100 pt-6 font-sans h-full w-full">
      <div className="h-full overflow-hidden flex flex-row  ">
        <Sidebar
          handleOnAddAction={handleOnAddAction}
          actions={actions}
          setSelectedActions={setSelectedActions}
          selectedActions={selectedActions}
        />
        <SpritePlayArea
          sprites={selectedSprites}
          setPlay={setPlay}
          play={play}
        />
        <SpritesSelectArea
          onAddSprite={onAddSprite}
          onAddMotions={onAddMotions}
          actions={actions.map((i) => i.spriteId)}
          addingMotion={addingMotion}
          // selectedSprites={selectedSprites.map((i) => i.id)}
        />
      </div>
    </div>
  );
}
