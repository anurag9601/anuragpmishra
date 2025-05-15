"use client";
import { ConnectionContext } from "@/context/ConnectionContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FaFileDownload } from "react-icons/fa";
import { IoLogoLinkedin, IoMail } from "react-icons/io5";

const NameSocial: React.FC = () => {
  const router = useRouter();

  const { setConnectWindowOpen } = useContext(ConnectionContext);

  function handleDownloadResume() {
    const anchor = document.createElement("a");
    anchor.href = "/files/resume.pdf";
    anchor.setAttribute("download", "Anurag Premnath Mishra Resume.pdf");
    anchor.click();
  }

  return (
    <div className="h-full w-full max-w-[500px] flex-1 text-slate-200 pt-[70px] flex flex-col items-start font-app nameSocial-animation pl-[0px] lg:pl-[10%]">
      <Image
        src="/images/my-image.webp"
        alt="my-image"
        height={150}
        width={150}
        className="rounded-full"
      />
      <h1 className="mt-[15px] text-3xl font-[700] text-zinc-50">
        Anurag Premnath Mishra
      </h1>
      <h3 className="mt-[10px] text-xl text-zinc-400">
        Full Stack Web Developer
      </h3>
      <h3 className="my-[10px] text-lg text-zinc-400">
        📍Maharashtra, India <span className="text-xs font-bold">IND</span>
      </h3>
      <p className="text-[14px] text-zinc-300 mb-[15px]">
        Every line of code I write is a step toward solving real problems, not
        just fulfilling requirements
      </p>
      <div className="flex itmes-center justify-between gap-[30px]">
        <button
          className="flex items-center justify-center py-[5px] px-[10px] gap-[10px] text-zinc-50 border-[1px] border-zinc-50 rounded-md cursor-pointer text-md font-[600] hover:bg-zinc-50 hover:text-zinc-900 duration-300"
          onClick={handleDownloadResume}
        >
          <FaFileDownload /> Resume
        </button>
        <div className="flex items-center justify-center gap-[10px]">
          <AiFillGithub
            className="text-xl text-zinc-400 cursor-pointer hover:text-zinc-100"
            onClick={() => router.push("https://github.com/anurag9601")}
          />
          <IoMail
            className="text-xl text-zinc-400 cursor-pointer hover:text-zinc-100"
            onClick={() => router.push("mailto:anuragmishrap13@gmail.com")}
          />
          <IoLogoLinkedin
            className="text-xl text-zinc-400 cursor-pointer hover:text-zinc-100"
            onClick={() =>
              router.push(
                "https://www.linkedin.com/in/anurag-mishra-7a93b6284/"
              )
            }
          />
        </div>
      </div>
      <h2 className="my-[15px] text-2xl font-bold text-zinc-50">
        Want to Work Together?
      </h2>
      <button
        className="text-zinc-100 py-[8px] px-[15px] bg-zinc-700 rounded-lg cursor-pointer hover:scale-[1.05] hover:bg-zinc-600 duration-300"
        onClick={() => setConnectWindowOpen(true)}
      >
        Get in Touch
      </button>
    </div>
  );
};

export default NameSocial;
