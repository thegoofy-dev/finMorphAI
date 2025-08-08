import HeroSection from "@/components/Hero";
import { howItWorksData, statsData, testimonialsData } from "@/data/landing";
import Link from "next/link";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { FeaturesSection } from "@/components/FeatureSection";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="pt-40 max-sm:w-full max-sm:px-0">
      <HeroSection />

      <section className="mt-8 rounded-full bg-purple-200 py-20 max-sm:w-full max-sm:px-0">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {statsData.map((data, index) => (
              <div key={index} className="text-center">
                <div className="mb-2 bg-gradient-to-r from-[#711db5] via-[#7616a9] to-[#2e0a5a] bg-clip-text text-4xl font-bold text-transparent max-sm:text-3xl">
                  {data.value}
                </div>
                <div className="text-slate-800">{data.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeaturesSection />

      <section className="rounded-bl-full bg-purple-200 py-12 max-sm:w-full max-sm:px-0">
        <div className="container mx-auto px-4">
          <h2 className="mb-6 text-center text-3xl font-bold text-black">
            How It Works
          </h2>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {howItWorksData.map((work, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                  {" "}
                  {work.icon}
                </div>
                <h3 className="mb-4 text-xl font-semibold text-slate-800">
                  {work.title}
                </h3>
                <p className="text-slate-600">{work.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 max-sm:w-full max-sm:px-0">
        <div className="container mx-auto px-4 max-sm:w-full max-sm:px-0">
          <h2 className="mb-12 text-center text-3xl font-bold">
            What Our Users Says
          </h2>

          {/* Infinite moving card */}
          <div className="dark:bg-grid-white/[0.05] relative flex flex-col items-center justify-center overflow-hidden rounded-md bg-purple-50 antialiased dark:bg-black">
            <InfiniteMovingCards
              items={testimonialsData}
              direction="right"
              speed="slow"
            />
          </div>
        </div>
      </section>

      <section className="rounded-tr-full bg-purple-200 py-12 max-sm:w-full">
        <div className="container mx-auto px-4 text-center max-sm:w-full max-sm:px-0">
          <h2 className="mb-8 text-center text-3xl font-bold dark:text-black">
            Ready to Take Control of Your Finances?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-slate-700">
            Joins thousands of users who are already managing their finances
            smarter with <strong>FinMorph</strong>
          </p>
          <Link href="/dashboard" className="flex items-center justify-center">
            <HoverBorderGradient
              movingColor="#52057b"
              containerClassName="rounded-full"
              as="button"
              className="flex cursor-pointer items-center space-x-2 bg-purple-200 text-purple-500 dark:bg-purple-400 dark:text-black"
            >
              <span className="cursor-pointer">Start Free Trial </span>
              <ArrowRight className="cursor-pointer" />
            </HoverBorderGradient>
          </Link>
        </div>
      </section>
    </div>
  );
}
