export default function MidArea({ sprites, actions }) {
  console.log('actions', actions);
  
  return (
    <div className="flex-1 h-full overflow-auto flex justify-center items-center">
      {!!sprites.length &&
        sprites.map((sprite) => (
          <div key={sprite?.id+  'wrapper'} className="flex-none overflow-y-auto p-2">
            <img
              key={sprite.id}
              src={sprite.sprite}
              alt="Sprite"
              className="aspect-square w-[150] h-[100px]"
            />
          </div>
        ))}
    </div>
  );
}
