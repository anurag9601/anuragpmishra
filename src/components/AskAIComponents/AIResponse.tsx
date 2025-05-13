import { AskAIContext } from "@/context/AskAIContext";
import React, { useContext, useEffect, useRef, useState } from "react";

const AIRes = () => {
  const { setSpeaking, AIRes, setAIRes } = useContext(AskAIContext);

  const hasSpokenRef = useRef<boolean>(false);

  const [muted, setMuted] = useState<boolean>(false);

  function speakAI(
    response: string,
    muted: boolean = false,
    onComplete?: () => void
  ) {
    const speech = new SpeechSynthesisUtterance();
    speech.text = response;
    speech.volume = muted ? 0 : 1;

    speech.onend = () => {
      if (onComplete) onComplete();
    };

    speech.onerror = (event) => {
      // alert("OOps!! Something went wrong. 😶‍🌫️");
      console.error("Speech error:", event.error);
    };

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
  }

  function handleCancelAI() {
    window.speechSynthesis.cancel();
    setAIRes(null);
    setSpeaking("user");
  }

  function muteAI() {
    setMuted((prev) => !prev);
  }

  useEffect(() => {
    if (AIRes && hasSpokenRef.current === false) {
      speakAI(AIRes, muted, () => {
        hasSpokenRef.current = true;
        setAIRes(null);
        setSpeaking("user");
      });
    }
  }, [AIRes, muted]);

  return (
    <div className="flex-1 flex items-center justify-center px-[10%] py-[70px] relative">
      <div className="absolute top-[80px] right-[20px] flex items-center gap-[10px]">
        <button
          className="h-[30px] w-[120px] bg-zinc-100 text-zinc-950 flex items-center justify-center rounded-lg text-[14px] font-bold cursor-pointer hover:scale-[1.05] duration-300 note-blink"
          onClick={handleCancelAI}
        >
          Cancel Voice
        </button>
        <button
          className="h-[30px] w-[120px] bg-zinc-100 text-zinc-950 flex items-center justify-center rounded-lg text-[14px] font-bold cursor-pointer hover:scale-[1.05] duration-300 note-blink"
          onClick={muteAI}
        >
          {muted ? "Unmute AI" : "Mute AI"}
        </button>
      </div>
      <iframe
        src="https://lottie.host/embed/d8bf3e97-6073-47a8-a48e-297bd24ecac1/MwwATZFpJ3.lottie"
        className="h-[90%] w-[90%] cursor-pointer"
      ></iframe>
    </div>
  );
};

export default AIRes;
