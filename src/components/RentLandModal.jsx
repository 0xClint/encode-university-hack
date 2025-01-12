import ReactDom from "react-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useGame } from "../contexts/gameProvider";
import { IoCloseSharp } from "react-icons/io5";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import { secondsToDay, shortenAddress } from "../utils/converters";

export const RentLandModal = ({ isOpen, setIsOpen, protectedDataAddress }) => {
  const { getProtectedDataIByAddress, rentOtherProtectedData } = useGame();

  const [rentGameModal, setRentGameModal] = useState(null);
  const [loader, setLoader] = useState(false);
  const [landData, setLandData] = useState({});

  const variants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const router = useNavigate();
  // console.log(landData);

  const handleRentAndConsume = async () => {
    if (landData.address && landData.rentalParams) {
      setLoader(true);
      await rentOtherProtectedData(
        landData.address,
        landData.rentalParams.price,
        landData.rentalParams.duration
      );
      window.location.reload();
      setLoader(false);
    }
  };

  useEffect(() => {
    setRentGameModal(document.getElementById("portal"));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      // console.log(protectedDataAddress);
      setLoader(true);
      try {
        const res = await getProtectedDataIByAddress(protectedDataAddress);
        // console.log(res);
        setLandData(res[0]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoader(false);
      }
    };
    fetchData();
  }, [protectedDataAddress]);

  if (!rentGameModal) return null;

  return ReactDom.createPortal(
    <>
      {isOpen && (
        <div className="absolute top-0 left-0 h-screen w-screen p-4 flex-center bg-opacity-50 z-[99999]">
          {loader && <Loader />}
          <motion.div
            className="md:w-[400px]  card-container border-2 rounded-lg w-full p-6 relative flex flex-col gap-4 overflow-y-auto"
            initial="hidden"
            animate="visible"
            variants={variants}
            transition={{ duration: 0.3 }}
          >
            <span
              onClick={() => setIsOpen(false)}
              className="w-5 h-5 absolute top-[14px] right-4 hover:cursor-pointer"
            >
              <IoCloseSharp className="text-2xl" />
            </span>
            <span className="font-inter  text-lg text-center">Rent Land</span>
            <div className="font-normal">
              <div className="flex gap-5">
                <div className="min-w-[120px] min-h-[120px] rounded-xl overflow-hidden border p-1">
                  <img
                    src="https://img.freepik.com/premium-vector/pixelated-map-icon-with-location-pin-wooden-frame-retro-game-graphics_1292377-15256.jpg"
                    alt="Example"
                    width={120}
                  />
                </div>
                <div className="w-full">
                  <span className="text-[17px] font-semibold leading-3">
                    {landData?.name?.slice(6, 18)}
                  </span>
                  <p>{shortenAddress(landData?.owner?.id)}</p>
                </div>
              </div>
              <div className="flex gap-5 justify-between my-3">
                <div>
                  Rent it :{" "}
                  <span className="font-semibold">
                    {secondsToDay(landData?.rentalParams?.duration)}days
                  </span>
                </div>
                <div>
                  Price :{" "}
                  <span className="font-semibold">
                    {landData?.rentalParams?.price}RLC
                  </span>
                </div>
              </div>{" "}
              <button
                onClick={handleRentAndConsume}
                className="w-full border-2 border-gray-700 hover:scale-[101%] py-1  rounded text-center"
              >
                Rent
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>,
    rentGameModal
  );
};
