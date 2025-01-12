import {
  LEVEL_THEMES,
  PLACEMENT_TYPE_FLOUR,
  PLACEMENT_TYPE_GOAL,
  PLACEMENT_TYPE_HERO,
  PLACEMENT_TYPE_WALL,
} from "@/helpers/consts";

const level1 = {
  theme: "BLUE",
  tilesWidth: 8,
  tilesHeight: 8,
  placements: [
    { type: "HERO", x: 2, y: 2 },
    { type: "GOAL", x: 6, y: 4 },
    { type: "WALL", x: 3, y: 6 },
    { type: "WALL", x: 4, y: 6 },
    { type: "WALL", x: 5, y: 6 },
    { type: "FLOUR", x: 3, y: 5 },
    { type: "FLOUR", x: 5, y: 5 },
    { type: "FLOUR", x: 4, y: 2 },
    { type: "FLOUR", x: 6, y: 7 },
  ],
};

export default level1;
