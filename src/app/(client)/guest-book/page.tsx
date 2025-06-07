import Messages from "@/components/GuestBookComponents/Messages";
import SendMessage from "@/components/GuestBookComponents/SendMessage";
import Image from "next/image";
import React from "react";

const GuestBook = async () => {

  return (
    <div className="h-screen w-screen bg-neutral-950 overflow-x-hidden overflow-y-auto flex flex-col px-[10%] py-[70px] font-app text-zinc-100">
      <div className="flex items-center gap-[20px]">
        <Image src="/images/flower.webp" alt="flower" height={40} width={40} />
        <h1 className="text-2xl md:text-4xl font-[600]">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent font-[800]">
            Guest Book
          </span>
        </h1>
      </div>
      <SendMessage />
      <Messages />
    </div>
  );
};

export default GuestBook;
