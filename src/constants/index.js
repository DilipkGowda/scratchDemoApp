import Man1 from "../assets/image/Man1.png";
import Man2 from "../assets/image/Man2.png";
import Man3 from "../assets/image/Man3.png";

export const sprites = [
  { id: Math.floor(Math.random() * 100), sprite: Man1, isAdded: false },
  { id: Math.floor(Math.random() * 100), sprite: Man2, isAdded: false },
  { id: Math.floor(Math.random() * 100), sprite: Man3, isAdded: false },
];

export const Motions = [
  {
    id: Math.floor(Math.random() * 100),
    motionName: "Move x by 50 steps",
    action: { x: 50, y: 0, rotate: 0 },
  },
  {
    id: Math.floor(Math.random() * 100),
    motionName: "Move y by 50 steps",
    action: { x: 0, y: 50, rotate: 0 },
  },
  {
    id: Math.floor(Math.random() * 100),
    motionName: "Move x by -50 steps",
    action: { x: -50, y: 0, rotate: 0 },
  },
  {
    id: Math.floor(Math.random() * 100),
    motionName: "Move y by -50 steps",
    action: { x: 0, y: -50, rotate: 0 },
  },
  {
    id: Math.floor(Math.random() * 100),
    motionName: "Move x by 50 y by 30",
    action: { x: 50, y: 30, rotate: 0 },
  },
  {
    id: Math.floor(Math.random() * 100),
    motionName: "Move x by -50 y by 30",
    action: { x: -50, y: 30, rotate: 0 },
  },
  {
    id: Math.floor(Math.random() * 100),
    motionName: "Move x by -70 y by -30",
    action: { x: -70, y: -30, rotate: 0 },
  },
  {
    id: Math.floor(Math.random() * 100),
    motionName: "Turn 360 degree",
    action: { x: 0, y: 0, rotate: 360 },
  },
  {
    id: Math.floor(Math.random() * 100),
    motionName: "Repeat",
    action: { x: 0, y: 0, rotate: 0 },
  },
];
