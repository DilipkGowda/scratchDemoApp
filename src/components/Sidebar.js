import React from "react";
import { useState } from "react";
import { Motions } from "../constants";
import { deepClone } from "../utils/shared";

export default function Sidebar({
  handleOnAddAction,
  actions,
  setSelectedActions,
  selectedActions,
}) {
  // const [selectedActions, setSelectedActions] = useState([]);
  const [dragData, setDragData] = useState({});
  const [existingAction, setExistingAction] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(actions.length + 1 || 1);
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
          {Motions.map((motion, index) => (
            <div
              key={motion.id + "motion" + index}
              draggable
              onDragStart={(e) => handleDragStart(e, motion)}
              className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-move"
            >
              {motion.motionName}
            </div>
          ))}
        </div>
        <div key={"ActionsContainer"} className="w-[45%] relative">
          <h1 className="font-bold"> {"Actions"}</h1>
          {[1, 2, 3].map((action, index) => (
            <div
              className={`h-30 w-30 ${
                selectedIndex === index + 1 ? "bg-teal-300" : "bg-transparent"
              } border cursor-pointer`}
              onClick={() => {
                setSelectedIndex(index + 1);
                if (actions[index]) {
                  setSelectedActions(actions[index]?.motions || []);
                } else {
                  setSelectedActions([]);
                }
              }}
            >{`Action ${index + 1}`}</div>
          ))}
          <div
            className="w-full h-[80%] flex flex-1 flex-col mt-6"
            onDragOver={handleDragOver}
            onDrop={() => handleDrop("Action")}
          >
            {!!selectedActions.length &&
              selectedActions.map((motion, index) => (
                <div
                  key={motion.id + "action" + index}
                  className="w-full relative"
                >
                  <div
                    className="absolute right-[-2px] top-0 h-[15px] w-[15px] rounded-full bg-red-500 font-bold flex text-center items-center justify-center"
                    onClick={() => {
                      const temp = deepClone(selectedActions);
                      temp.splice(index, 1);
                      setSelectedActions(temp);
                    }}
                  >
                    <h6 className="text-white cursor-pointer">{"x"}</h6>
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
          </div>
          <div
            className={`w-3/4 h-[30px] ${selectedActions.length ? "bg-black cursor-pointer" : "bg-gray-500 cursor-not-allowed"} text-white justify-center items-center text-center flex self-center absolute bottom-7`}
            onClick={() => {
              handleOnAddAction(selectedActions);
            }}
          >
            {"Done"}
          </div>
        </div>
      </div>
    </div>
  );
}
