// import Sidebar from "./components/Sidebar";
// import SpritePlayArea from "./components/SpritePlayArea";
// import SpritesSelectArea from "./components/SpritesSelectArea";
// import { useState } from "react";
// import { deepClone } from "./utils/shared";

// export default function App() {
//   const [play, setPlay] = useState(false);
//   const [selectedActions, setSelectedActions] = useState([]);
//   const [addingMotion, setAddingMotion] = useState({
//     isAdding: false,
//     index: null,
//   });
//   const [selectedSprites, setSelectedSprites] = useState([]);
//   const [selectedSprite, setSelectedSprite] = useState([]);
//   const [actions, setActions] = useState([]);
//   function onAddSprite({ sprite }) {
//     setSelectedSprites((prevSprites) => [...prevSprites, sprite]);
//   }

//   function onAddMotions({ sprite, index }) {
//     setSelectedSprite(sprite);
//     setAddingMotion({
//       isAdding: true,
//       index,
//     });
//   }

//   function handleOnAddAction(newActions, id) {
//     if (!selectedSprite) return;
//     let actionsCopy = deepClone(actions);
//     const copyIndex = actionsCopy.findIndex((action) => action.id === id);
//     if (copyIndex > -1) {
//       actionsCopy[copyIndex]["motions"] = newActions;
//     } else {
//       actionsCopy.push({
//         id,
//         motions: newActions,
//         spriteId: selectedSprite.id,
//       });
//     }
//     let copySelectedSprites = deepClone(selectedSprites);
//     const selectedIndex = copySelectedSprites.findIndex(
//       (sprite) => sprite.id === selectedSprite.id
//     );
//     copySelectedSprites[selectedIndex]["motions"] = newActions;
//     setSelectedSprites(copySelectedSprites);
//     setActions(actionsCopy);
//     setAddingMotion({
//       isAdding: false,
//       index: null,
//     });
//     setSelectedSprite(null);
//   }

//   return (
//     <div className="bg-white font-sans h-full w-full">
//       <div className="h-full overflow-hidden flex flex-row  ">
//         <Sidebar
//           handleOnAddAction={handleOnAddAction}
//           actions={actions}
//           setSelectedActions={setSelectedActions}
//           selectedActions={selectedActions}
//           selectedSprite={selectedSprite}
//         />
//         <SpritePlayArea
//           sprites={selectedSprites}
//           setPlay={setPlay}
//           play={play}
//         />
//         <SpritesSelectArea
//           onAddSprite={onAddSprite}
//           onAddMotions={onAddMotions}
//           actions={actions.map((i) => i.spriteId)}
//           addingMotion={addingMotion}
//         />
//       </div>
//     </div>
//   );
// }

import Sidebar from "./components/Sidebar";
import SpritePlayArea from "./components/SpritePlayArea";
import SpritesSelectArea from "./components/SpritesSelectArea";
import { SpriteProvider } from "./context/SpriteContext";

export default function App() {
  return (
    <SpriteProvider>
      <div className="bg-white font-sans h-full w-full">
        <div className="h-full overflow-hidden flex flex-row">
          <Sidebar />
          <SpritePlayArea />
          <SpritesSelectArea />
        </div>
      </div>
    </SpriteProvider>
  );
}
