"use client";

import { ConnectionContext } from "@/context/ConnectionContext";
import React, {
  ChangeEvent,
  DragEventHandler,
  useContext,
  useRef,
  useState,
} from "react";
import { BsUpload } from "react-icons/bs";
import { FiFileText } from "react-icons/fi";
import { IoCode } from "react-icons/io5";
import { LuFile, LuUpload } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";

const ProjectDetailsUploadForm = () => {
  const {
    setConnectWindowOpen,
    setProjectDetailUploadWindowOpen,
    projectFiles,
    setProjectFiles,
    setConnectUserAllInfo,
    connectUserAllInfo,
  } = useContext(ConnectionContext);

  const [isDragIn, setIsDragIn] = useState<boolean>(false);

  const dragenter = useRef<number>(0);

  const handleFileUplaod = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      setProjectFiles((prev) => {
        return [...files, ...prev];
      });
    }
  };

  const handleDeleteUploadedFile = (index: number) => {
    setProjectFiles((prev) =>
      prev.filter((_, fileIndex) => fileIndex !== index)
    );
  };

  const handleTextareaOnChange = (
    e: ChangeEvent<HTMLTextAreaElement>,
    inputParamName: "techinalRequirements" | "projectDetails"
  ) => {
    const value = e.target.value;
    setConnectUserAllInfo((prev) => {
      const updatedConnectUserAllInfo = { ...prev };
      updatedConnectUserAllInfo[inputParamName] = value;
      return updatedConnectUserAllInfo;
    });
  };

  function handleDragIn(e: React.DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    e.stopPropagation();
    dragenter.current += 1;
    setIsDragIn(true);
  }

  function handleDragOut(e: React.DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    e.stopPropagation();
    dragenter.current -= 1;
    if (dragenter.current == 0) {
      setIsDragIn(false);
    }
  }

  function handleFileOnDrop(e: React.DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragIn(false);
    if (e.dataTransfer) {
      const files = e.dataTransfer.files;
      setProjectFiles((prev) => {
        return [...files, ...prev];
      });
    }
  }

  return (
    <div className="flex-1 flex flex-col px-[30px] py-[30px] gap-[20px] bg-zinc-900 rounded-lg">
      <div className=" w-full flex items-center justify-between">
        <h1 className="text-[20px] md:text-[25px] font-[700] text-zinc-50">
          Project Requirements
        </h1>
        <RxCross2
          className="text-2xl text-zinc-50 cursor-pointer min-h-[30px] min-w-[30px] rounded-full flex items-center justify-center hover:bg-zinc-500 p-[5px] duration-300"
          onClick={() => setConnectWindowOpen(false)}
        />
      </div>
      <div className="flex flex-col gap-[20px]">
        <div className="flex flex-col gap-[8px]">
          <p className="text-zinc-200 flex items-center gap-[10px] font-[600]">
            <IoCode className="text-xl" /> Techinal Requirements
          </p>
          <textarea
            className="min-h-[120px] w-full bg-zinc-800 rounded-lg px-[15px] py-[10px] text-[16px] text-zinc-50 outline-none border-[1.5px] border-zinc-500 focus:border-blue-500"
            placeholder="Any specific technologies, frameworks, or requirement"
            value={connectUserAllInfo.techinalRequirements}
            onChange={(e) => handleTextareaOnChange(e, "techinalRequirements")}
          />
        </div>
        <div className="flex flex-col gap-[8px]">
          <p className="text-zinc-200 flex items-center gap-[10px] font-[600]">
            <FiFileText className="text-lg" /> Project Details
          </p>
          <textarea
            className="min-h-[120px] w-full bg-zinc-800 rounded-lg px-[15px] py-[10px] text-[16px] text-zinc-50 outline-none border-[1.5px] border-zinc-500 focus:border-blue-500"
            placeholder="Describe your project goals, features, and any other relevant information"
            value={connectUserAllInfo.projectDetails}
            onChange={(e) => handleTextareaOnChange(e, "projectDetails")}
          />
        </div>
        <div className="flex flex-col gap-[8px]">
          <p className="text-zinc-200 flex items-center gap-[10px] font-[600]">
            <BsUpload className="text-md" /> Attachments
          </p>
          <label
            className={`h-[120px] w-full border-[2px] border-dashed ${
              !isDragIn ? "border-zinc-700" : "border-blue-400"
            } rounded-lg cursor-pointer flex flex-col items-center justify-center gap-[5px] hover:border-blue-400`}
            onDragOver={(e) => {
              e.preventDefault();
            }}
            onDrop={(e) => handleFileOnDrop(e)}
            onDragEnter={handleDragIn}
            onDragLeave={handleDragOut}
          >
            <LuUpload className="text-2xl text-zinc-400" />
            <p className="text-[15px] text-zinc-400">
              Click to upload file or drag and drop
            </p>
            <p className="text-[11px] text-zinc-500">Maximum file size: 10MB</p>
            <input
              type="file"
              multiple
              className="absolute invisible"
              onChange={handleFileUplaod}
            />
          </label>
        </div>
        {projectFiles.length > 0 && (
          <div className="flex flex-col gap-[10px]">
            {projectFiles.map((file, index) => {
              return (
                <div
                  className="flex items-center justify-between bg-zinc-800 p-[10px] rounded-lg"
                  key={index}
                >
                  <p className="flex items-center gap-[10px] text-zinc-300">
                    <LuFile className="text-zinc-400 text-lg" /> {file.name}
                  </p>
                  <RiDeleteBinLine
                    className="text-zinc-400 cursor-pointer h-[25px] w-[25px] p-[4px] hover:bg-zinc-700 rounded-full"
                    onClick={() => handleDeleteUploadedFile(index)}
                  />
                </div>
              );
            })}
          </div>
        )}
        <div className="flex items-center justify-between mt-[10px]">
          <button
            className="bg-gray-700 text-zinc-50 px-[20px] py-[7px] rounded-lg text-md cursor-pointer hover:bg-gray-600"
            onClick={() => setProjectDetailUploadWindowOpen(false)}
          >
            Back
          </button>
          <button className="bg-blue-600 text-zinc-50 px-[20px] py-[7px] rounded-lg text-md cursor-pointer hover:bg-blue-700">
            Send Enquiry
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsUploadForm;
