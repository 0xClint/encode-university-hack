import { useState } from "react";
import { Header, MyLandsModal, NewGameModal } from "../components";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [newGameModal, setNewGameModal] = useState(false);
  // const [userLandsModal, setUserLandsModal] = useState(false);
  const router = useNavigate();
  return (
    <>
      <div className="">
        <div
          className={`absolute w-screen h-screen -z-10 bg-[url('https://gameartpartnersimagehost.s3.amazonaws.com/wp-content/uploads/2020/09/GPM1.png')] bg-no-repeat bg-cover bg-center opacity-70`}
        ></div>
        <Header />
        <NewGameModal isOpen={newGameModal} setIsOpen={setNewGameModal} />
        {/* <MyLandsModal isOpen={userLandsModal} setIsOpen={setUserLandsModal} /> */}
        <div className=" w-screen h-screen flex-col">
          <div className="relative h-full flex-center pb-10">
            <img
              src="./logo.png"
              className="absolute origin-top top-5 h-44 mx-auto"
            />
            <div className="w-full flex-center font-semibold flex-col gap-3">
              <button
                onClick={() => setNewGameModal(true)}
                className="btn w-[300px] h-12 pixelated hover:scale-[102%] duration-100 ease-in"
              >
                New Land
              </button>
              <button
                onClick={() => router("/levels")}
                className="btn w-[300px] h-12 pixelated hover:scale-[102%] duration-100 ease-in"
              >
                Challenges
              </button>
              <button
                onClick={() => router("/my-lands")}
                className="btn w-[300px] h-12 pixelated hover:scale-[102%] duration-100 ease-in"
              >
                My Lands
              </button>
              <button
                onClick={() => router("/explore")}
                className="btn w-[300px] h-12 pixelated hover:scale-[102%] duration-100 ease-in"
              >
                Explore
              </button>
              <button className="btn w-[300px] h-12 pixelated hover:scale-[102%] duration-100 ease-in">
                Transfer
              </button>
              <button className="btn w-[300px] h-12 pixelated hover:scale-[102%] duration-100 ease-in">
                Controls
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
