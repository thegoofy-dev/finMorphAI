"use client";

import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { Button } from "./ui/button";
import Image from "next/image";

const HeroSection = () => {
  const imageRef = useRef();

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("hero-image-scrolled");
      }
      else {
        imageElement.classList.remove("hero-image-scrolled");
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="pb-20 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl md:text-8xl lg:text-[105px] pb-6 bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">
          Manage Your Finances <br /> with Intelligence
        </h1>

        <p>
          An AI-powered financial management platform that helps you track,
          analyze, and optimize your spending with real-time insights.
        </p>

        <div className="pt-6 flex gap-4 justify-center">
          <Link href="/dashboard">
            <Button size="lg" className="px-8  bg-purple-700 hover:bg-purple-600">
              Get Started
            </Button>
          </Link>

          <Link href="#">
            <Button size="lg" variant={"outline"} className="px-8 text-purple-700 hover:text-purple-700 border-2 border-purple-700">
              Watch Demo
            </Button>
          </Link>
        </div>

        <div className="hero-image-wrapper">
          <div ref={imageRef} className="hero-image">
            <Image
              src="/Hero_banner.jpg"
              width={1280}
              height={720}
              alt="Dashboard Preview"
              className="rounded-lg shadow-2xl border mx-auto"
              priority
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default HeroSection;
