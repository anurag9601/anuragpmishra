import Image from "next/image";
import React from "react";

const Education = () => {
  const education = [
    {
      degree: "Master of Computer Science",
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
            className="flex items-start gap-[20px] pl-[25px] border-l-[2px] border-l-gray-700 mb-[10px]"
            key={index}
          >
            <Image
              src="/images/college-logo.webp"
              alt="college-logo"
              height={100}  
              width={100}
              className="h-[70px] w-[70px] md:h-[100px] md:w-[100px] bg-zinc-50 p-[10px] rounded-full"
              loading="lazy"
            />
            <div>
              <h1 className="text-[16px] md:text-2xl font-[700] text-zinc-50 mb-[5px]">
                {edu.degree}
              </h1>
              <h2 className="text-[13px] md:text-lg text-zinc-300">
                {edu.college}
              </h2>
              <p className="text-sm md:text-lg text-zinc-400">{edu.years}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Education;
