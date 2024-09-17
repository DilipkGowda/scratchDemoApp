import Man1 from "../assests/images/Man1.png";
import Man2 from "../assests/images/Man2.png";
import Man3 from "../assests/images/Man3.png";

export const sprites = [{ id: 1, sprite: Man1, isAdded: false }, { id: 2, sprite: Man2, isAdded: false }, { id: 3, sprite: Man3, isAdded: false }];

export const Motions: {
  id: number;
  motionName: string;
  action: { x: number; y: number; rotate: number };
}[] = [
    {
      id: 1,
      motionName: "Move x by 50 steps",
      action: { x: 50, y: 0, rotate: 0 },
    },
    {
      id: 2,
      motionName: "Move y by 50 steps",
      action: { x: 0, y: 50, rotate: 0 },
    },
    {
      id: 3,
      motionName: "Move x by 50 y by 30",
      action: { x: 50, y: 30, rotate: 0 },
    },
    { id: 4, motionName: "Turn 90 degree", action: { x: 0, y: 0, rotate: 90 } },
    { id: 5, motionName: "Turn 180 degree", action: { x: 0, y: 0, rotate: 180 } },
    { id: 6, motionName: "Turn 360 degree", action: { x: 0, y: 0, rotate: 360 } },
    { id: 7, motionName: "Repeat", action: { x: 0, y: 0, rotate: 0 } },
  ];
