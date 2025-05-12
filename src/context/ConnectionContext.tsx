"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

type connectUserAllInfoDataType = {
  userName: string;
  email: string;
  companyName: string;
  questionCategory: string;
  urgencyLevel: string;
  preferredResponseTime: string;
  yourQuestion: string;
  projectType: string;
  budgetRange: string;
  timelinePereference: string;
  teamSize: string;
  techinalRequirements: string;
  projectDetails: string;
};

type ConnectionContextDataType = {
  connectWindowOpen: boolean;
  setConnectWindowOpen: Dispatch<SetStateAction<boolean>>;
  selectedTab: "inquiry" | "collaboration" | null;
  setSelectedTab: Dispatch<SetStateAction<"inquiry" | "collaboration" | null>>;
  connectionDetailsWindowOpen: boolean;
  setConnectionDetailsWindowOpen: Dispatch<SetStateAction<boolean>>;
  connectUserAllInfo: connectUserAllInfoDataType;
  setConnectUserAllInfo: Dispatch<SetStateAction<connectUserAllInfoDataType>>;
  projectDetailUploadWindowOpen: boolean;
  setProjectDetailUploadWindowOpen: Dispatch<SetStateAction<boolean>>;
  projectFiles: File[];
  setProjectFiles: Dispatch<SetStateAction<File[]>>;
};

export const ConnectionContext = createContext<ConnectionContextDataType>({
  connectWindowOpen: false,
  setConnectWindowOpen: () => {},
  selectedTab: null,
  setSelectedTab: () => {},
  connectionDetailsWindowOpen: false,
  setConnectionDetailsWindowOpen: () => {},
  connectUserAllInfo: {
    userName: "",
    email: "",
    companyName: "",
    questionCategory: "",
    urgencyLevel: "",
    preferredResponseTime: "",
    yourQuestion: "",
    projectType: "",
    budgetRange: "",
    timelinePereference: "",
    teamSize: "",
    techinalRequirements: "",
    projectDetails: "",
  },
  setConnectUserAllInfo: () => {},
  projectDetailUploadWindowOpen: false,
  setProjectDetailUploadWindowOpen: () => {},
  projectFiles: [],
  setProjectFiles: () => {},
});

function ConnectionContextProvider({ children }: { children: ReactNode }) {
  const [connectWindowOpen, setConnectWindowOpen] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<
    "inquiry" | "collaboration" | null
  >(null);
  const [connectionDetailsWindowOpen, setConnectionDetailsWindowOpen] =
    useState<boolean>(false);

  const [connectUserAllInfo, setConnectUserAllInfo] =
    useState<connectUserAllInfoDataType>({
      userName: "",
      email: "",
      companyName: "",
      questionCategory: "General",
      urgencyLevel: "Medium",
      preferredResponseTime: "",
      yourQuestion: "",
      projectType: "Web Application",
      budgetRange: "₹5L - ₹10L",
      timelinePereference: "3-6 Months",
      teamSize: "",
      techinalRequirements: "",
      projectDetails: "",
    });

  const [projectDetailUploadWindowOpen, setProjectDetailUploadWindowOpen] =
    useState<boolean>(false);

  const [projectFiles, setProjectFiles] = useState<File[]>([]);

  const values = {
    connectWindowOpen,
    setConnectWindowOpen,
    selectedTab,
    setSelectedTab,
    connectionDetailsWindowOpen,
    setConnectionDetailsWindowOpen,
    connectUserAllInfo,
    setConnectUserAllInfo,
    projectDetailUploadWindowOpen,
    setProjectDetailUploadWindowOpen,
    projectFiles,
    setProjectFiles,
  };

  return (
    <ConnectionContext.Provider value={values}>
      {children}
    </ConnectionContext.Provider>
  );
}

export default ConnectionContextProvider;
