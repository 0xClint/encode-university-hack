import ReactDom from "react-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useGame } from "../contexts/gameProvider";
import { IoCloseSharp } from "react-icons/io5";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import { secondsToDay, shortenAddress } from "../utils/converters";

export const RentingLandModal = ({
  isOpen,
  setIsOpen,
  rentingData,
  rentingFunction,
}) => {
  const { getProtectedDataIByAddress } = useGame();
  const [priceValue, setPriceValue] = useState(0);
  const [duration, setDuration] = useState(10);
  const [entingGameModal, setentingGameModal] = useState(null);
  const [loader, setLoader] = useState(false);
  const [landData, setLandData] = useState({});

  const variants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const handleRental = async (e) => {
    e.preventDefault();
    setLoader(true);
    await rentingFunction(rentingData.address, priceValue, duration);
    setLoader(false);
    setIsOpen(false);
    window.location.reload();
  };
  //   console.log(rentingData);
  useEffect(() => {
    setentingGameModal(document.getElementById("portal"));
  }, []);

  if (!entingGameModal) return null;

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
            <span className="font-inter  text-lg text-center">
              Put land on Rent
            </span>
            <div className="font-normal">
              <form
                onSubmit={handleRental}
                className="h-full flex flex-col gap-3 justify-between flex-grow"
              >
                {/* <div> */}
                <div>
                  <label>Price (in nRLC)</label>
                  <input
                    type="number"
                    className="w-full border-black p-2 mt-1 bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block "
                    value={priceValue}
                    onChange={(e) => setPriceValue(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Duration (in days)</label>
                  <input
                    type="number"
                    className="w-full border-black p-2 mt-1 bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block "
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    required
                  />
                </div>
                {/* </div> */}
                <button
                  type="submit"
                  className="w-full border-2 mt-3 border-gray-700 hover:scale-[101%] py-1  rounded text-center"
                >
                  Submit
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </>,
    entingGameModal
  );
};
