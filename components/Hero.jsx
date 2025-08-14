"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Meteors } from "./ui/meteors";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import { BackgroundGradient } from "./ui/background-gradient";
import { VideoModal } from "./ui/video-modal";
import { ArrowUpRightIcon } from "lucide-react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { LayoutDashboard } from "lucide-react";
import { PlayCircle } from "lucide-react";
import { Sparkles } from "lucide-react";

const HeroSection = () => {
  const imageRef = useRef();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

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
    <div className="overflow-x-hidden px-2 pb-20 sm:px-4">
      <Meteors number={10} />
      <div className="mx-auto w-full max-w-6xl text-center">
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
          <SignedIn>
            <Link href="/dashboard" className="cursor-pointer">
              <button className="relative inline-flex h-12 cursor-pointer items-center justify-center overflow-hidden rounded-full p-1 focus:ring-1 focus:ring-purple-400 focus:ring-offset-1 focus:ring-offset-purple-600 focus:outline-none">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] cursor-pointer bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#7616a9_50%,#E2CBFF_100%)]" />
                <LayoutDashboard
                  size={"40"}
                  className="z-1 mr-2 cursor-pointer pl-2 text-black"
                />
                <span className="text-md inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-black px-4 py-1 font-medium text-purple-600 backdrop-blur-3xl">
                  Dashboard
                </span>
              </button>
            </Link>

            <Link className="cursor-pointer" href={"/transaction/create"}>
              <button className="group cursor-pointer rounded-xl border bg-black px-4 py-2.5 text-purple-600 transition duration-200 hover:scale-105 dark:border-purple-600">
                <div className="flex items-center justify-center gap-2">
                  <Sparkles className="inline rotate-45 cursor-pointer transition-transform duration-300 group-hover:scale-110 group-hover:rotate-0" />
                  <span className="relative cursor-pointer leading-none whitespace-nowrap group-hover:text-purple-600">
                    Create Transaction
                  </span>
                </div>
              </button>
            </Link>
          </SignedIn>

          <SignedOut>
            <Link href="/dashboard">
              <button className="group relative inline-flex h-12 cursor-pointer items-center justify-center overflow-hidden rounded-full p-1 focus:ring-1 focus:ring-purple-400 focus:ring-offset-1 focus:ring-offset-purple-600 focus:outline-none">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] cursor-pointer bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#7616a9_50%,#E2CBFF_100%)]" />

                <span className="text-md inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-black px-4 py-1 font-medium text-nowrap text-purple-600 backdrop-blur-3xl">
                  Get Started
                </span>

                <ArrowUpRightIcon
                  size={"45"}
                  className="z-1 -translate-x-2 transform cursor-pointer pt-0.5 text-black opacity-0 transition-transform duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                />
              </button>
            </Link>

            <button
              onClick={() => setIsVideoModalOpen(true)}
              className="cursor-pointer rounded-xl border bg-black px-4 py-2.5 text-purple-600 transition duration-200 hover:scale-105 dark:border-purple-600"
            >
              <div className="item-center flex cursor-pointer justify-center gap-2 text-nowrap">
                <PlayCircle className="inline-block cursor-pointer" />
                <span className="cursor-pointer">Watch Promo</span>
              </div>
            </button>
          </SignedOut>
        </div>

        <div className="hero-image-wrapper mt-8 flex justify-center">
          <div ref={imageRef} className="hero-image w-full">
            <BackgroundGradient className="rounded-[22px] bg-white p-1 sm:p-3 dark:bg-zinc-900">
              <Image
                src="/Hero_banner.jpg"
                alt="Dashboard Preview"
                width={1200}
                height={0}
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="mx-auto w-full max-w-[1200px] rounded-lg shadow-2xl"
                priority
              />
            </BackgroundGradient>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoSrc="/Promo_video.mp4"
        title="FinMorph Promo Video"
      />
    </div>
  );
};

export default HeroSection;
