import ReactDom from "react-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useGame } from "@/contexts/GameProvider";
import { IoCloseSharp } from "react-icons/io5";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

const NewGameModal = ({ isOpen, setIsOpen }) => {
  const { setActiveLandName, userLands } = useGame();
  const [newGameModal, setNewGameModal] = useState(null);
  const [loader, setLoader] = useState(false);
  const [gameName, setGameName] = useState("");
  const router = useNavigate();
  const lands = [];
  const variants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const handleCreateLand = async (e) => {
    e.preventDefault();
    setActiveLandName(gameName);
    router(`/land/${Math.floor(Math.random() * 10000)}`);
  };

  useEffect(() => {
    setNewGameModal(document.getElementById("portal"));
  }, []);

  if (!newGameModal) return null;

  return ReactDom.createPortal(
    <>
      {isOpen && (
        <div className="absolute top-0 left-0 h-screen w-screen p-4 flex-center bg-opacity-50 z-[99999]">
          {loader && <Loader />}
          <motion.div
            className="md:w-[400px] min-h-[400px] card-container border-2 rounded-lg w-full p-6 relative flex flex-col gap-4 overflow-y-auto"
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
            <span className="font-inter font-regular text-lg text-center">
              Create Land
            </span>

            <form
              onSubmit={handleCreateLand}
              className="h-full flex flex-col justify-between flex-grow"
            >
              <div>
                <div>
                  <label>Name</label>
                  <input
                    className="w-full border-black p-2 mt-1 bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block "
                    value={gameName}
                    onChange={(e) => setGameName(e.target.value)}
                    required
                  />
                </div>
                <div className="mt-3">
                  {userLands?.length ? (
                    userLands.map(({ address, name }) => {
                      return (
                        <div
                          key={address}
                          // onClick={() => router.push(`/land/${uri}`)}
                          className="relative flex-center text-center hover:bg-gray-100 cursor-pointer rounded p-2"
                        >
                          {name?.slice(6)}
                        </div>
                      );
                    })
                  ) : (
                    <span className="text-center">No lands created</span>
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="w-full border-2 border-gray-700 hover:scale-[101%] py-1  rounded text-center"
              >
                Submit
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </>,
    newGameModal
  );
};

export default NewGameModal;
