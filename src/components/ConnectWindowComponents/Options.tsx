"use client";

import { ConnectionContext } from "@/context/ConnectionContext";
import React, { useContext } from "react";
import { RxCross2 } from "react-icons/rx";

const Options = () => {
  const { setConnectWindowOpen } = useContext(ConnectionContext);
  return (
    <div className="px-[5%] md:px-[0%] md:w-[80%] lg:w-[60%] w-full flex flex-col gap-[20px]">
      <div className="p-[20px] bg-zinc-800 rounded-lg w-full flex items-center justify-between">
        <h1 className="text-[25px] font-[700] text-zinc-50">
          What would you like to discuss?
        </h1>
        <RxCross2
          className="text-2xl text-zinc-50 cursor-pointer h-[30px] w-[30px] rounded-full flex items-center justify-center hover:bg-zinc-500 p-[5px] duration-300"
          onClick={() => setConnectWindowOpen(false)}
        />
      </div>
      <div>
        <div>
          <div>Simple Question</div>
          <p>Quick questions or general inquiries</p>
        </div>
        <div>
          <div>Project Enquiry</div>
          <p>Discuss a potential project or collaboration</p>
        </div>
      </div>
    </div>
  );
};

export default Options;
