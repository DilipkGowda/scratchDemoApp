import React from "react";

export default function MotionButton({
  name,
  key,
}: {
  name: string;
  key: number;
}) {
  return (
    <div
      key={key}
      draggable
      className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
    >
      {name}
    </div>
  );
}
