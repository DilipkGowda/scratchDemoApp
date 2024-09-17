import React from "react";
import useSpritesContext from "../context/userSpritesContext";
import { Icon } from "./Icon";
import MotionControls from "./MotionControls";

function Motions() {
  const { sprites, updateSpritePosition } = useSpritesContext();

  const handleMove = (steps: number) => {
    // Handle move logic for sprites (e.g., move the first sprite as an example)
    if (sprites.length > 0) {
      const firstSprite = sprites[0];
      const newPosition = {
        x: firstSprite.position.x + steps,
        y: firstSprite.position.y,
      };
      updateSpritePosition(firstSprite.id, newPosition);
    }
  };

  const handleTurn = (degrees: number) => {
    // Handle turning logic
    console.log(`Turn ${degrees} degrees`);
  };

  const handleGoTo = (x: number, y: number) => {
    // Handle GoTo logic
    if (sprites.length > 0) {
      const firstSprite = sprites[0];
      updateSpritePosition(firstSprite.id, { x, y });
    }
  };
  return (
    <MotionControls
      onMove={handleMove}
      onTurn={handleTurn}
      onGoTo={handleGoTo}
    />

    // <div className="w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200">
    //   <div className="font-bold"> {"Events"} </div>
    //   <div className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
    //     {"When "}
    //     <Icon name="flag" size={15} className="text-green-600 mx-2" />
    //     {"clicked"}
    //   </div>
    //   <div className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
    //     {"When this sprite clicked"}
    //   </div>
    //   <div className="font-bold"> {"Motion"} </div>
    //   <div className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
    //     {"Move 10 steps"}
    //   </div>
    //   <div className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
    //     {"Turn "}
    //     <Icon name="undo" size={15} className="text-white mx-2" />
    //     {"15 degrees"}
    //   </div>
    //   <div className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
    //     {"Turn "}
    //     <Icon name="redo" size={15} className="text-white mx-2" />
    //     {"15 degrees"}
    //   </div>
    // </div>
  );
}

export default Motions;
