import Articles from "@/components/Home/Articles";
import CategoriesSection from "@/components/Home/Category";
import HeroSection from "@/components/Home/HeroSection";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <Articles />
    </>
  );
}
