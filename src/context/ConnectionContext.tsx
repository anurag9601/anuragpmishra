"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

type ConnectionContextDataType = {
  connectWindowOpen: boolean;
  setConnectWindowOpen: Dispatch<SetStateAction<boolean>>;
  selectedTab: "inquiry" | "collaboration" | null;
  setSelectedTab: Dispatch<SetStateAction<"inquiry" | "collaboration" | null>>;
};

export const ConnectionContext = createContext<ConnectionContextDataType>({
  connectWindowOpen: false,
  setConnectWindowOpen: () => {},
  selectedTab: null,
  setSelectedTab: () => {},
});

function ConnectionContextProvider({ children }: { children: ReactNode }) {
  const [connectWindowOpen, setConnectWindowOpen] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<
    "inquiry" | "collaboration" | null
  >(null);

  const values = {
    connectWindowOpen,
    setConnectWindowOpen,
    selectedTab,
    setSelectedTab,
  };

  return (
    <ConnectionContext.Provider value={values}>
      {children}
    </ConnectionContext.Provider>
  );
}

export default ConnectionContextProvider;
