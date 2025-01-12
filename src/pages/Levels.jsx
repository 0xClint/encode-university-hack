import React from "react";
import { useParams } from "react-router-dom";
import Compiler from "../Compiler";
import LevelsMap from "../Levels/LevelsMap";

export default function Levels() {
  const { id } = useParams();

  return (
    <>
      <Compiler gameData={LevelsMap[id].level} />
    </>
  );
}
