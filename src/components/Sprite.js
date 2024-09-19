import React from "react";

const Sprite = React.forwardRef(({ sprite, motion }, ref) => {
  return (
    <div
      ref={ref}
      className="flex-none overflow-y-auto p-2"
      style={{
        transform: motion ? motion : "",
        transition: motion && "transform 1s linear",
      }}
    >
      <img
        src={sprite.sprite}
        alt="Sprite"
        className="aspect-square w-[100px] h-[100px]"
      />
    </div>
  );
});

export default Sprite;
