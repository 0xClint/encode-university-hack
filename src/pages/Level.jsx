import React from "react";
import { Header } from "../components";
import LevelsMap from "../Levels/LevelsMap";
import { useGame } from "@/contexts/GameProvider";
import { useNavigate } from "react-router-dom";
import { CiLock } from "react-icons/ci";

export default function Level() {
  const { levelCompleted } = useGame();
  const router = useNavigate();
  return (
    <>
      <div className="">
        <div
          className={`absolute w-screen h-screen -z-10 bg-[url('https://gameartpartnersimagehost.s3.amazonaws.com/wp-content/uploads/2020/09/GPM1.png')] bg-no-repeat bg-cover bg-center opacity-70`}
        ></div>

        <div className=" w-screen h-screen flex-col">
          <Header />
          <div className="h-full flex-center pb-10">
            <div className="w-[300px] card-container text-[#656565]  p-4">
              <h2 className="w-full bg-gray-500 text-white py-2  rounded text-center">
                Levels
              </h2>
              <div className="w-full flex flex-col my-3 ">
                {LevelsMap.map(({ level, id }) => {
                  return (
                    <button
                      key={id}
                      disabled={levelCompleted < id}
                      onClick={() => router(`/levels/${id}`)}
                      className="relative flex-center text-center hover:bg-gray-100 cursor-pointer rounded p-2"
                    >
                      Level {id + 1}
                      {levelCompleted < id && (
                        // <LockIcon className="absolute right-1 top-2 h-5" />
                        <CiLock className="absolute right-1 top-2 h-5" />
                      )}
                    </button>
                  );
                })}
                {/* <button onClick={() => handleGo()}>Hello</button> */}
              </div>
              <button
                onClick={() => router(`/`)}
                className="w-full border-2 border-gray-700 hover:scale-[101%] py-1  rounded text-center"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
