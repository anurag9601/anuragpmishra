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
    <div className="fixed inset-0 z-[999] bg-[rgba(0,0,0,.8)] overflow-y-auto">
      <div className="min-h-screen flex items-center justify-center font-app px-[5%] md:px-[0%]">
        <div
          className="md:w-[80%] lg:w-[60%] w-full flex zoomIn-animation"
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
    </div>
  );
};

export default ConnectWindow;
