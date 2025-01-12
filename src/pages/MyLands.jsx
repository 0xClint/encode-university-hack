import React, { useState } from "react";
import { Header, Loader, RentingLandModal, RentLandModal } from "../components";
import { useGame } from "@/contexts/GameProvider";
import { secondsToDay, shortenAddress } from "../utils/converters";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function MyLands() {
  const {
    userLands,
    rentalLands,
    setRentalMode,
    rentingProtectedData,
    consumeProtectedData,
    setRentalLandData,
  } = useGame();
  const [rentingModal, setRentingModal] = useState(false);
  const [rentingData, setRentingData] = useState({});
  const [loader, setLoader] = useState(false);
  const router = useNavigate();

  const handleRentingModal = (data) => {
    setRentingModal(true);
    setRentingData(() => data);
  };
  console.log(rentalLands);

  const handleRentData = async (address, price, days) => {
    await rentingProtectedData(address, price, days);
  };

  const handleConsumeData = async (address) => {
    setLoader(true);
    const rentalLandData = await consumeProtectedData(address);
    setRentalLandData(rentalLandData);
    setRentalMode(true);
    setLoader(false);
    router("/land/rental");
  };

  return (
    <div className="">
      <div
        className={`absolute w-screen h-screen -z-10 bg-[url('https://gameartpartnersimagehost.s3.amazonaws.com/wp-content/uploads/2020/09/GPM1.png')] bg-no-repeat bg-cover bg-center opacity-70`}
      ></div>
      {loader && <Loader />}
      <Header />
      <RentingLandModal
        isOpen={rentingModal}
        setIsOpen={setRentingModal}
        rentingData={rentingData}
        rentingFunction={handleRentData}
      />
      <div className=" w-screen h-screen flex-col">
        <div className="relative h-full flex-center pb-10 ">
          <div className="card-container w-[930px]  font-semibold flex-col gap-3 p-9 pt-5">
            <div className="flex mb-3 items-center">
              <FaArrowLeft
                onClick={() => router("/")}
                className="mr-5 cursor-pointer hover:text-black"
              />
              <h3 className="text-2xl ">My Collections</h3>
            </div>
            <div className=" h-[500px] overflow-y-scroll">
              <h3 className="text-lg mb-1">Owned - {userLands.length}</h3>
              <div className="container flex justify-left flex-wrap gap-4 text-sm ">
                {userLands?.map(
                  ({ name, owner, address, rentalParams }, index) => {
                    return (
                      <div
                        key={address}
                        className="w-[150px] flex flex-col cursor-pointer hover:bg-gray-50  items-center border border-black rounded-md p-2"
                        // onClick={() => handleOpenModal(address)}
                      >
                        <div className="w-[130px] rounded-xl overflow-hidden">
                          <img
                            src="https://img.freepik.com/premium-vector/pixelated-map-icon-with-location-pin-wooden-frame-retro-game-graphics_1292377-15256.jpg"
                            alt="Example"
                          />
                        </div>
                        <div className="my-1">
                          {name?.slice(6, 18)}
                          {name?.length >= 20 && "..."}
                        </div>{" "}
                        <div className="w-full flex justify-between text-xs ">
                          {rentalParams === null ? (
                            <button
                              onClick={() =>
                                handleRentingModal(userLands[index])
                              }
                              className="w-full border-2 border-gray-700 hover:scale-[101%] py-1 text-black rounded text-center"
                            >
                              Monetize
                            </button>
                          ) : (
                            <>
                              <span className="">
                                {rentalParams?.duration
                                  ? secondsToDay(rentalParams?.duration)
                                  : 0}
                                days
                              </span>
                              <span className="text-green-600 font-bold">
                                {rentalParams?.price} RLC
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
              <h3 className="text-lg mt-3 mb-1">Purchased</h3>
              <div className="container flex justify-left flex-wrap gap-4 text-sm ">
                {rentalLands?.map(
                  ({ id, renter, rentalParams, protectedData }, index) => {
                    return (
                      <div
                        key={id}
                        className="w-[150px] flex flex-col cursor-pointer hover:bg-gray-50  items-center border border-black rounded-md p-2"
                        onClick={() => handleConsumeData(protectedData.id)}
                      >
                        <div className="w-[130px] rounded-xl overflow-hidden">
                          <img
                            src="https://img.freepik.com/premium-vector/pixelated-map-icon-with-location-pin-wooden-frame-retro-game-graphics_1292377-15256.jpg"
                            alt="Example"
                          />
                        </div>
                        <div className="my-1">
                          {protectedData.name.slice(6, 18)}
                          {protectedData.name.length >= 20 && "..."}
                        </div>{" "}
                        <div className="w-full flex justify-between text-xs ">
                          {rentalParams === null ? (
                            <button className="w-full border-2 border-gray-700 hover:scale-[101%] py-1 text-black rounded text-center">
                              Monetize
                            </button>
                          ) : (
                            <>
                              <span className="">
                                {rentalParams?.duration
                                  ? secondsToDay(rentalParams?.duration)
                                  : 0}
                                days
                              </span>
                              <span className="text-green-600 font-bold">
                                {rentalParams?.price} RLC
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
