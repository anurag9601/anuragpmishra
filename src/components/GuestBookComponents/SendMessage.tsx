"use client";

import { AppContext } from "@/context/appContext";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useContext, useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { IoSend } from "react-icons/io5";
import { PiSignOutBold } from "react-icons/pi";

const SendMessage = () => {
  const { data, status } = useSession();

  const { setNotification } = useContext(AppContext);

  const [message, setMessage] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  function handleUserSignOut() {
    if (status === "authenticated") {
      signOut();
    }
  }

  async function handleSendMessage() {
    if (loading) return;

    if (data && data.user) {
      setLoading(true);
      const user = data.user;

      const request = await fetch("/api/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail: user.email,
          message,
        }),
      });

      const response = await request.json();

      if (response.success === true) {
        setMessage("");
        setNotification(
          `Thank you for sharing your thoughts with us! 💬 Your words mean a lot 😊✨`
        );
        router.refresh();
      } else if (response.error) {
        setNotification(response.error);
      }
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-h-[75px] h-full my-[30px]">
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
        <div className="flex flex-col gap-[10px] max-w-[600px] w-full">
          <div className="flex-1 flex items-center justify-between gap-[8px]">
            <p className="text-[13px] font-[700] text-zinc-300">Your message</p>
            <p
              className="text-[13px] font-[400] text-zinc-300 flex items-center gap-[5px] group cursor-pointer"
              onClick={handleUserSignOut}
            >
              <PiSignOutBold />{" "}
              <span className="group-hover:underline">Sign out</span>
            </p>
          </div>
          <div className="flex items-center gap-[8px]">
            <input
              type="text"
              placeholder="Please type your message here..."
              className={`w-full h-[35px] border-[1px] border-zinc-700 rounded-md outline-none px-[15px] text-[15px] ${
                loading === false ? "focus:border-blue-400" : "opacity-[.5]"
              } duration-300`}
              readOnly={loading === true}
              value={message}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setMessage(e.target.value)
              }
            />
            <button
              className={`h-[35px] min-w-[35px] rounded-md flex items-center justify-center ${
                message.length == 0 ? "bg-zinc-800" : "bg-zinc-700"
              } ${
                message.length === 0 || loading === true
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              disabled={message.length === 0}
              onClick={handleSendMessage}
            >
              {loading === false ? (
                <IoSend
                  className={`text-lg ${
                    message.length == 0 ? "text-zinc-500" : "text-zinc-100"
                  }`}
                />
              ) : (
                <div className="border-[3px] h-[20px] w-[20px] rounded-full border-t-blue-600 loading-spin"></div>
              )}
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
