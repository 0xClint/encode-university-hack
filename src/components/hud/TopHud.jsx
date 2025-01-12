import React, { useState } from "react";
import { ClockCount } from "./ClockCount";
import { FlourCount } from "./FlourCount";
import InventoryList from "./InventoryList";
import Loader from "../Loader";
import { useNavigate } from "react-router-dom";
import { useGame } from "@/contexts/GameProvider";
import { logoIcon } from "../../assets";

const TopHud = ({ level, isLevelMode }) => {
  const [loader, setLoader] = useState(false);
  const { saveGameData } = useGame();
  const router = useNavigate();

  const handleSave = async () => {
    const currentGameData = level.getPlacementsData();
    setLoader(true);
    await saveGameData(currentGameData);
    router("/");
    setLoader(false);
  };

  return loader ? (
    <Loader />
  ) : (
    <div className="absolute h-14 top-3 left-0 right-0 flex justify-between items-center mx-5">
      <div
        onClick={() => router("/")}
        className="scale-[2] text-white font-bold origin-left cursor-pointer hover:scale-[2.05] ease-in duration-100"
      >
        {/* <img src={logoIcon} className="h-14" /> */}
        Zenos
      </div>
      <div className="flex gap-1">
        {isLevelMode ? (
          <div className="origin-right flex gap-1 scale-[2]">
            <FlourCount level={level} />
            <ClockCount level={level} />
            <InventoryList level={level} />
          </div>
        ) : (
          <button
            onClick={handleSave}
            className=" btn hover:bg-slate-50 w-[100px] text-[15px]"
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
};

export default TopHud;
