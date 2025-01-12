import React, { useState } from "react";
import Compiler from "../Compiler";
import landTemplate from "../Levels/landTemplate";
import { useGame } from "@/contexts/GameProvider";

export default function Game() {
  const { rentalMode, setRentalMode, rentalLandData, setRentalLandData } =
    useGame();

  const gameLandData = rentalMode ? rentalLandData : landTemplate;
  console.log(gameLandData);
  return (
    <>
      <Compiler gameData={gameLandData} />
    </>
  );
}
