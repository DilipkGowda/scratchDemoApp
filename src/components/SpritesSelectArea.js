import { useState, Suspense, lazy } from "react";
import { sprites } from "../constants";

const SpriteItem = lazy(() => import("./SpriteItem"));

export default function SpritesSelectArea({
  onAddSprite,
  onAddMotions,
  actions,
  addingMotion,
}) {
  const [nsprites, setNsprites] = useState(sprites);

  return (
    <div className="w-[15%] h-full overflow-hidden flex flex-col items-center bg-white border-t border-l border-gray-200 px-3">
      <h1 className="mt-5 mb-3 font-bold">{"Sprites"}</h1>
      <div className="flex-1 flex-col relative">
        <Suspense fallback={<div>Loading sprites...</div>}>
          {nsprites.map((sprite, index) => (
            <SpriteItem
              key={sprite.id}
              sprite={sprite}
              index={index}
              actions={actions}
              onAddMotions={onAddMotions}
              onAddSprite={onAddSprite}
              addingMotion={addingMotion}
              nsprites={nsprites}
              setNsprites={setNsprites}
            />
          ))}
        </Suspense>
      </div>
    </div>
  );
}
