import { iExecDataProtectorClient } from "../IExecConfig";

const protectedData = "0x7ccB4a2e33fDC7A5a772f3B048c93677De9853b2";
const u1 = "0x77B708A7102A2e905a056BFC34d82631138918CC";
const u2 = "0xf1E507654e8E8b35bf467fd255c1c5787527aC2D";
const APP_ADDRESS = "web3mail.apps.iexec.eth";
// const APP_ADDRESS = "0x781482c39cce25546583eac4957fb7bf04c277d2";
const COLLECTION_ID = 450;
const IEXEC_ADDONLY_WHITELIST_ADDRESS =
  "0x256bcd881c33bdf9df952f2a0148f27d439f2e64";

const PROTECTTED_DATA_DELIVERY_TEE_APP =
  "0x1cb7D4F3FFa203F211e57357D759321C6CE49921";
const APP_ONLY_WHITELIST = "0xe124bf275bbfeedae6c968b5d52b1d3b7fba0468";

const WORKERPOOL_ADDRESS = "prod-v8-learn.main.pools.iexec.eth";

const TASK_ID =
  "0x8c50fd13d05552c96a1428b658c10fc8b03c474ddb9deb2d010ce2db77add820";
function Temp() {
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

  const getProtectedData = async () => {
    const res = await iExecDataProtectorClient.core.getProtectedData({
      owner: u2,
    });
    console.log(res);
  };

  const transferOwnership = async () => {
    const res = await iExecDataProtectorClient.core.transferOwnership({
      protectedData: "0x1343491d16867d75cb0c1d5ddbbe650cc002d6c0",
      newOwner: "0x77B708A7102A2e905a056BFC34d82631138918CC",
    });
    console.log(res);
  };

  const grantAccess = async () => {
    const res = await iExecDataProtectorClient.core.grantAccess({
      protectedData: protectedData,
      authorizedApp: APP_ADDRESS,
      // authorizedApp: PROTECTTED_DATA_DELIVERY_TEE_APP,
      authorizedUser: u2,
      pricePerAccess: 0,
      numberOfAccess: 100,
      onStatusUpdate: ({ title, isDone }) => {
        console.log(title, isDone);
      },
    });
    console.log(res);
  };
  const revokeAllAccess = async () => {
    const res = await iExecDataProtectorClient.core.revokeAllAccess({
      protectedData: protectedData,
    });
    console.log(res);
  };
  const getGrantedAccess = async () => {
    const res = await iExecDataProtectorClient.core.getGrantedAccess({
      protectedData: protectedData,
      // authorizedApp: "0x456def...",
      // authorizedUser: "0x789cba...",
      // page: 1,
      // pageSize: 100,
    });
    console.log(res);
  };

  const processProtectedData = async () => {
    const res = await iExecDataProtectorClient.core.processProtectedData({
      protectedData: protectedData,
      // app: "0x0d8b899f2faa0fe9f0b17bcf4debd0cbc9e574ef",
      app: APP_ADDRESS,
      // app: PROTECTTED_DATA_DELIVERY_TEE_APP,
      maxPrice: 10,
      // args: "arg1 arg2",
      // inputFiles: ["https://example.com/file1", "https://example.com/file2"],
      // secrets: {
      //   1: "secret1",
      //   2: "secret2",
      // },
    });
    console.log(res);
  };
  const createAddOnlyAppWhitelist = async () => {
    const res =
      await iExecDataProtectorClient.sharing.createAddOnlyAppWhitelist();
    console.log(res);
  };
  const addAppToAddOnlyAppWhitelist = async () => {
    const res =
      await iExecDataProtectorClient.sharing.addAppToAddOnlyAppWhitelist({
        addOnlyAppWhitelist: APP_ONLY_WHITELIST,
        app: PROTECTTED_DATA_DELIVERY_TEE_APP,
      });
    console.log(res);
  };
  const getUserAddOnlyAppWhitelist = async () => {
    const res =
      await iExecDataProtectorClient.sharing.getUserAddOnlyAppWhitelist();
    console.log(res);
  };

  const createCollection = async () => {
    const res = await iExecDataProtectorClient.sharing.createCollection();
    console.log(res);
  };

  const addToCollection = async () => {
    console.log("Collection id : " + COLLECTION_ID);
    const { txHash } = await iExecDataProtectorClient.sharing.addToCollection({
      protectedData: protectedData,
      collectionId: COLLECTION_ID,
      addOnlyAppWhitelist: IEXEC_ADDONLY_WHITELIST_ADDRESS,
    });
    console.log(txHash);
  };

  const consumeProtectedData = async () => {
    // const res = await iExecDataProtectorClient.sharing.consumeProtectedData({
    //   protectedData: protectedData,
    //   app: PROTECTTED_DATA_DELIVERY_TEE_APP,
    //   workerpool: WORKERPOOL_ADDRESS,
    //   onStatusUpdate: (status) => {
    //     console.log("[consumeProtectedData] status", status);
    //   },
    // });
    // console.log(res);

    try {
      const consumeProtectedDataResult =
        await iExecDataProtectorClient.sharing.consumeProtectedData({
          protectedData: protectedData,
          app: PROTECTTED_DATA_DELIVERY_TEE_APP,
          workerpool: WORKERPOOL_ADDRESS,
          onStatusUpdate: (status) => {
            console.log("[consumeProtectedData] status", status);
          },
        });
      console.log("consumeProtectedDataResult", consumeProtectedDataResult);

      const contentAsBlob = new Blob([consumeProtectedDataResult.result]);
      const contentAsObjectUrl = URL.createObjectURL(contentAsBlob);
      console.log(contentAsBlob);
      console.log(contentAsObjectUrl);
      console.log("SUCCESS");
    } catch (e) {
      // hide loader
      console.log("ERROR");
      console.error(e);
    }
    console.log("FUNC");
  };

  const getResultFromCompletedTask = async () => {
    console.log("taskID : " + TASK_ID);
    const res =
      await iExecDataProtectorClient.sharing.getResultFromCompletedTask({
        taskId: TASK_ID,
        path: "content",
        onStatusUpdate: (status) => {
          console.log("[getResultFromCompletedTask] status", status);
        },
      });

    console.log(res);
    const arrayBuffer = new Uint8Array(res.result).buffer; // Example ArrayBuffer

    // Convert ArrayBuffer to string
    const decodedString = new TextDecoder().decode(arrayBuffer);

    console.log(decodedString);
    // const contentAsBlob = new Blob([res.result]);
    // const contentAsObjectUrl = URL.createObjectURL(contentAsBlob);
    // const element = document.createElement("a");
    // element.setAttribute("href", contentAsObjectUrl);
    // element.setAttribute("download", "ProtectedDataFile.zip");

    // element.style.display = "none";
    // document.body.appendChild(element);

    // element.click();

    // document.body.removeChild(element);
  };

  const getProtectedDataInCollections = async () => {
    const res =
      await iExecDataProtectorClient.sharing.getProtectedDataInCollections({
        protectedData: protectedData,
      });
    console.log(res);
  };
  const getCollectionsByOwner = async () => {
    const res = await iExecDataProtectorClient.sharing.getCollectionsByOwner({
      owner: u2,
    });
    console.log(res);
  };

  const setProtectedDataToRenting = async () => {
    const res =
      await iExecDataProtectorClient.sharing.setProtectedDataToRenting({
        protectedData: protectedData,
        price: 0, // 0 nRLC
        duration: 60 * 60 * 24 * 30, // 30 days
      });
    console.log(res);
  };
  const rentProtectedData = async () => {
    const res = await iExecDataProtectorClient.sharing.rentProtectedData({
      protectedData: protectedData,
      price: 0, // 0 nRLC
      duration: 60 * 60 * 24 * 30, // 1 days
    });
    console.log(res);
  };
  const getRentals = async () => {
    const res = await iExecDataProtectorClient.sharing.getRentals({
      protectedData: protectedData,
    });
    console.log(res);
  };

  return (
    <div className="">
      temp
      <div className="flex flex-col justify-center items-center gap-2 ">
        <button className="btn w-60" onClick={getCollectionsByOwner}>
          getCollectionsByOwner
        </button>
        <button className="btn w-60" onClick={createProtectedData}>
          createProtectedData
        </button>
        <button className="btn w-60" onClick={getProtectedData}>
          getProtectedData
        </button>
        <button className="btn w-60" onClick={getGrantedAccess}>
          getGrantedAccess
        </button>
        <button className="btn w-60" onClick={revokeAllAccess}>
          revokeAllAccess
        </button>
        <button className="btn w-60" onClick={transferOwnership}>
          transferOwnership
        </button>
        <button className="btn w-60" onClick={grantAccess}>
          grantAccess
        </button>
        <button className="btn w-60" onClick={processProtectedData}>
          processProtectedData
        </button>
      </div>
      <div>Collections</div>
      <div className="flex flex-col justify-center items-center gap-2 ">
        <button className="btn w-60" onClick={createAddOnlyAppWhitelist}>
          createAddOnlyAppWhitelist
        </button>
        <button className="btn w-60" onClick={addAppToAddOnlyAppWhitelist}>
          addAppToAddOnlyAppWhitelist
        </button>
        <button className="btn w-60" onClick={createCollection}>
          createCollection
        </button>
        <button className="btn w-60" onClick={addToCollection}>
          addToCollection
        </button>
        <button className="btn w-60" onClick={getCollectionsByOwner}>
          getCollectionsByOwner
        </button>
        <button className="btn w-60" onClick={getProtectedDataInCollections}>
          getProtectedDataInCollections
        </button>
        <button className="btn w-60" onClick={getRentals}>
          getRentals
        </button>
        <button className="btn w-60" onClick={setProtectedDataToRenting}>
          setProtectedDataToRenting
        </button>
        <button className="btn w-60" onClick={rentProtectedData}>
          rentProtectedData
        </button>
        <button className="btn w-60" onClick={consumeProtectedData}>
          consumeProtectedData
        </button>
        <button className="btn w-60" onClick={getResultFromCompletedTask}>
          getResultFromCompletedTask
        </button>
      </div>
    </div>
  );
}

export default Temp;
