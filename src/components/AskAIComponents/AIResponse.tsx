import { AskAIContext } from "@/context/AskAIContext";
import React, { useContext } from "react";

const AIResponse = () => {
  const { setSpeaking } = useContext(AskAIContext);

  return (
    <div className="flex-1 flex items-center justify-center px-[10%] py-[70px]">
      <iframe
        src="https://lottie.host/embed/081227ed-2643-4cd5-80bc-4cd8c80d3a8f/2NMhcicCzA.lottie"
        className="h-[80%] w-[80%] cursor-pointer"
      ></iframe>
    </div>
  );
};

export default AIResponse;
