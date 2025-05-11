import React from "react";

const Skills = () => {
  const languages = ["Javascript", "Typescript", "Python"];
  const frameworks = ["ReactJS", "NextJS", "React Native", "ExpressJS"];
  const backends = ["NodeJS", "REST APIs", "Microservices"];
  const databases = ["PostgreSQL", "MongoDB"];
  const aiSkills = ["AI Integration", "LangChain", "LangGraph", "LangSmith"];
  const practices = ["Microservices", "Git", "Docker"];

  return (
    <div className="flex flex-col gap-[20px]">
      <h1 className="text-3xl font-[700] text-zinc-50">Skills</h1>
      <div className="flex flex-col gap-[20px] mb-[30px]">
        <div>
          <h1 className="text-xl font-[700] text-zinc-300">Languages</h1>
          <div className="mt-[8px] flex flex-wrap items-center gap-[10px]">
            {languages.map((language, index) => {
              return (
                <div
                  className="py-[5px] px-[15px] rounded-[30px] bg-blue-950 text-blue-400 w-fit text-[12px] font-[600]"
                  key={`${language} - ${index}`}
                >
                  {language}
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <h1 className="text-xl font-[700] text-zinc-300">Frameworks</h1>
          <div className="mt-[8px] flex flex-wrap items-center gap-[10px]">
            {frameworks.map((framework, index) => {
              return (
                <div
                  className="py-[5px] px-[15px] rounded-[30px] bg-green-950 text-green-600 w-fit text-[12px] font-[600]"
                  key={`${framework} - ${index}`}
                >
                  {framework}
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <h1 className="text-xl font-[700] text-zinc-300">Backend</h1>
          <div className="mt-[8px] flex flex-wrap items-center gap-[10px]">
            {backends.map((backend, index) => {
              return (
                <div
                  className="py-[5px] px-[15px] rounded-[30px] bg-purple-950 text-purple-400 w-fit text-[12px] font-[600]"
                  key={`${backend} - ${index}`}
                >
                  {backend}
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <h1 className="text-xl font-[700] text-zinc-300">Databases</h1>
          <div className="mt-[8px] flex flex-wrap items-center gap-[10px]">
            {databases.map((database, index) => {
              return (
                <div
                  className="py-[5px] px-[15px] rounded-[30px] bg-red-950 text-red-400 w-fit text-[12px] font-[600]"
                  key={`${database} - ${index}`}
                >
                  {database}
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <h1 className="text-xl font-[700] text-zinc-300">AI / ML</h1>
          <div className="mt-[8px] flex flex-wrap items-center gap-[10px] break-words">
            {aiSkills.map((ai, index) => {
              return (
                <div
                  className="py-[5px] px-[15px] rounded-[30px] bg-teal-950 text-teal-500 w-fit text-[12px] font-[600]"
                  key={`${ai} - ${index}`}
                >
                  {ai}
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <h1 className="text-xl font-[700] text-zinc-300">Practices</h1>
          <div className="mt-[8px] flex flex-wrap items-center gap-[10px]">
            {practices.map((practice, index) => {
              return (
                <div
                  className="py-[5px] px-[15px] rounded-[30px] bg-yellow-950 text-yellow-600 w-fit text-[12px] font-[600]"
                  key={`${practice} - ${index}`}
                >
                  {practice}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
