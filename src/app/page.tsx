import AboutMe from "@/components/AboutMe";
import NameSocial from "@/components/NameSocial";

export default function Home() {
  return (
    <div className="h-screen w-screen bg-neutral-950 overflow-x-hidden overflow-y-auto flex flex-col lg:flex-row items-start lg:justify-between px-[10%] lg:px-[0px]">
      <NameSocial />
      <AboutMe />
    </div>
  );
}
