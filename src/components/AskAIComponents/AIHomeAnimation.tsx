"use client";
import { AskAIContext } from "@/context/AskAIContext";
import React, { useContext, useEffect, useRef, useState } from "react";

const AIHomeAnimation = () => {
  const { setSpeaking } = useContext(AskAIContext);

  const mainContainerRef = useRef<HTMLDivElement | null>(null);

  const iframeContanerRef = useRef<HTMLDivElement | null>(null);

  const [mouseCordinate, setMouseCordinate] = useState<{
    [key: string]: number;
  }>({
    x: 0,
    y: 0,
  });

  const [showMessage, setShowMessage] = useState<boolean>(false);

  function handleUserMouseMove(e: MouseEvent) {
    const container = mainContainerRef.current;

    const iframeContaner = iframeContanerRef.current;

    if (!container || !iframeContaner) return;

    setMouseCordinate({ x: e.clientX, y: e.clientY });

    if (e.target === container || e.target === iframeContaner) {
      setShowMessage(true);
    } else {
      setShowMessage(false);
    }
  }

  function handleMouseLeave() {
    setShowMessage(false);
  }

  useEffect(() => {
    const container = mainContainerRef.current;

    if (container) {
      container.addEventListener("mousemove", handleUserMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleUserMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  function handleUserClick() {
    setSpeaking("user");
  }

  return (
    <div
      className="flex-1 flex items-center justify-center px-[10%] py-[70px] relative"
      onClick={handleUserClick}
      ref={mainContainerRef}
    >
      <h2
        className={`h-[30px] w-[120px] bg-zinc-100 text-zinc-950 flex items-center justify-center rounded-lg text-[14px] font-bold fixed top-[120px] left-[50%] translate-[-50%] sm:invisible indication-tag-animation`}
      >
        Tap to Proceed 
      </h2>
      <h2
        className={`h-[30px] w-[120px] bg-zinc-100 text-zinc-950 flex items-center justify-center rounded-lg text-[14px] font-bold fixed transition-opacity duration-200 ${
          showMessage ? "opacity-100" : "opacity-0"
        }`}
        style={{
          top: mouseCordinate.y,
          left: mouseCordinate.x,
          zIndex: 9999,
          pointerEvents: "none",
        }}
      >
        Ask Anything
      </h2>

      <div className="h-[80%] w-[80%] relative" ref={iframeContanerRef}>
        <iframe
          src="https://lottie.host/embed/082ff14d-cc1a-4a94-9fb0-f2fe99621a0d/4baHvoP3cD.lottie"
          className="h-full w-full"
          style={{
            pointerEvents: "none",
          }}
        ></iframe>
      </div>
    </div>
  );
};

export default AIHomeAnimation;
