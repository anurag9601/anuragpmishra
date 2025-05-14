"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

type AppContextDataType = {
  notification: string | null;
  setNotification: Dispatch<SetStateAction<string | null>>;
};

export const AppContext = createContext<AppContextDataType>({
  notification: null,
  setNotification: () => {},
});

function AppContextProvider({ children }: { children: ReactNode }) {
  const [notification, setNotification] = useState<string | null>(null);
  const values = {
    notification,
    setNotification,
  };
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}

export default AppContextProvider;
