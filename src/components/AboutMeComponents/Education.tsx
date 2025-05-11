import Image from "next/image";
import React from "react";

const Education = () => {
  const education = [
    {
      degree: "Masters of Computer Science",
      college: "Ramniranjan Jhunjhunwala College",
      years: "June 2023 - July 2025",
    },
    {
      degree: "Bachelor of Physics",
      college: "Ramniranjan Jhunjhunwala College",
      years: "June 2020 - March 2023",
    },
  ];
  return (
    <div className="flex flex-col gap-[20px] mb-[20px]">
      <h1 className="text-3xl font-[700] text-zinc-50">Education</h1>
      {education.map((edu, index) => {
        return (
          <div
            className="flex items-center gap-[20px] pl-[30px] border-l-[2px] border-l-gray-700 mb-[10px]"
            key={index}
          >
            <Image
              src="/images/college-logo.png"
              alt="college-logo"
              height={100}
              width={100}
              className="bg-zinc-50 p-[10px] rounded-full"
            />
            <div>
              <h1 className="text-2xl font-[700] text-zinc-50 mb-[5px]">
                {edu.degree}
              </h1>
              <h2 className="text-lg text-zinc-300">{edu.college}</h2>
              <p className="text-lg text-zinc-400">{edu.years}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Education;
