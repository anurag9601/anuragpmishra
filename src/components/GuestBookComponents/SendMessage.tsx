"use client";

import React, { ChangeEvent, useState } from "react";
import { IoSend } from "react-icons/io5";
import { PiSignOutBold } from "react-icons/pi";

const SendMessage = () => {
  const [message, setMessage] = useState<string>("");
  return (
    <div className="w-full h-full mt-[30px]">
      <div className="flex items-center justify-between gap-[10px] max-w-[600px] w-full">
        <div className="flex-1 flex flex-col gap-[8px]">
          <p className="text-[13px] font-[700] text-zinc-300">Your message</p>
          <input
            type="text"
            placeholder="Please type your message here..."
            className="w-full h-[35px] border-[1px] border-zinc-700 rounded-md outline-none px-[15px] text-[15px] focus:border-blue-400 duration-300"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setMessage(e.target.value)
            }
          />
        </div>
        <div className="flex flex-col gap-[8px]">
          <p className="text-[13px] font-[400] text-zinc-300 flex items-center gap-[5px] group cursor-pointer">
            <PiSignOutBold />{" "}
            <span className="group-hover:underline">Sign out</span>
          </p>
          <button
            className={`h-[35px] w-[35px] rounded-md flex items-center justify-center ${message.length == 0 ? "bg-zinc-800" : "bg-zinc-700"} ${
              message.length === 0 ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            <IoSend
              className={`text-lg ${
                message.length == 0 ? "text-zinc-500" : "text-zinc-100"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendMessage;
