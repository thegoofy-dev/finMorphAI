import HeroSection from "@/components/Hero";
import {
  featuresData,
  howItWorksData,
  statsData,
  testimonialsData,
} from "@/data/landing";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="pt-40">
      <HeroSection />

      <section className="py-20 bg-purple-50 rounded-full">
        <div className="container mx-auto px-4">
          <div className=" grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsData.map((data, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {data.value}
                </div>
                <div className="text-gray-600">{data.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything you need to manage your finances
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuresData.map((feature, index) => (
              <Card key={index} className={"p-6"}>
                <CardContent className="space-y-4 pt-4">
                  {feature.icon}
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-purple-50 rounded-bl-full">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6">How It Works</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {howItWorksData.map((work, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {" "}
                  {work.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{work.title}</h3>
                <p className="text-gray-600">{work.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Users Says
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonialsData.map((data, index) => (
              <Card key={index} className={"p-6"}>
                <CardContent className="space-y-4 pt-4">
                  <div className="flex items-center mb-4">
                    <Image
                      src={data.image}
                      alt={data.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  <div className="ml-4">
                    <div className="font-semibold">{data.name}</div>
                    <div className="text-sm text-gray-600">{data.role}</div>
                  </div>
                  </div>
                  <p className="text-shadow-gray-600">{data.quote}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-purple-50 rounded-tr-full">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-center mb-8">
            Ready to Take Control of Your Finances?
          </h2>
          <p className="text-purple-600 mb-8 max-w-2xl mx-auto">
            Joins thousands  of users who are already managing their finances smarter with <strong>FinMorph</strong>
          </p>
          <Link href="/dashboard">
            <Button
              size="lg"
              className="bg-white text-purple-600 border-2 border-purple-600 hover:bg-purple-500 hover:text-white hover:border-white -mb-2 animate-caret-blink hover:animate-none">
                Start Free Trial
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
