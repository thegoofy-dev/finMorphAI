"use client";

import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { Meteors } from "./ui/meteors";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import { BackgroundGradient } from "./ui/background-gradient";

const HeroSection = () => {
  const imageRef = useRef();

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("hero-image-scrolled");
      } else {
        imageElement.classList.remove("hero-image-scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="px-4 pb-20">
      <Meteors number={10} />
      <div className="container mx-auto text-center">
        <div className="mb-4">
          <TextGenerateEffect
            words="Manage Your Finances"
            className="bg-gradient-to-br from-[#711db5] via-[#7616a9] to-[#2e0a5a] bg-clip-text text-5xl font-bold text-transparent md:text-8xl lg:text-[105px]"
          />

          <TextGenerateEffect
            words="with Intelligence"
            className="bg-gradient-to-br from-[#711db5] via-[#7616a9] to-[#2e0a5a] bg-clip-text text-5xl font-bold text-transparent md:text-8xl lg:text-[105px]"
          />
        </div>

        <p className="text-xl text-slate-400">
          An AI-powered financial management platform that helps you track,
          analyze, and optimize your spending with real-time insights.
        </p>

        <div className="flex justify-center gap-4 pt-6">
          <Link href="/dashboard">
            <Button
              size="lg"
              className="bg-purple-700 px-8 hover:bg-purple-600"
            >
              Get Started
            </Button>
          </Link>

          <Link href="#">
            <Button
              size="lg"
              variant={"outline"}
              className="border-2 border-purple-700 px-8 text-purple-700 hover:text-purple-700"
            >
              Watch Demo
            </Button>
          </Link>
        </div>

        <div className="hero-image-wrapper">
          <div ref={imageRef} className="hero-image">
            <BackgroundGradient className="rounded-[22px] bg-white p-3 dark:bg-zinc-900">
              <Image
                src="/Hero_banner.jpg"
                alt="Dashboard Preview"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "90vw", height: "auto" }}
                className="mx-auto rounded-lg shadow-2xl"
                priority
              />
            </BackgroundGradient>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
