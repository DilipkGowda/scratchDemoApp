export interface Motion {
    motionName: string;
    action: {
      x?: number;
      y?: number;
      rotate?: number;
    };
  }
  
  export interface Sprite {
    id: string;
    sprite: string;
    motions?: Motion[];
  }
  
  export interface MidAreaProps {
    sprites: Sprite[];
    setPlay: (play: boolean) => void;
    play: boolean;
  }
  