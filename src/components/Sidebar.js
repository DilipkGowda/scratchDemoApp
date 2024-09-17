import React from "react";
import { useState } from "react";
import { Motions } from "../constants";
import MotionButton from "./Button";
import { deepClone } from "../utils/shared";

export default function Sidebar({ handleOnAddAction }) {
  const [selectedActions, setSelectedActions] = useState([]);
  const [dragData, setDragData] = useState({});

  function handleDragStart(e, data) {
    setDragData(data);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(group) {
    if (group !== "Action") return;
    setSelectedActions((prevActions) => [...prevActions, dragData]);
  }

  return (
    <div
      key="sideBarContainer"
      className="w-[30%] h-full flex flex-row items-start p-2 border-r border-gray-200"
    >
      <div
        key="sideBarInnerContainer"
        className="w-full h-full overflow-y-auto flex flex-row justify-between p-2"
      >
        <div
          key={"motionsContainer"}
          onDragOver={handleDragOver}
          onDrop={() => handleDrop("Motion")}
          className="w-[45%] border-r border-gray-200 px-2"
        >
          <h1 className="font-bold"> {"Motion"} </h1>
          {Motions.map((motion) => (
            <div
              key={motion.id + "motion"}
              draggable
              onDragStart={(e) => handleDragStart(e, motion)}
              className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
            >
              {motion.motionName}
            </div>
          ))}
        </div>
        <div
          key={"ActionsContainer"}
          onDragOver={handleDragOver}
          onDrop={() => handleDrop("Action")}
          className="w-[45%] relative"
        >
          <h1 className="font-bold"> {"Actions"} </h1>
          {!!selectedActions.length &&
            selectedActions.map((motion, index) => (
              <div key={motion.id + "action"} className="w-full relative">
                <div
                  className="absolute right-[-2px] top-[-5px] h-[15px] w-[15px] rounded-full bg-red-500 font-bold flex text-center items-center justify-center"
                  onClick={() => {
                    const temp = deepClone(selectedActions);
                    temp.splice(index, 1);
                    setSelectedActions(temp);
                  }}
                >
                  <h6 className="text-white">{"x"}</h6>
                </div>
                <div
                  key={motion.id}
                  draggable={false}
                  onDragStart={(e) => handleDragStart(e, motion)}
                  className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
                >
                  {motion.motionName}
                </div>
              </div>
            ))}
          <div
            className="w-3/4 h-[30px] bg-black text-white justify-center items-center text-center flex self-center absolute bottom-7 cursor-pointer"
            onClick={() => {
              handleOnAddAction(selectedActions);
            }}
          >
            {"DONE"}
          </div>
        </div>
      </div>
    </div>
  );
}
