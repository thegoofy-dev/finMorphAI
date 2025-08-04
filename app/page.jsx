import HeroSection from "@/components/Hero";
import { howItWorksData, statsData, testimonialsData } from "@/data/landing";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { FeaturesSection } from "@/components/FeatureSection";

export default function Home() {
  return (
    <div className="pt-40">
      <HeroSection />

      <section className="rounded-full bg-purple-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {statsData.map((data, index) => (
              <div key={index} className="text-center">
                <div className="mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent">
                  {data.value}
                </div>
                <div className="text-gray-600">{data.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeaturesSection />

      <section className="rounded-bl-full bg-purple-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-6 text-center text-3xl font-bold">How It Works</h2>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {howItWorksData.map((work, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                  {" "}
                  {work.icon}
                </div>
                <h3 className="mb-4 text-xl font-semibold">{work.title}</h3>
                <p className="text-gray-600">{work.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
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
      <section className="rounded-tr-full bg-purple-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-8 text-center text-3xl font-bold">
            Ready to Take Control of Your Finances?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl">
            Joins thousands of users who are already managing their finances
            smarter with <strong>FinMorph</strong>
          </p>
          <Link href="/dashboard">
            <Button
              size="lg"
              className="animate-caret-blink -mb-2 border-2 border-purple-600 bg-white text-purple-600 hover:animate-none hover:border-white hover:bg-purple-500 hover:text-white"
            >
              Start Free Trial
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
