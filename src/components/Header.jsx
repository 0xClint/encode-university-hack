import React, { useState } from "react";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Snippet,
} from "@nextui-org/react";
import { useGame } from "../contexts/gameProvider";
import { shortenAddress } from "../utils/converters";

export const Header = () => {
  const [isAuthenticated, setAuthenticated] = useState(true);

  const { connectWallet, account, isConnected } = useGame();

  return (
    <div className="flex justify-between p-3">
      <div
        // onClick={() => router.push("/")}
        className="cursor-pointer hover:scale-105 ease-in duration-100"
      >
        {/* <PixiverseName className="h-10" /> */}
      </div>
      <div className=" flex">
        {isConnected ? (
          <button className=" btn hover:bg-slate-50">
            {shortenAddress(account)}
          </button>
        ) : (
          <button
            onClick={() => connectWallet()}
            className=" btn hover:bg-slate-50"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
};
