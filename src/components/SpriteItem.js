import React, { useContext } from "react";
import { SpriteContext } from "../context/SpriteContext";

const SpriteItem = React.memo(({ sprite, index, setNsprites, nsprites }) => {
  const { actions, onAddMotions, onAddSprite, addingMotion } =
    useContext(SpriteContext);

  return (
    <div className="border border-black rounded-lg w-fit mb-4">
      <div className="overflow-y-auto p-2 relative">
        <img
          src={sprite.sprite}
          className="aspect-square w-[100px] h-[100px]"
        />
      </div>
      <h3
        className={`font-semibold text-white bg-black ${
          sprite.isAdded && "rounded-b-lg"
        } text-center ${
          !actions.includes(sprite.id) ? "cursor-pointer" : "cursor-default"
        }`}
        onClick={() => {
          onAddMotions({ sprite, index });
        }}
      >
        {addingMotion.isAdding && addingMotion.index === index
          ? "Adding..."
          : "Add Motion"}
      </h3>

      <h3
        className={`font-semibold text-white ${
          sprite.isAdded ? "hidden" : "bg-teal-400"
        } rounded-b-lg text-center cursor-pointer`}
        onClick={() => {
          onAddSprite({ sprite });
          const duplicate = structuredClone(nsprites);
          duplicate[index]["isAdded"] = !sprite.isAdded;
          setNsprites(duplicate);
        }}
      >
        {"Add Sprite"}
      </h3>
    </div>
  );
});

export default SpriteItem;
