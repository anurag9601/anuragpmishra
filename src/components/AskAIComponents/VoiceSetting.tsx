"use client";

import { AskAIContext } from "@/context/AskAIContext";
import Image from "next/image";
import React, { ChangeEvent, useContext, useState } from "react";
import { voiceData } from "../../../public/data/voiceData";

const VoiceSetting = () => {
  const {
    selectedVoice,
    setSelectedVoice,
    selectedLanguage,
    setSelectedLanguage,
  } = useContext(AskAIContext);

  const voices = window.speechSynthesis.getVoices();

  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);

  function handleSelectVoiceOnChange(e: ChangeEvent<HTMLSelectElement>) {
    const selectedIndex = e.target.selectedIndex;
    const selectedVoiceURI = e.target.value;

    setSelectedVoice({
      name: selectedVoiceURI,
      index: selectedIndex,
    });

    window.speechSynthesis.cancel();

    const voice = voices[selectedIndex];

    const message = `Hey I am ${
      voiceData[selectedVoiceURI]
        ? voiceData[selectedVoiceURI].split(" ")[0]
        : selectedVoiceURI
    }`;

    const speech = new SpeechSynthesisUtterance();
    speech.text = message;
    speech.lang = voice.lang;
    speech.voice = voice;
    window.speechSynthesis.speak(speech);
  }

  return (
    <div className="fixed z-[9999] top-[12%] left-[20px] flex items-start gap-[10px]">
      <Image
        src="/images/settings.png"
        alt="settings"
        height={40}
        width={40}
        className="h-[30px] w-[30px] md:h-[40px] md:w-[40px]"
        onClick={() => setSettingsOpen((prev) => !prev)}
      />
      {settingsOpen && (
        <div className="flex items-center gap-[5px] p-[10px] bg-zinc-800 rounded-md setting-left-slide">
          <div className="flex flex-col gap-[5px]">
            <p className="text-[10px] font-[600] ml-[5px]">AI Voice</p>
            <select
              value={voiceData[selectedVoice.index]}
              onChange={(e) => handleSelectVoiceOnChange(e)}
              className="h-[25px] w-[70px] bg-zinc-800 rounded-lg text-[14px] text-zinc-50 outline-none border-[1.5px] border-zinc-500 focus:border-blue-500 cursor-pointer"
            >
              {voices.map((voice, i) => {
                return (
                  <option
                    value={voice.voiceURI}
                    key={i}
                    className="max-w-[70px] w-full h-[25px]"
                  >
                    {voiceData[voice.voiceURI] ?? voice.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex flex-col gap-[5px]">
            <p className="text-[10px] font-[600] ml-[5px]">Speak Lang</p>
            <select
              className="h-[25px] w-[73px] bg-zinc-800 rounded-lg text-[14px] text-zinc-50 outline-none border-[1.5px] border-zinc-500 focus:border-blue-500 cursor-pointer"
              value={selectedLanguage}
              onChange={(e) => {
                setSelectedLanguage(e.target.value);
              }}
            >
              <option value={"hi-IN"}>हिन्दी</option>
              <option value={"en-IN"}>English (India)</option>
              <option value={"en-US"}>English (US)</option>
              <option value={"fr-FR"}>French</option>
              <option value={"de-DE"}>German</option>
              <option value={"es-ES"}>Spanish</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceSetting;
