/* eslint-disable jsx-a11y/img-redundant-alt */
import { useState } from "react";
import { sprites } from "../constants";

export default function SpritesSelectArea({
  onAddSprite,
  onAddMotions,
  actions,
  addingMotion,
}) {
  const [nsprites, setNsprites] = useState(sprites);
  console.log("addingMotion", addingMotion);
  return (
    <div className="w-[15%] h-full overflow-hidden flex flex-col items-center bg-white border-t border-l border-gray-200 px-3">
      <h1 className="mt-5 mb-3 font-bold">{"Sprites"}</h1>
      <div className="flex-1 flex-col relative">
        {nsprites.map((sprite, index) => (
          <div
            key={"sprite" + sprite.id + "container"}
            className="border border-black rounded-lg w-fit mb-4"
          >
            <div className="overflow-y-auto p-2 relative">
              <img
                key={sprite.id}
                src={sprite.sprite}
                alt="Sprite Image"
                className="aspect-square w-[100] h-[100px]"
              />
            </div>
            <h3
              className={`font-semibold text-white bg-black ${
                sprite.isAdded && "rounded-b-lg"
              } text-center ${
                !actions.includes(sprite.id)
                  ? "cursor-pointer"
                  : "cursor-default"
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
        ))}
      </div>
    </div>
  );
}
