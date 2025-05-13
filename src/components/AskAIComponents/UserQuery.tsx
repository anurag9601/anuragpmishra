import { AskAIContext } from "@/context/AskAIContext";
import { getResponseFromGemini } from "@/services/llm";
import React, { useContext, useEffect, useRef, useState } from "react";

const UserQuery = () => {
  const { setSpeaking, userSpeaking, setUserSpeaking, setAIRes } =
    useContext(AskAIContext);

  const mainContainerRef = useRef<HTMLDivElement | null>(null);

  const iframeContanerRef = useRef<HTMLDivElement | null>(null);

  const [mouseCordinate, setMouseCordinate] = useState<{
    [key: string]: number;
  }>({
    x: 0,
    y: 0,
  });

  const [showMessage, setShowMessage] = useState<boolean>(false);

  function handleUserToSpeak() {
    if (userSpeaking === false) {
      navigator.permissions
        .query({ name: "microphone" as PermissionName })
        .then((permissionStatus) => {
          if (permissionStatus.state === "granted") {
            setUserSpeaking(true);
            const SpeechRecognition =
              (window as any).SpeechRecognition ||
              (window as any).webkitSpeechRecognition;

            if (!SpeechRecognition) {
              console.error(
                "Speech Recognition is not supported in this browser."
              );
              return;
            }

            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;

            recognition.onstart = function () {
              console.log("Recognition started");
            };

            recognition.onresult = async function (event: any) {
              const transcript = event.results[0][0].transcript;
              const response = await getResponseFromGemini(transcript);
              if (response) {
                setAIRes(response);
              }
              setSpeaking("ai");
              setUserSpeaking(false);
            };

            recognition.onerror = function (event: any) {
              alert(
                "⚠️ Maybe your browser doesn’t support this feature. 🌐 Try using Google Chrome it usually works smoothly! ✅🚀"
              );
              console.log(event.error);
            };

            recognition.start();
          } else if (permissionStatus.state === "prompt") {
            navigator.mediaDevices
              .getUserMedia({ audio: true })
              .then(() => {
                setUserSpeaking(true);
                const SpeechRecognition =
                  (window as any).SpeechRecognition ||
                  (window as any).webkitSpeechRecognition;

                if (!SpeechRecognition) {
                  console.error(
                    "Speech Recognition is not supported in this browser."
                  );
                  return;
                }

                const recognition = new SpeechRecognition();
                recognition.continuous = false;
                recognition.interimResults = false;
                recognition.maxAlternatives = 1;

                recognition.onstart = function () {
                  console.log("Recognition started");
                };

                recognition.onresult = async function (event: any) {
                  const transcript = event.results[0][0].transcript;
                  const response = await getResponseFromGemini(transcript);
                  if (response) {
                    setAIRes(response);
                  }
                  setSpeaking("ai");
                  setUserSpeaking(false);
                };

                recognition.onerror = function (event: any) {
                  alert(
                    "⚠️ Maybe your browser doesn’t support this feature. 🌐 Try using Google Chrome it usually works smoothly! ✅🚀"
                  );
                  console.log(event.error);
                };

                recognition.start();
              })
              .catch(() => {
                alert(
                  "🎙️ Please allow microphone access so we can hear you. 🤖"
                );
              });
          } else if (permissionStatus.state === "denied") {
            alert(
              "🎙️ Microphone access is blocked. Please enable it from your browser settings."
            );
          }
        });
    }
  }

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

  return (
    <div
      className="flex-1 flex items-center justify-center px-[10%] py-[70px] relative"
      ref={mainContainerRef}
      onClick={handleUserToSpeak}
    >
      {!userSpeaking && (
        <h2
          className={`h-[30px] w-[120px] bg-zinc-100 text-zinc-950 flex items-center justify-center rounded-lg text-[14px] font-bold fixed top-[120px] left-[50%] translate-[-50%] sm:invisible indication-tag-animation`}
        >
          Click to Talk
        </h2>
      )}
      {!userSpeaking && (
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
          Click to Talk
        </h2>
      )}

      <div className="h-[80%] w-[80%] relative" ref={iframeContanerRef}>
        {userSpeaking === true ? (
          <iframe
            src="https://lottie.host/embed/081227ed-2643-4cd5-80bc-4cd8c80d3a8f/2NMhcicCzA.lottie"
            className="h-full w-full"
            style={{
              pointerEvents: "none",
            }}
          ></iframe>
        ) : (
          <iframe
            src="https://lottie.host/embed/88eb4a2e-1ca1-40d5-815e-44f471bceafe/hwzFpBC9wk.lottie"
            className="h-full w-full"
            style={{
              pointerEvents: "none",
            }}
          ></iframe>
        )}
      </div>
    </div>
  );
};

export default UserQuery;
