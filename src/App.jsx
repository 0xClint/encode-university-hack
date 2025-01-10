import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IExecDataProtector } from "@iexec/dataprotector";
const iExecDataProtectorClient = new IExecDataProtector(window.ethereum);

function App() {
  const getCollectionsByOwner = async () => {
    const res = await iExecDataProtectorClient.sharing.getCollectionsByOwner({
      // owner: '0x77B708A7102A2e905a056BFC34d82631138918CC',
      owner: "0xf1E507654e8E8b35bf467fd255c1c5787527aC2D",
    });
    console.log(res);
  };
  const createProtectedData = async () => {
    const res = await iExecDataProtectorClient.core.protectData({
      data: {
        email: "example@gmail.com",
        SMTPserver: {
          port: 5000,
          smtp_server: "smtp.gmail.com",
        },
      },
    });
    console.log(res);
  };
  return (
    <>
      <div>
        temp
        <div>
          <button onClick={getCollectionsByOwner}>getCollectionsByOwner</button>{" "}
          <button onClick={createProtectedData}>createProtectedData</button>
        </div>
      </div>
    </>
  );
}

export default App;
