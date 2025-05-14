import { AskAIContext } from "@/context/AskAIContext";
import React, { useContext, useEffect, useRef, useState } from "react";

const AIRes = () => {
  const { setSpeaking, AIRes, setAIRes, selectedVoice, selectedLanguage } =
    useContext(AskAIContext);

  const hasSpokenRef = useRef<boolean>(false);

  const [muted, setMuted] = useState<boolean>(false);

  function speakChunks(
    chunks: string[],
    index: number = 0,
    muted: boolean = false,
    onComplete?: () => void
  ) {
    if (index >= chunks.length) {
      onComplete?.();
      return;
    }

    let voices = window.speechSynthesis.getVoices();
    if (!voices.length) {
      window.speechSynthesis.onvoiceschanged = () => {
        voices = window.speechSynthesis.getVoices();
      };
    }

    const utterance = new SpeechSynthesisUtterance(chunks[index]);
    utterance.voice = voices[selectedVoice.index];
    utterance.volume = muted ? 0 : 1;

    utterance.onend = () => speakChunks(chunks, index + 1, muted, onComplete);
    utterance.onerror = (e) => {
      console.error("Speech error:", e.error);
    };

    if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
      window.speechSynthesis.cancel();
    }
    window.speechSynthesis.speak(utterance);
  }

  function handleCancelAI() {
    window.speechSynthesis.cancel();
    setAIRes(null);
    setSpeaking("user");
  }

  function muteAI() {
    setMuted((prev) => !prev);
  }

  function splitTextIntoChunks(text: string, maxLength: number = 100) {
    let words: string[] = text.split(/[.!?।,\\]+/);

    const chunks: string[] = [];

    let currentChunk = "";
    for (const word of words) {
      if ((currentChunk + `${word} `).length > maxLength) {
        chunks.push(currentChunk);
        currentChunk = `${word} `;
      } else {
        currentChunk += `${word} `;
      }
    }
    if (currentChunk) chunks.push(currentChunk);

    return chunks;
  }

  useEffect(() => {
    if (AIRes && hasSpokenRef.current === false) {
      const chunks = splitTextIntoChunks(AIRes);
      speakChunks(chunks, 0, muted, () => {
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
        src="https://lottie.host/embed/51839934-3c4a-4e37-b4f0-fa46850a145e/OaVikc7wtn.lottie"
        className="h-[90%] w-[90%]"
      ></iframe>
    </div>
  );
};

export default AIRes;
