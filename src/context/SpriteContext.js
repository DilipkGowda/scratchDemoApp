import { createContext, useState } from "react";
import { deepClone } from "../utils/shared";

export const SpriteContext = createContext();

export function SpriteProvider({ children }) {
  const [play, setPlay] = useState(false);
  const [selectedActions, setSelectedActions] = useState([]);
  const [addingMotion, setAddingMotion] = useState({
    isAdding: false,
    index: null,
  });
  const [selectedSprites, setSelectedSprites] = useState([]);
  const [selectedSprite, setSelectedSprite] = useState(null);
  const [actions, setActions] = useState([]);

  function onAddSprite({ sprite }) {
    setSelectedSprites((prevSprites) => [...prevSprites, sprite]);
  }

  function onAddMotions({ sprite, index }) {
    setSelectedSprite(sprite);
    setAddingMotion({
      isAdding: true,
      index,
    });
  }

  function handleOnAddAction(newActions, id) {
    if (!selectedSprite) return;
    let actionsCopy = deepClone(actions);
    const copyIndex = actionsCopy.findIndex((action) => action.id === id);
    if (copyIndex > -1) {
      actionsCopy[copyIndex]["motions"] = newActions;
    } else {
      actionsCopy.push({
        id,
        motions: newActions,
        spriteId: selectedSprite.id,
      });
    }
    let copySelectedSprites = deepClone(selectedSprites);
    const selectedIndex = copySelectedSprites.findIndex(
      (sprite) => sprite.id === selectedSprite.id
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
    <SpriteContext.Provider
      value={{
        play,
        setPlay,
        selectedActions,
        setSelectedActions,
        addingMotion,
        setAddingMotion,
        selectedSprites,
        setSelectedSprites,
        selectedSprite,
        setSelectedSprite,
        actions,
        setActions,
        onAddSprite,
        onAddMotions,
        handleOnAddAction,
      }}
    >
      {children}
    </SpriteContext.Provider>
  );
}
