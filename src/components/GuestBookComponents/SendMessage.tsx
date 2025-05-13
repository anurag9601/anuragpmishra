"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import React, { ChangeEvent, useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { IoSend } from "react-icons/io5";
import { PiSignOutBold } from "react-icons/pi";

const SendMessage = () => {
  const { status } = useSession();

  const [message, setMessage] = useState<string>("");

  function handleUserSignOut() {
    if (status === "authenticated") {
      signOut();
    }
  }

  return (
    <div className="w-full h-fit my-[30px]">
      {status === "loading" && (
        <div className="w-fit flex flex-col gap-[10px] loading-animation">
          <button
            onClick={() => signIn("google")}
            className="w-[200px] flex items-center justify-center gap-[10px] h-[35px] bg-zinc-400 text-zinc-900 font-[600] rounded-lg duration-300"
          ></button>
          <button
            onClick={() => signIn("github")}
            className="w-[200px] flex items-center justify-center gap-[10px] h-[35px] bg-zinc-400 text-zinc-900 font-[600] rounded-lg duration-300"
          ></button>
        </div>
      )}
      {status === "authenticated" && (
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
            <p
              className="text-[13px] font-[400] text-zinc-300 flex items-center gap-[5px] group cursor-pointer"
              onClick={handleUserSignOut}
            >
              <PiSignOutBold />{" "}
              <span className="group-hover:underline">Sign out</span>
            </p>
            <button
              className={`h-[35px] w-[35px] rounded-md flex items-center justify-center ${
                message.length == 0 ? "bg-zinc-800" : "bg-zinc-700"
              } ${
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
      )}
      {status === "unauthenticated" && (
        <div className="w-fit flex flex-col gap-[10px]">
          <button
            onClick={() => signIn("google")}
            className="w-[200px] flex items-center justify-center gap-[10px] text-[15px] cursor-pointer h-[35px] bg-zinc-100 text-zinc-900 font-[600] rounded-lg hover:scale-[1.05] duration-300"
          >
            <FcGoogle className="text-[20px]" /> Sign in with Google
          </button>
          <button
            onClick={() => signIn("github")}
            className="w-[200px] flex items-center justify-center gap-[10px] text-[15px] cursor-pointer h-[35px] bg-zinc-100 text-zinc-900 font-[600] rounded-lg hover:scale-[1.05] duration-300"
          >
            <AiFillGithub className="text-[20px]" /> Sign in with Github
          </button>
        </div>
      )}
    </div>
  );
};

export default SendMessage;
