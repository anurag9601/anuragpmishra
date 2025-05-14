"use client";

import AIHomeAnimation from "@/components/AskAIComponents/AIHomeAnimation";
import AIResponse from "@/components/AskAIComponents/AIResponse";
import AuthenticationWindow from "@/components/AskAIComponents/AuthenticationWindow";
import UserQuery from "@/components/AskAIComponents/UserQuery";
import VoiceSetting from "@/components/AskAIComponents/VoiceSetting";
import { AskAIContext } from "@/context/AskAIContext";
import { useSession } from "next-auth/react";
import React, { useContext } from "react";

const AskAI = () => {
  const { speaking } = useContext(AskAIContext);

  const { status } = useSession();

  return (
    <div
      className="h-screen w-screen overflow-hidden flex font-app text-zinc-100 font-app cursor-pointer relative"
      style={{ background: "#05050B" }}
    >
      {status === "unauthenticated" && <AuthenticationWindow />}
      {status === "authenticated" && (
        <>
          {speaking !== "ai" && <VoiceSetting />}
          {!speaking && <AIHomeAnimation />}
          {speaking === "user" && <UserQuery />}
          {speaking === "ai" && <AIResponse />}
        </>
      )}
    </div>
  );
};

export default AskAI;
