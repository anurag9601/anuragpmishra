import Image from "next/image";
import React from "react";
import { GoDotFill } from "react-icons/go";

const Messages = () => {
  return (
    <div>
      <div className="flex items-start gap-[10px]">
        <Image
          src=""
          alt="user-img"
          height={35}
          width={35}
          className="bg-zinc-100 rounded-full max-h-[35px] max-w-[35px]"
        />
        <div className="flex flex-col gap-[3px]">
          <p className="flex flex-wrap items-center gap-[5px] text-[13px] text-zinc-400">
            <span>Anurag Premnath Mishra</span>
            <GoDotFill className="text-[10px]" />{" "}
            <span>13 may 2025 at 12:40 PM</span>
          </p>
          <p className="text-[13px] text-zinc-100">Your message</p>
        </div>
      </div>
    </div>
  );
};

export default Messages;
