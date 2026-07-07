import Articles from "@/components/Home/Articles";
import CategoriesSection from "@/components/Home/Category";
import Contact from "@/components/Home/Contact";
import HeroSection from "@/components/Home/HeroSection";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <Articles />
      <Contact />
    </>
  );
}
