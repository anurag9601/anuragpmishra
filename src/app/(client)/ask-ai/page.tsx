"use client";

import AIHomeAnimation from "@/components/AskAIComponents/AIHomeAnimation";
import AIResponse from "@/components/AskAIComponents/AIResponse";
import UserQuery from "@/components/AskAIComponents/UserQuery";
import { AskAIContext } from "@/context/AskAIContext";
import React, { useContext } from "react";

const AskAI = () => {
  const { speaking } = useContext(AskAIContext);

  return (
    <div
      className="h-screen w-screen overflow-hidden flex font-app text-zinc-100 font-app cursor-pointer relative"
      style={{ background: "#05050B" }}
    >
      {!speaking && <AIHomeAnimation />}
      {speaking === "user" && <UserQuery />}
      {speaking === "ai" && <AIResponse />}
    </div>
  );
};

export default AskAI;
