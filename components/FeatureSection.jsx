"use client";

import { featuresData } from "@/data/landing";
import { HoverEffect } from "./ui/card-hover-effect";

export function FeaturesSection() {
  const hoverFeatures = featuresData.map((feature) => ({
    title: feature.title,
    description: feature.description,
    icon: feature.icon,
  }));

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="mt-2 mb-6 text-center text-3xl font-bold">
          Everything you need to manage your finances
        </h2>
        <HoverEffect items={hoverFeatures} />
      </div>
    </section>
  );
}
