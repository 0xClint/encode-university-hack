import { Header } from "../components";

export default function Home() {
  return (
    <>
      <div className="">
        <div
          className={`absolute w-screen h-screen -z-10 bg-[url('https://gameartpartnersimagehost.s3.amazonaws.com/wp-content/uploads/2020/09/GPM1.png')] bg-no-repeat bg-cover bg-center opacity-70`}
        ></div>
        <Header />
        <div className=" w-screen h-screen flex-col">
          {/* <div className="h-full flex-center justify-center flex-col"> */}
          <div className="relative h-full flex-center pb-10">
            <img
              src="./logo.png"
              className="absolute origin-top top-5 h-44 mx-auto"
            />
            <div className="w-full flex-center font-semibold flex-col gap-3">
              <button
                // onClick={() => setNewGameModal(true)}
                // onMouseEnter={() => soundsManager.playSfx(SFX.MENU)}
                className="btn w-[300px] h-12 pixelated hover:scale-[102%] duration-100 ease-in"
              >
                New Land
              </button>
              <button
                // onClick={() => setLandsModal(true)}
                // onMouseEnter={() => soundsManager.playSfx(SFX.MENU)}
                className="btn w-[300px] h-12 pixelated hover:scale-[102%] duration-100 ease-in"
              >
                My Lands
              </button>
              <button
                // onClick={() => router.push("/levels")}
                // onMouseEnter={() => soundsManager.playSfx(SFX.MENU)}
                className="btn w-[300px] h-12 pixelated hover:scale-[102%] duration-100 ease-in"
              >
                Challenges
              </button>
              <button
                // onClick={() => setTransferNFTModal(true)}
                className="btn w-[300px] h-12 pixelated hover:scale-[102%] duration-100 ease-in"
              >
                Transfer
              </button>
              <button
                // onClick={() => setControlModal(true)}
                // onMouseEnter={() => soundsManager.playSfx(SFX.MENU)}
                className="btn w-[300px] h-12 pixelated hover:scale-[102%] duration-100 ease-in"
              >
                Controls
              </button>
              {/* <button
                onClick={() => handleExceute()}
                className="w-[300px] pixelated flex-center bg-secondary p-3 border-2 border-black rounded-md hover:scale-[102%] duration-100 ease-in"
              >
                TEMP
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
