"use client";
import { ConnectionContext } from "@/context/ConnectionContext";
import React, { ChangeEvent, useContext, useState } from "react";
import { FaQuestion } from "react-icons/fa";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { FiUsers } from "react-icons/fi";
import { GoAlert } from "react-icons/go";
import { IoCode } from "react-icons/io5";
import { MdOutlineAccessTime } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { SlCalender } from "react-icons/sl";
import { z } from "zod";
import ProjectDetailsUploadForm from "./ProjectDetailsUploadForm";
import { AppContext } from "@/context/appContext";

const DetailsForm = () => {
  const {
    selectedTab,
    setConnectWindowOpen,
    setConnectionDetailsWindowOpen,
    setConnectUserAllInfo,
    connectUserAllInfo,
    projectDetailUploadWindowOpen,
    setProjectDetailUploadWindowOpen,
  } = useContext(ConnectionContext);

  const { setNotification } = useContext(AppContext);

  const [loading, setLoading] = useState<boolean>(false);

  const handleSelectionInputChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>,
    inputState:
      | "questionCategory"
      | "urgencyLevel"
      | "projectType"
      | "budgetRange"
      | "timelinePerference"
      | "preferredResponseTime"
      | "yourQuestion"
      | "teamSize"
  ) => {
    const value = e.target.value;

    setConnectUserAllInfo((prev) => {
      const updatedConnectUserAllInfo = { ...prev };
      updatedConnectUserAllInfo[inputState] = value;
      return updatedConnectUserAllInfo;
    });
  };

  async function handleSendQuestion() {
    if (loading) return;

    const zodValidCheckOnSendQuestionData = z.object({
      questionCategory: z.string(),
      urgencyLevel: z.string(),
      preferredResponseTime: z.string().min(1),
      yourQuestion: z.string().min(3),
    });

    const data = {
      questionCategory: connectUserAllInfo.questionCategory,
      urgencyLevel: connectUserAllInfo.urgencyLevel,
      preferredResponseTime: connectUserAllInfo.preferredResponseTime,
      yourQuestion: connectUserAllInfo.yourQuestion,
    };

    const result = zodValidCheckOnSendQuestionData.safeParse(data);

    if (result.success === true) {
      setLoading(true);
      const sendData = {
        userName: connectUserAllInfo.userName,
        email: connectUserAllInfo.email,
        questionCategory: connectUserAllInfo.questionCategory,
        urgencyLevel: connectUserAllInfo.urgencyLevel,
        preferredResponseTime: connectUserAllInfo.preferredResponseTime,
        yourQuestion: connectUserAllInfo.yourQuestion,
      };

      const request = await fetch("/api/mail/question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sendData),
      });

      const response = await request.json();

      if (response.success === true) {
        setNotification(`🎉 Your message has been sent!
        Thank you for reaching out 💌
        I've received your question and will get back to you as soon as possible.
        In the meantime, grab a coffee ☕ and relax I've got this! 😊`);
      } else if (response.error) {
        setNotification(response.error);
      }
      setConnectWindowOpen(false);
      setLoading(false);
    }
  }

  function handleProjectInfoNextBtn() {
    const zodValidationCheckOfSendingData = z.object({
      projectType: z.string(),
      budgetRange: z.string(),
      timelinePerference: z.string(),
      teamSize: z.string().min(1),
    });

    const data = {
      projectType: connectUserAllInfo.projectType,
      budgetRange: connectUserAllInfo.budgetRange,
      timelinePerference: connectUserAllInfo.timelinePerference,
      teamSize: connectUserAllInfo.teamSize,
    };

    const result = zodValidationCheckOfSendingData.safeParse(data);

    if (result.success === true) {
      setProjectDetailUploadWindowOpen(true);
    }
  }

  return (
    <>
      {projectDetailUploadWindowOpen === true ? (
        <ProjectDetailsUploadForm />
      ) : (
        <div className="flex-1 flex flex-col px-[30px] py-[30px] gap-[20px] bg-zinc-900 rounded-lg">
          <div className=" w-full flex items-center justify-between">
            {selectedTab === "inquiry" ? (
              <h1 className="text-[20px] md:text-[25px] font-[700] text-zinc-50">
                Question Details
              </h1>
            ) : (
              <h1 className="text-[20px] md:text-[25px] font-[700] text-zinc-50">
                Project Details
              </h1>
            )}
            <RxCross2
              className="text-2xl text-zinc-50 cursor-pointer min-h-[30px] min-w-[30px] rounded-full flex items-center justify-center hover:bg-zinc-500 p-[5px] duration-300"
              onClick={() => setConnectWindowOpen(false)}
            />
          </div>
          <div className="flex flex-col gap-[20px]">
            {selectedTab === "inquiry" ? (
              <>
                <div className="flex flex-col gap-[8px]">
                  <p className="text-zinc-200 flex items-center gap-[10px] font-[600]">
                    <IoCode className="text-xl" /> Question Category
                  </p>
                  <select
                    className="h-[50px] w-full bg-zinc-800 rounded-lg px-[15px] text-[16px] text-zinc-50 outline-none border-[1.5px] border-zinc-500 focus:border-blue-500 cursor-pointer"
                    value={connectUserAllInfo.questionCategory}
                    onChange={(e) =>
                      handleSelectionInputChange(e, "questionCategory")
                    }
                  >
                    <option value="Technical">Technical</option>
                    <option value="General">General</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="flex flex-col gap-[8px]">
                  <p className="text-zinc-200 flex items-center gap-[10px] font-[600]">
                    <GoAlert className="text-xl" /> Urgency Level
                  </p>
                  <select
                    className="h-[50px] w-full bg-zinc-800 rounded-lg px-[15px] text-[16px] text-zinc-50 outline-none border-[1.5px] border-zinc-500 focus:border-blue-500 cursor-pointer"
                    value={connectUserAllInfo.urgencyLevel}
                    onChange={(e) =>
                      handleSelectionInputChange(e, "urgencyLevel")
                    }
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div className="flex flex-col gap-[8px]">
                  <p className="text-zinc-200 flex items-center gap-[10px] font-[600]">
                    <MdOutlineAccessTime className="text-xl" /> Preferred
                    Response Time
                  </p>
                  <input
                    type="text"
                    className="h-[50px] w-full bg-zinc-800 rounded-lg px-[15px] text-[16px] text-zinc-50 outline-none border-[1.5px] border-zinc-500 focus:border-blue-500"
                    placeholder="eg., Within 24 hours, Next week, etc."
                    value={connectUserAllInfo.preferredResponseTime}
                    onChange={(e) =>
                      handleSelectionInputChange(e, "preferredResponseTime")
                    }
                  />
                </div>
                <div className="flex flex-col gap-[8px]">
                  <p className="text-zinc-200 flex items-center gap-[10px] font-[600]">
                    <FaQuestion className="text-lg" /> Your Question
                  </p>
                  <textarea
                    className="min-h-[80px] w-full bg-zinc-800 rounded-lg px-[15px] py-[10px] text-[16px] text-zinc-50 outline-none border-[1.5px] border-zinc-500 focus:border-blue-500"
                    value={connectUserAllInfo.yourQuestion}
                    onChange={(e) =>
                      handleSelectionInputChange(e, "yourQuestion")
                    }
                  />
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col gap-[8px]">
                  <p className="text-zinc-200 flex items-center gap-[10px] font-[600]">
                    <IoCode className="text-xl" /> Project Type
                  </p>
                  <select
                    className="h-[50px] w-full bg-zinc-800 rounded-lg px-[15px] text-[16px] text-zinc-50 outline-none border-[1.5px] border-zinc-500 focus:border-blue-500 cursor-pointer"
                    value={connectUserAllInfo.projectType}
                    onChange={(e) =>
                      handleSelectionInputChange(e, "projectType")
                    }
                  >
                    <option value="Web Application">Web Application</option>
                    <option value="Chrome Extension">Chrome Extension</option>
                    <option value="API Development">API Development</option>
                    <option value="Mobile Development">
                      Mobile Development
                    </option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="flex flex-col gap-[8px]">
                  <p className="text-zinc-200 flex items-center gap-[10px] font-[600]">
                    <FaIndianRupeeSign className="text-lg" /> Budget Range
                  </p>
                  <select
                    className="h-[50px] w-full bg-zinc-800 rounded-lg px-[15px] text-[16px] text-zinc-50 outline-none border-[1.5px] border-zinc-500 focus:border-blue-500 cursor-pointer"
                    value={connectUserAllInfo.budgetRange}
                    onChange={(e) =>
                      handleSelectionInputChange(e, "budgetRange")
                    }
                  >
                    <option value="₹2L - ₹5L">₹2L - ₹5L</option>
                    <option value="₹5L - ₹10L">₹5L - ₹10L</option>
                    <option value="₹10L - ₹20L">₹10L - ₹20L</option>
                    <option value="₹20L +">₹20L +</option>
                  </select>
                </div>
                <div className="flex flex-col gap-[8px]">
                  <p className="text-zinc-200 flex items-center gap-[10px] font-[600]">
                    <SlCalender className="text-lg" /> Timeline Preference
                  </p>
                  <select
                    className="h-[50px] w-full bg-zinc-800 rounded-lg px-[15px] text-[16px] text-zinc-50 outline-none border-[1.5px] border-zinc-500 focus:border-blue-500 cursor-pointer"
                    value={connectUserAllInfo.timelinePerference}
                    onChange={(e) =>
                      handleSelectionInputChange(e, "timelinePerference")
                    }
                  >
                    <option value="1-3 Months">1-3 Months</option>
                    <option value="3-6 Months">3-6 Months</option>
                    <option value="6+ Months">6+ Months</option>
                  </select>
                </div>
                <div className="flex flex-col gap-[8px]">
                  <p className="text-zinc-200 flex items-center gap-[10px] font-[600]">
                    <FiUsers className="text-xl" /> Team Size
                  </p>
                  <input
                    type="text"
                    className="h-[50px] w-full bg-zinc-800 rounded-lg px-[15px] text-[16px] text-zinc-50 outline-none border-[1.5px] border-zinc-500 focus:border-blue-500"
                    placeholder="eg., Solo, 2-5 people, 5-10 people, etc."
                    value={connectUserAllInfo.teamSize}
                    onChange={(e) => handleSelectionInputChange(e, "teamSize")}
                  />
                </div>
              </>
            )}
            <div className="flex items-center justify-between mt-[10px]">
              <button
                className="bg-gray-700 text-zinc-50 px-[20px] py-[7px] rounded-lg text-md cursor-pointer hover:bg-gray-600"
                onClick={() => setConnectionDetailsWindowOpen(false)}
              >
                Back
              </button>
              {selectedTab === "inquiry" ? (
                <button
                  className={`h-[37px] w-[150px] bg-blue-600 text-zinc-50 px-[20px] py-[7px] rounded-lg text-md ${
                    loading == false && "cursor-pointer"
                  } hover:bg-blue-700 flex items-center justify-center`}
                  onClick={handleSendQuestion}
                >
                  {loading === false ? (
                    "Send Question"
                  ) : (
                    <div className="border-[3px] h-[25px] w-[25px] rounded-full border-t-blue-600 loading-spin"></div>
                  )}
                </button>
              ) : (
                <button
                  className="bg-blue-600 text-zinc-50 px-[20px] py-[7px] rounded-lg text-md cursor-pointer hover:bg-blue-700"
                  onClick={handleProjectInfoNextBtn}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailsForm;
