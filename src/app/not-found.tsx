import React from "react";

const NotFound = () => {
  return (
    <div className="h-screen w-screen bg-neutral-950 flex flex-col gap-[20px] items-center justify-center font-app">
      <div className="w-[80%] md:w-[50%] h-[80%] md:h-[50%] flex">
        <iframe
          src="https://lottie.host/embed/8a96e934-309e-4c45-954b-547e601d13a5/07EX70Oupo.lottie"
          className="flex-1"
        ></iframe>
      </div>
      <p className="fixed z-[99] bottom-[80px] md:bottom-[50px] px-[10%] text-[12px] md:text-[15px] text-center bg-gradient-to-r from-teal-400 via-blue-500 to-violet-400 bg-clip-text text-transparent flex flex-col">
        <span>Oops! This page isn&apos;t ready yet.</span>
        <span>
          But don&apos;t worry I&apos;m working hard behind the scenes, and maybe soon
          you&apos;ll get to see something awesome here. Stay tuned and come back
          later! 💫
        </span>
      </p>
    </div>
  );
};

export default NotFound;
