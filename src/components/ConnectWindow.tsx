"use client";
import React, { useContext, useEffect, useRef } from "react";
import Options from "./ConnectWindowComponents/Options";
import { ConnectionContext } from "@/context/ConnectionContext";
import UserInfoForm from "./ConnectWindowComponents/UserInfoForm";
import DetailsForm from "./ConnectWindowComponents/DetailsForm";
import ProjectDetailsUploadForm from "./ConnectWindowComponents/ProjectDetailsUploadForm";

const ConnectWindow: React.FC = () => {
  const { selectedTab, setConnectWindowOpen, connectionDetailsWindowOpen } =
    useContext(ConnectionContext);

  const contentContainerRef = useRef<HTMLDivElement | null>(null);

  function handleUserClick(e: MouseEvent) {
    if (
      contentContainerRef.current &&
      !contentContainerRef.current.contains(e.target as Node)
    ) {
      setConnectWindowOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleUserClick);

    return () => {
      document.removeEventListener("mousedown", handleUserClick);
    };
  }, []);

  return (
    <div className="fixed flex-1 h-full w-full bg-[rgba(0,0,0,.8)] flex items-center justify-center font-app z-[999] overflow-y-auto">
      <div
        className="px-[5%] md:px-[0%] md:w-[80%] lg:w-[60%] w-full flex"
        ref={contentContainerRef}
      >
        {!selectedTab ? (
          <Options />
        ) : connectionDetailsWindowOpen === false ? (
          <UserInfoForm />
        ) : (
          <DetailsForm />
        )}
      </div>
    </div>
  );
};

export default ConnectWindow;
