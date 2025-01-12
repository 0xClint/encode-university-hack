import { createContext, useContext, useState } from "react";
import { ethers } from "ethers";

const GameProviderFn = () => {
  const [isConnected, setConnected] = useState(false);
  const [account, setAccount] = useState("");

  async function connectWallet() {
    if (!isConnected) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);

      // const network = await provider.getNetwork();
      const signer = provider.getSigner();
      const _walletAddress = await signer.getAddress();
      setConnected(true);
      setAccount(_walletAddress);
    } else {
      window.ethereum.selectedAddress = null;
      setConnected(false);
      setAccount("");
    }
  }

  return { connectWallet, account, isConnected };
};

const GameContext = createContext(null);

export const GameProvider = ({ children }) => {
  return (
    <GameContext.Provider value={GameProviderFn()}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }

  return context;
};
