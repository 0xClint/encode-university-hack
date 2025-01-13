import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Compiler from "../Compiler";
import LevelsMap from "../Levels/LevelsMap";

export default function Levels() {
  const { id } = useParams();
  const [levelData, setLevelData] = useState(null);

  useEffect(() => {
    if (LevelsMap[id]) {
      console.log("curerentid : " + id);
      setLevelData(LevelsMap[id].level);
    }
  }, [id]);

  if (!levelData) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Compiler gameData={levelData} />
    </>
  );
}
