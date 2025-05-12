"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { AiOutlineGithub } from "react-icons/ai";
import { FaExternalLinkAlt } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";

const Project = () => {
  const projects = [
    {
      name: "Health Quality App",
      keypoints: [
        "Solves the problem of tracking and managing health indicators effectively.",
        "Empowers users to monitor personal health data for better decision-making.",
        "Useful for maintaining long-term health records and insights.",
      ],
      techStack: [
        "ReactJS",
        "NextJS",
        "NodeJS",
        "PostgreSQL",
        "Supabase",
        "MongoDB",
        "Tailwind CSS",
        "OpenAI API",
      ],
      github: "https://github.com/anurag9601/health-quality",
      preview: "https://health-quality.vercel.app/",
      imageURL: "/images/health-quality.png",
    },
    {
      name: "Instagram Chrome Extension",
      keypoints: [
        "Enhances the Instagram web experience by adding useful custom features.",
        "Solves the limitation of the native Instagram interface by injecting better UX elements.",
        "Useful for power users looking to optimize their Instagram interactions.",
      ],
      techStack: [
        "JavaScript",
        "Chrome APIs",
        "HTML",
        "CSS",
        "ReactJS",
        "CRXJS",
      ],
      github: "https://github.com/anurag9601/instagram-kid-extension",
      imageURL: "/images/instagram-kid-extension.png",
    },
    {
      name: "LeetCode Chrome Extension",
      keypoints: [
        "Solves the problem of confusion or lack of direction when solving LeetCode problems.",
        "Shows contextual AI hints or complete code for the problem on the right side of the page.",
        "Useful for beginners and intermediate coders needing help without leaving the LeetCode site.",
      ],
      techStack: [
        "JavaScript",
        "Chrome Extension APIs",
        "OpenAI API",
        "HTML",
        "CSS",
        "ReactJS",
        "CRXJS",
      ],
      github: "https://github.com/anurag9601/leetcode-extension",
      imageURL: "/images/leetcode-extension.png",
    },
    {
      name: "AI Mailer",
      keypoints: [
        "Solves the need for a scalable and automated email-sending system with AI-generated content.",
        "Uses Kafka queues to efficiently manage email sending and database interactions.",
        "Useful for teams or individuals needing high-volume personalized email automation.",
      ],
      techStack: [
        "Node.js",
        "Kafka",
        "Docker",
        "MongoDB",
        "OpenAI API",
        "HTML",
        "CSS",
      ],
      github: "https://github.com/anurag9601/ai-mailer",
      imageURL: "/images/ai-emailer.png",
    },
  ];

  const router = useRouter();

  return (
    <div className="flex flex-col gap-[20px] mb-[20px]">
      <h1 className="text-3xl font-[700] text-zinc-50">Projects</h1>
      <div className="flex flex-col gap-[30px]">
        {projects.map((project, index) => {
          return (
            <div
              className="flex flex-col xl:flex-row items-start gap-[20px] pl-[25px] border-l-[2px] border-l-gray-700 mb-[10px]"
              key={index}
            >
              <Image
                src={project.imageURL}
                alt="project-image"
                height={100}
                width={250}
                className="rounded-lg object-center object-cover cursor-pointer"
              />
              <div className="flex flex-col gap-[10px]">
                <h1 className="text-xl md:text-2xl font-[700] text-zinc-50 mb-[5px]">
                  {project.name}
                </h1>
                <ul className="flex flex-col gap-[10px]">
                  {project.keypoints.map((point, index) => {
                    return (
                      <li
                        className="flex items-start gap-[5px] text-zinc-300 text-[15px] md:text-[17px]"
                        key={index}
                      >
                        <GoDotFill className="text-3xl text-zinc-500" />
                        {point}
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-[8px] flex flex-wrap items-center gap-[10px]">
                  {project.techStack.map((stack, index) => {
                    return (
                      <div
                        className="py-[5px] px-[15px] rounded-[30px] bg-green-950 text-green-600 w-fit text-[14px] font-[600]"
                        key={index}
                      >
                        {stack}
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center gap-[20px]">
                  <p
                    className="flex items-center gap-[10px] cursor-pointer text-zinc-400 font-[600] hover:text-zinc-300"
                    onClick={() => router.push(project.github)}
                  >
                    <AiOutlineGithub className="text-xl" />
                    View Code
                  </p>
                  {project.preview && (
                    <p
                      className="flex items-center gap-[10px] cursor-pointer text-zinc-400 font-[600] hover:text-zinc-300"
                      onClick={() => router.push(project.preview)}
                    >
                      <FaExternalLinkAlt />
                      Live Demo
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Project;
