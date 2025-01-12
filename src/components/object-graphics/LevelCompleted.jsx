import React from "react";
import { useNavigate } from "react-router-dom";
import LevelsMap from "../../Levels/LevelsMap";

const LevelCompleted = ({ handleGoToNextLevel, nextLevel }) => {
  const router = useNavigate();
  const levelLength = LevelsMap[LevelsMap.length - 1].id;
  console.log("nextLevel : " + nextLevel + " | lvelLength : " + levelLength);

  return (
    <div className="md:w-[300px] card-container border-2 rounded-lg w-full py-4 px-3  relative flex flex-col gap-4 overflow-y-auto">
      <span className="font-inter font-regular  my-4 text-center">
        Level Completed
      </span>
      <div className=" flex justify-between gap-3">
        {nextLevel >= levelLength ? (
          <button
          onClick={() => router("/")}
            className="w-full border-2 border-gray-700 hover:scale-[101%] py-1  rounded text-center hover:bg-gray-50"
          >
         Home
          </button>
        ) : (
          <>
            <button
              onClick={() => router("/levels")}
              className="w-full border-2 border-gray-700 hover:scale-[101%] py-1  rounded text-center hover:bg-gray-50"
            >
              Levels
            </button>
            <button
              onClick={() => handleGoToNextLevel()}
              className="w-full border-2 border-gray-700 hover:scale-[101%] py-1  rounded text-center hover:bg-gray-50"
            >
              Next
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LevelCompleted;
