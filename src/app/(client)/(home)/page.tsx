"use client";

import AboutMe from "@/components/AboutMe";
import ConnectWindow from "@/components/ConnectWindow";
import NameSocial from "@/components/NameSocial";
import { ConnectionContext } from "@/context/ConnectionContext";
import { useContext } from "react";

export default function Home() {
  const { connectWindowOpen } = useContext(ConnectionContext);
  return (
    <>
      {connectWindowOpen && <ConnectWindow />}
      <div className="h-screen w-screen bg-neutral-950 overflow-x-hidden overflow-y-auto flex flex-col lg:flex-row items-start lg:justify-between px-[10%] lg:px-[0px]">
        <NameSocial />
        <AboutMe />
      </div>
    </>
  );
}
