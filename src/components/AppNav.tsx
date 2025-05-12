"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const AppNav = () => {
  const router = useRouter();

  return (
    <div className="fixed top-[5px] left-[50%] w-[90%] md:w-[80%] md:w-fit h-[50px] bg-zinc-900 border-[1px] border-zinc-800 p-[20px] rounded-lg flex items-center justify-evenly gap-[10px] md:gap-[30px] text-slate-200 font-app translate-x-[-50%] text-sm appNav-animation font-[600]">
      <div
        className="flex items-center justify-center gap-[10px] cursor-pointer"
        onClick={() => router.push("/")}
      >
        <Image
          src="/images/my-image.png"
          alt="my-image"
          height={30}
          width={30}
          className="rounded-full object-center object-cover"
        />
        <p>Anurag Mishra</p>
      </div>
      <div className="py-[5px] px-[10px] hover:bg-neutral-800 rounded-lg cursor-pointer ease-out duration-200">
        Ask me
      </div>
      <div
        className="py-[5px] px-[10px] hover:bg-neutral-800 rounded-lg cursor-pointer ease-out duration-200"
        onClick={() => router.push("/guest-book")}
      >
        Guest Book
      </div>
    </div>
  );
};

export default AppNav;
