"use client";

import { signIn } from "next-auth/react";
import React from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

const AuthenticationWindow = () => {
  return (
    <div className="h-screen w-screen flex justify-center">
      <div className="fixed h-full w-full bg-[rgba(0,0,0,.8)] z-[99]">
        <div className="w-fit flex flex-col gap-[10px] absolute bottom-[20%] md:bottom-[10%] left-[50%] translate-[-50%]">
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
      </div>
      <div className="h-[60%] w-[60%] relative mt-[7%] md:mt-[5%]">
        <iframe
          src="https://lottie.host/embed/082ff14d-cc1a-4a94-9fb0-f2fe99621a0d/4baHvoP3cD.lottie"
          className="h-full w-full"
          style={{
            pointerEvents: "none",
          }}
        ></iframe>
      </div>
      <p className="fixed z-[99] bottom-[20px] px-[10%] text-[12px] md:text-[15px] text-center bg-gradient-to-r from-teal-400 via-blue-500 to-violet-400 bg-clip-text text-transparent">
        Sign in to your AI powered assistant to learn more about me and
        everything else it&apos;s going to be an amazing experience!
      </p>
    </div>
  );
};

export default AuthenticationWindow;
