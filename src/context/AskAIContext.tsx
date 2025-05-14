"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

type AskAIContextDataType = {
  speaking: null | "user" | "ai";
  setSpeaking: Dispatch<SetStateAction<null | "user" | "ai">>;
  userSpeaking: boolean;
  setUserSpeaking: Dispatch<SetStateAction<boolean>>;
  AIRes: string | null;
  setAIRes: Dispatch<SetStateAction<string | null>>;
  selectedVoice: {
    name: string;
    index: number;
  };
  setSelectedVoice: Dispatch<
    SetStateAction<{
      name: string;
      index: number;
    }>
  >;
  selectedLanguage: string;
  setSelectedLanguage: Dispatch<SetStateAction<string>>;
};

export const AskAIContext = createContext<AskAIContextDataType>({
  speaking: null,
  setSpeaking: () => {},
  userSpeaking: false,
  setUserSpeaking: () => {},
  AIRes: null,
  setAIRes: () => {},
  selectedVoice: {
    name: "",
    index: 0,
  },
  setSelectedVoice: () => {},
  selectedLanguage: "en-IN",
  setSelectedLanguage: () => {},
});

function AskAIContextProvider({ children }: { children: ReactNode }) {
  const [speaking, setSpeaking] = useState<null | "user" | "ai">(null);

  const [userSpeaking, setUserSpeaking] = useState<boolean>(false);

  const [AIRes, setAIRes] = useState<string | null>(null);

  const [selectedVoice, setSelectedVoice] = useState<{
    name: string;
    index: number;
  }>({
    name: "",
    index: 12,
  });

  const [selectedLanguage, setSelectedLanguage] = useState<string>("en-IN");

  const values = {
    speaking,
    setSpeaking,
    userSpeaking,
    setUserSpeaking,
    AIRes,
    setAIRes,
    selectedVoice,
    setSelectedVoice,
    selectedLanguage,
    setSelectedLanguage,
  };

  return (
    <AskAIContext.Provider value={values}>{children}</AskAIContext.Provider>
  );
}

export default AskAIContextProvider;
