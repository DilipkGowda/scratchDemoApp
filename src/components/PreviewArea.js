import React, { useMemo } from "react";
import { useState } from "react";
import { sprites } from "../constants";
import MotionButton from "./Button";
// import Man1 from "../assests/images/Man1.png";
// import Man2 from "../assests/images/Man2.png";
// import Man3 from "../assests/images/Man3.png";

// const sprites = [Man1, Man2, Man3];
export default function SpritesSelector({ onAddSprite }) {
  const [nsprites, setNsprites] = useState(sprites);
  return (
    <div className="w-[15%] h-full overflow-hidden flex flex-col items-center bg-white border-t border-l border-gray-200 px-3">
      <h1 className="mt-5 mb-3 font-bold">{"Sprites"}</h1>
      <div className="flex-1 flex-col relative">
        {nsprites.map((sprite, index) => (
          <div
            key={"sprite" + sprite.id + "container"}
            className="border border-black rounded-lg w-fit mb-4"
          >
            <div className="flex-none overflow-y-auto p-2">
              <img
                key={sprite.id}
                src={sprite.sprite}
                alt="Sprite Image"
                className="aspect-square w-[150] h-[100px]"
              />
            </div>
            <h3
              className={`font-semibold text-white ${
                sprite.isAdded ? "hidden" : "bg-teal-400"
              } rounded-b-lg text-center cursor-pointer`}
              onClick={() => {
                onAddSprite({sprite});
                const duplicate = structuredClone(nsprites);
                duplicate[index]["isAdded"] = !sprite.isAdded;
                setNsprites(duplicate);
              }}
            >
              {sprite.isAdded ? "Remove Sprite" : "Add Sprite"}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}
