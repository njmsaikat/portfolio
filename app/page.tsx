import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Expertise } from "@/components/sections/Expertise";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Resume } from "@/components/sections/Resume";
import { Portfolio } from "@/components/sections/Portfolio";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
import { LatestPosts } from "@/components/sections/LatestPosts";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Expertise />
      <About />
      <Skills />
      <Resume />
      <Portfolio />
      <Services />
      <Testimonials />
      <LatestPosts />
      <Contact />
    </>
  );
}
