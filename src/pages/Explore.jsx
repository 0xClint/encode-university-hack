import React, { useState } from "react";
import { Header, RentLandModal } from "../components";
import { useGame } from "@/contexts/GameProvider";
import { shortenAddress } from "../utils/converters";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Explore() {
  const { globalLands } = useGame();
  const [rentLandModal, setRentLandModal] = useState(false);
  const [protectedDataAddress, setProtectedDataAddress] = useState({});
  const router = useNavigate();

  const handleOpenModal = (address) => {
    setRentLandModal(true);
    setProtectedDataAddress(() => address);
  };
  // console.log(globalLands);
  return (
    <div className="">
      <div
        className={`absolute w-screen h-screen -z-10 bg-[url('https://gameartpartnersimagehost.s3.amazonaws.com/wp-content/uploads/2020/09/GPM1.png')] bg-no-repeat bg-cover bg-center opacity-70`}
      ></div>
      <Header />
      <RentLandModal
        isOpen={rentLandModal}
        setIsOpen={setRentLandModal}
        protectedDataAddress={protectedDataAddress}
      />

      <div className=" w-screen h-screen flex-col">
        <div className="relative h-full flex-center pb-10 border">
          <div className="card-container w-[930px]  font-semibold flex-col gap-3 p-9 pt-5">
            <div className="flex mb-3 items-center">
              <FaArrowLeft
                onClick={() => router("/")}
                className="mr-5 cursor-pointer hover:text-black"
              />
              <h3 className="text-2xl ">Explore & Rent</h3>
            </div>
            <div className=" h-[500px] overflow-y-scroll">
              <div className="container flex justify-left flex-wrap gap-4 text-sm over">
                {globalLands?.map(({ name, owner, address, rentalParams }) => (
                  <div
                    key={address}
                    className="w-[150px] flex flex-col cursor-pointer hover:bg-gray-100 hover:translate-y-0.5 items-center border border-black rounded-md p-2"
                    onClick={() => handleOpenModal(address)}
                  >
                    <div className="w-[130px] rounded-xl overflow-hidden">
                      <img
                        src="https://img.freepik.com/premium-vector/pixelated-map-icon-with-location-pin-wooden-frame-retro-game-graphics_1292377-15256.jpg"
                        alt="Example"
                      />
                    </div>
                    <div className="w-full flex flex-col mt-1 justify-between">
                      <div>
                        <span className="block">
                          {name?.slice(6, 18)}
                          {name?.length >= 20 && "..."}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs ">
                        <span className="">{shortenAddress(owner?.id)}</span>
                        <span className="text-green-600 font-bold">
                          {rentalParams?.price} RLC
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
