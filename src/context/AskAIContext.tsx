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
};

export const AskAIContext = createContext<AskAIContextDataType>({
  speaking: null,
  setSpeaking: () => {},
  userSpeaking: false,
  setUserSpeaking: () => {},
  AIRes: null,
  setAIRes: () => {},
});

function AskAIContextProvider({ children }: { children: ReactNode }) {
  const [speaking, setSpeaking] = useState<null | "user" | "ai">(null);

  const [userSpeaking, setUserSpeaking] = useState<boolean>(false);

  const [AIRes, setAIRes] = useState<string | null>(null);

  const values = {
    speaking,
    setSpeaking,
    userSpeaking,
    setUserSpeaking,
    AIRes,
    setAIRes,
  };

  return (
    <AskAIContext.Provider value={values}>{children}</AskAIContext.Provider>
  );
}

export default AskAIContextProvider;
