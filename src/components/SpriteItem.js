import React from "react";

const SpriteItem = React.memo(
  ({ sprite, index, actions, onAddMotions, onAddSprite, addingMotion, setNsprites, nsprites }) => {
    return (
      <div className="border border-black rounded-lg w-fit mb-4">
        <div className="overflow-y-auto p-2 relative">
          <img
            src={sprite.sprite}
            alt="Sprite Image"
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
            if (actions.includes(sprite.id)) return;
            onAddMotions({ sprite, index });
          }}
        >
          {actions.includes(sprite.id)
            ? "Motion Added"
            : addingMotion.isAdding && addingMotion.index === index
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
  }
);

export default SpriteItem;
