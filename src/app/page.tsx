import AboutMe from "@/components/AboutMe";
import NameSocial from "@/components/NameSocial";

export default function Home() {
  return (
    <div className="h-screen w-screen bg-neutral-950">
      <div className="h-full w-full flex items-start justify-between px-[10%]">
        <NameSocial />
        <AboutMe />
      </div>
    </div>
  );
}
