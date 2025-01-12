import { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { iExecDataProtectorClient } from "../IExecConfig";
import { convertToJSON } from "../utils/converters";

const GameProviderFn = () => {
  const [isConnected, setConnected] = useState(false);
  const [globalLands, setGlobalLands] = useState([]);
  const [activeLandName, setActiveLandName] = useState("");
  const [rentalMode, setRentalMode] = useState(false);
  const [userLands, setUserLands] = useState([]);
  const [rentalLands, setRentalLands] = useState([]);
  const [rentalLandData, setRentalLandData] = useState(null);
  const [account, setAccount] = useState("");

  const [levelCompleted, setLevelCompleted] = useState(
    localStorage.getItem("level-completed") || 1
  );

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

  const getProtectedDataInCollections = async () => {
    const res =
      await iExecDataProtectorClient.sharing.getProtectedDataInCollections({
        // page: 3,
        // pageSize: 24,
        isRentable: true,
      });
    const result = res.protectedDataInCollection.filter(({ name }) =>
      name.includes("Zenos-")
    );

    const nres = result.filter(
      (item) =>
        !item.rentals.some(
          (rental) =>
            rental.renter.toLocaleLowerCase() === account.toLocaleLowerCase()
        )
    );

    setGlobalLands(nres);
  };

  const getUserLands = async () => {
    if (account) {
      const listProtectedData =
        await iExecDataProtectorClient.sharing.getProtectedDataInCollections({
          collectionOwner: account,
        });
      // console.log(listProtectedData.protectedDataInCollection);
      const result = listProtectedData.protectedDataInCollection.filter(
        ({ name }) => name.includes("Zenos-")
      );
      setUserLands(listProtectedData.protectedDataInCollection);
    }
  };

  useEffect(() => {
    getUserLands();
  }, [account]);

  const getRentalLands = async () => {
    if (account) {
      const res = await iExecDataProtectorClient.sharing.getRentals({
        renterAddress: account,
      });
      const result = res.rentals.filter(({ protectedData }) =>
        protectedData.name.includes("Zenos-")
      );
      setRentalLands(result);
    }
  };

  useEffect(() => {
    getRentalLands();
  }, [account]);

  const getProtectedDataIByAddress = async (protectedData) => {
    const res =
      await iExecDataProtectorClient.sharing.getProtectedDataInCollections({
        protectedData,
      });
    return res.protectedDataInCollection;
  };

  const saveGameData = async (gameData) => {
    console.log(gameData);
    console.log(
      "Zenos-" +
        (activeLandName
          ? activeLandName
          : Math.floor(Math.random() * 10).toString())
    );
    const protectedData = await iExecDataProtectorClient.core.protectData({
      data: {
        file: new TextEncoder().encode(JSON.stringify(gameData)),
      },
      name:
        "Zenos-" +
        (activeLandName
          ? activeLandName
          : Math.floor(Math.random() * 10).toString()),
    });
    const protectDataAddress = protectedData.address;
    console.log("[dataCreated] status", protectDataAddress);

    const collectID = await iExecDataProtectorClient.sharing.createCollection();
    console.log("[createdCollection] status", collectID.collectionId);

    const addedToCollection =
      await iExecDataProtectorClient.sharing.addToCollection({
        protectedData: protectDataAddress,
        collectionId: collectID.collectionId,
        addOnlyAppWhitelist: import.meta.env
          .VITE_IEXEC_ADDONLY_WHITELIST_ADDRESS,
      });
    console.log("[addedToCollection] status", addedToCollection.txHash);

    // const consumeProtectedDataResult =
    //   await iExecDataProtectorClient.sharing.consumeProtectedData({
    //     protectedData: protectDataAddress,
    //     app: import.meta.env.VITE_PROTECTTED_DATA_DELIVERY_TEE_APP,
    //     workerpool: import.meta.env.VITE_WORKERPOOL_ADDRESS,
    //     onStatusUpdate: (status) => {
    //       console.log("[consumeProtectedData] status", status);
    //     },
    //   });
    // console.log("consumeProtectedDataResult", consumeProtectedDataResult);

    // const contentAsBlob = new Blob([consumeProtectedDataResult.result]);
    // const contentAsObjectUrl = URL.createObjectURL(contentAsBlob);
    // console.log(contentAsBlob);
    // console.log(contentAsObjectUrl);
    console.log("SUCCESSFULLY UPLOADED");
  };

  const rentingProtectedData = async (protectDataAddress, price, duration) => {
    console.log(protectDataAddress, price, duration);
    const rentingProtectedData =
      await iExecDataProtectorClient.sharing.setProtectedDataToRenting({
        protectedData: protectDataAddress,
        price, // 0 nRLC
        duration: 60 * 60 * 24 * Number(duration),
      });
    console.log("[rentingProtectedData] status", rentingProtectedData);
  };

  const consumeProtectedData = async (protectedData) => {
    const consumeProtectedDataResult =
      await iExecDataProtectorClient.sharing.consumeProtectedData({
        protectedData,
        app: import.meta.env.VITE_PROTECTTED_DATA_DELIVERY_TEE_APP,
        workerpool: import.meta.env.VITE_WORKERPOOL_ADDRESS,
        onStatusUpdate: (status) => {
          console.log("[consumeProtectedData] status", status);
        },
      });
    const res =
      await iExecDataProtectorClient.sharing.getResultFromCompletedTask({
        taskId: consumeProtectedDataResult.taskId,
        path: "content",
        onStatusUpdate: (status) => {
          console.log("[getResultFromCompletedTask] status", status);
        },
      });
    return convertToJSON(res.result);
  };

  const rentOtherProtectedData = async (
    protectDataAddress,
    price,
    duration
  ) => {
    console.log(protectDataAddress, price, duration);

    const res = await iExecDataProtectorClient.sharing.rentProtectedData({
      protectedData: protectDataAddress,
      price: Number(price), // 0 nRLC
      duration: Number(duration),
    });

    console.log("[rentedProtectedData] status", res);

    // const consumeProtectedDataResult =
    //   await iExecDataProtectorClient.sharing.consumeProtectedData({
    //     protectedData: protectDataAddress,
    //     app: import.meta.env.VITE_PROTECTTED_DATA_DELIVERY_TEE_APP,
    //     workerpool: import.meta.env.VITE_WORKERPOOL_ADDRESS,
    //     onStatusUpdate: (status) => {
    //       console.log("[consumeProtectedData] status", status);
    //     },
    //   });
    // console.log("consumeProtectedDataResult", consumeProtectedDataResult);

    // const contentAsBlob = new Blob([consumeProtectedDataResult.result]);
    // // const contentAsObjectUrl = URL.createObjectURL(contentAsBlob);
    // console.log(contentAsBlob);
    // // console.log(contentAsObjectUrl);
    console.log("SUCCESSFULLY RENTED!");
  };

  const handleLevelCompleted = (index) => {
    setLevelCompleted(index);
    // localStorage.setItem("level-completed", index + 1);
  };

  useEffect(() => {
    getProtectedDataInCollections();
  }, [account]);

  const createProtectedData = async () => {
    const res = await iExecDataProtectorClient.core.protectData({
      data: {
        // A binary "file" field must be used if you use the app provided by iExec
        file: new TextEncoder().encode(
          JSON.stringify("Ciggerrate!")
          // JSON.stringify({ key: "value", prank: "fun", number: 123 })
        ),
      },
      name: "DataProtector Sharing Sandbox - Test protected data",
    });
    console.log(res);
  };

  return {
    connectWallet,
    account,
    isConnected,
    globalLands,
    levelCompleted,
    handleLevelCompleted,
    activeLandName,
    setActiveLandName,
    getProtectedDataIByAddress,
    saveGameData,
    userLands,
    rentingProtectedData,
    rentOtherProtectedData,
    rentalLands,
    consumeProtectedData,
    setRentalMode,
    rentalMode,
    rentalLandData,
    setRentalLandData,
  };
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
