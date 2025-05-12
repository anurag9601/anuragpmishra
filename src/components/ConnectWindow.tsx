"use client";
import React, { useContext } from "react";
import Options from "./ConnectWindowComponents/Options";
import { ConnectionContext } from "@/context/ConnectionContext";

const ConnectWindow: React.FC = () => {
  const { selectedTab } = useContext(ConnectionContext);

  return (
    <div className="fixed flex-1 h-full w-full bg-[rgba(0,0,0,.8)] flex items-center justify-center font-app">
      {!selectedTab && <Options />}
    </div>
  );
};

export default ConnectWindow;
