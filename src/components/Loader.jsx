import Lottie from "react-lottie-player";
import loader from "../assets/loader.json";

const Loader = ({ status = "" }) => {
  return (
    <div
      className="fixed z-10 top-0 w-screen h-screen flex justify-center items-center"
      style={{ background: "rgba(223, 223, 223, 0.22)" }}
    >
      {/* LOADING */}
      <span className="absolute w-[500px] font-bold text-center flex-center flex-col">
        {status?.length !== 0 && status}
        <span>
          <Lottie
            loop
            animationData={loader}
            play
            style={{
              width: 200,
              height: 200,
            }}
          />
        </span>
      </span>
    </div>
  );
};

export default Loader;
