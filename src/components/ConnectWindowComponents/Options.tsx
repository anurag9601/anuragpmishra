"use client";

import { ConnectionContext } from "@/context/ConnectionContext";
import React, { useContext } from "react";
import { FiMessageSquare } from "react-icons/fi";
import { IoBagOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

const Options = () => {
  const { setConnectWindowOpen, setSelectedTab } =
    useContext(ConnectionContext);
  return (
    <div className="flex-1 flex flex-col px-[30px] py-[30px] gap-[20px] bg-zinc-900 rounded-lg">
      <div className=" w-full flex items-center justify-between">
        <h1 className="text-[20px] md:text-[25px] font-[700] text-zinc-50">
          What would you like to discuss?
        </h1>
        <RxCross2
          className="text-2xl text-zinc-50 cursor-pointer min-h-[30px] min-w-[30px] rounded-full flex items-center justify-center hover:bg-zinc-500 p-[5px] duration-300"
          onClick={() => setConnectWindowOpen(false)}
        />
      </div>
      <div className="flex flex-col lg:flex-row justify-between gap-[10px]">
        <div
          className="p-[30px] border-[2px] border-zinc-500 rounded-lg cursor-pointer flex-1 flex flex-col gap-[10px] hover:border-blue-400 hover:bg-neutral-900"
          onClick={() => setSelectedTab("inquiry")}
        >
          <div className="flex items-center gap-[20px] text-zinc-200 text-xl font-[600]">
            <FiMessageSquare className="text-5xl p-[12px] text-blue-500 bg-blue-950 rounded-lg" />{" "}
            Simple Question
          </div>
          <p className="text-[16px] text-zinc-400">
            Quick questions or general inquiries
          </p>
        </div>
        <div
          className="p-[30px] border-[2px] border-gray-500 rounded-lg cursor-pointer flex-1 flex flex-col gap-[10px] hover:border-blue-400 hover:bg-neutral-900"
          onClick={() => setSelectedTab("collaboration")}
        >
          <div className="flex items-center gap-[20px] text-zinc-200 text-xl font-[600]">
            <IoBagOutline className="text-5xl p-[12px] text-blue-500 bg-blue-950 rounded-lg" />{" "}
            Project Enquiry
          </div>
          <p className="text-[16px] text-zinc-400">
            Discuss a potential project or collaboration
          </p>
        </div>
      </div>
    </div>
  );
};

export default Options;
