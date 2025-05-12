"use client";
import { ConnectionContext } from "@/context/ConnectionContext";
import React, { ChangeEvent, useContext } from "react";
import { FiUser } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { TbBuildingSkyscraper } from "react-icons/tb";
import { z } from "zod";

const UserInfoForm = () => {
  const {
    setConnectWindowOpen,
    selectedTab,
    setSelectedTab,
    connectUserAllInfo,
    setConnectUserAllInfo,
    setConnectionDetailsWindowOpen,
  } = useContext(ConnectionContext);

  function handleZodValidation() {
    const collaborationFormFillCheck = z.object({
      userName: z.string().min(3),
      email: z.string().email(),
      companyName: z.string().min(2),
    });

    const inquiryFormFillCheck = z.object({
      userName: z.string(),
      email: z.string().email(),
    });

    if (selectedTab === "inquiry") {
      const userData = {
        userName: connectUserAllInfo.userName,
        email: connectUserAllInfo.email,
      };

      const result = inquiryFormFillCheck.safeParse(userData);

      if (result.success === true) {
        setConnectionDetailsWindowOpen(true);
      }
    } else {
      const userData = {
        userName: connectUserAllInfo.userName,
        email: connectUserAllInfo.email,
        companyName: connectUserAllInfo.companyName,
      };

      const result = collaborationFormFillCheck.safeParse(userData);

      if (result.success === true) {
        setConnectionDetailsWindowOpen(true);
      }
    }
  }

  function handleInputOnChange(
    e: ChangeEvent<HTMLInputElement>,
    inputBoxName: "userName" | "email" | "companyName"
  ) {
    const value = e.target.value;

    setConnectUserAllInfo((prev) => {
      const updatedConnectedUserAllInfo = { ...prev };
      updatedConnectedUserAllInfo[inputBoxName] = value;
      return updatedConnectedUserAllInfo;
    });
  }

  return (
    <div className="flex-1 flex flex-col px-[30px] py-[30px] gap-[20px] bg-zinc-900 rounded-lg">
      <div className=" w-full flex items-center justify-between">
        <h1 className="text-[20px] md:text-[25px] font-[700] text-zinc-50">
          Your Contact Information
        </h1>
        <RxCross2
          className="text-2xl text-zinc-50 cursor-pointer min-h-[30px] min-w-[30px] rounded-full flex items-center justify-center hover:bg-zinc-500 p-[5px] duration-300"
          onClick={() => setConnectWindowOpen(false)}
        />
      </div>
      <div className="flex flex-col gap-[20px]">
        <div className="flex flex-col gap-[8px]">
          <p className="text-zinc-200 flex items-center gap-[10px] font-[600]">
            <FiUser className="text-xl" /> Name
          </p>
          <input
            type="text"
            className="h-[50px] w-full bg-zinc-800 rounded-lg px-[15px] text-[16px] text-zinc-50 outline-none border-[1.5px] border-zinc-500 focus:border-blue-500"
            value={connectUserAllInfo.userName}
            onChange={(e) => handleInputOnChange(e, "userName")}
          />
        </div>
        <div className="flex flex-col gap-[5px]">
          <p className="text-zinc-200 flex items-center gap-[10px] font-[600]">
            <MdOutlineEmail className="text-xl" /> Email
          </p>
          <input
            type="text"
            className="h-[50px] w-full bg-zinc-800 rounded-lg px-[15px] text-[16px] text-zinc-50 outline-none border-[1.5px] border-zinc-500 focus:border-blue-500"
            value={connectUserAllInfo.email}
            onChange={(e) => handleInputOnChange(e, "email")}
          />
        </div>
        {selectedTab === "collaboration" && (
          <div className="flex flex-col gap-[5px]">
            <p className="text-zinc-200 flex items-center gap-[10px] font-[600]">
              <TbBuildingSkyscraper className="text-xl" /> Company
            </p>
            <input
              type="text"
              className="h-[50px] w-full bg-zinc-800 rounded-lg px-[15px] text-[16px] text-zinc-50 outline-none border-[1.5px] border-zinc-500 focus:border-blue-500"
              value={connectUserAllInfo.companyName}
              onChange={(e) => handleInputOnChange(e, "companyName")}
            />
          </div>
        )}
        <div className="flex items-center justify-between mt-[10px]">
          <button
            className="bg-gray-700 text-zinc-50 px-[20px] py-[7px] rounded-lg text-md cursor-pointer hover:bg-gray-600"
            onClick={() => setSelectedTab(null)}
          >
            Back
          </button>
          <button
            className="bg-blue-600 text-zinc-50 px-[20px] py-[7px] rounded-lg text-md cursor-pointer hover:bg-blue-700"
            onClick={handleZodValidation}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInfoForm;
