import React from "react";
import Skills from "./AboutMeComponents/Skills";
import Education from "./AboutMeComponents/Education";

const AboutMe = () => {
  return (
    <div className="h-full w-full text-zinc-50 pt-[70px] flex-1 font-app aboutMe-animation lg:overflow-y-auto lg:px-[10%]">
      <h1 className="text-3xl font-[700] text-zinc-50">About Me</h1>
      <p className="my-[20px] text-zinc-300">
        I'm Anurag Mishra, a Full Stack Developer with a strong foundation in
        both frontend and backend technologies. I specialize in building
        scalable web applications using modern stacks like React.js, Next.js,
        Node.js, and MongoDB, with a focus on clean, responsive, and meaningful
        digital experiences.
        <br />
        <br />
        My journey began with a simple curiosity wondering how websites and
        technologies around me actually work. That curiosity turned into passion
        as I started exploring code and building things on my own. I’ve always
        enjoyed creating whether it's developing interactive interfaces or
        solving problems through technology, and that drive naturally led me
        into the world of full stack development.
        <br />
        <br />
        Outside of coding, I find balance in playing table tennis, a sport that
        sharpens my focus and fuels my competitive drive. It keeps me
        disciplined, engaged, and always ready to take on the next challenge.
        <br />
      </p>
      <Skills />
      <Education />
    </div>
  );
};

export default AboutMe;
