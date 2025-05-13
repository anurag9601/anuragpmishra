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
};

export const AskAIContext = createContext<AskAIContextDataType>({
  speaking: null,
  setSpeaking: () => {},
});

function AskAIContextProvider({ children }: { children: ReactNode }) {
  const [speaking, setSpeaking] = useState<null | "user" | "ai">(null);

  const values = {
    speaking,
    setSpeaking,
  };

  return (
    <AskAIContext.Provider value={values}>{children}</AskAIContext.Provider>
  );
}

export default AskAIContextProvider;
