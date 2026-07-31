"use client";

import { useState } from "react";
import BootScreen from "@/components/landing/bootscreen";
import { Navigation } from "@/components/landing/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { InfrastructureSection } from "@/components/landing/infrastructure-section";
import { MetricsSection } from "@/components/landing/metrics-section";
import { IntegrationsSection } from "@/components/landing/integrations-section";
import { SecuritySection } from "@/components/landing/security-section";
import { DevelopersSection } from "@/components/landing/developers-section";
import { CtaSection } from "@/components/landing/cta-section";
import { FooterSection } from "@/components/landing/footer-section";

export default function Home() {
  const [bootFinished, setBootFinished] = useState(false);

  return (
    <>
      {!bootFinished && (
        <BootScreen onFinish={() => setBootFinished(true)} />
      )}

      <main
        className={`relative min-h-screen overflow-x-hidden transition-opacity duration-700 ${
          bootFinished ? "opacity-100" : "opacity-0"
        }`}
      >
        <Navigation />
        <HeroSection />
        <InfrastructureSection />
        <FeaturesSection />
        <HowItWorksSection />
        <MetricsSection />
        <IntegrationsSection />
        <SecuritySection />
        <DevelopersSection />
        <CtaSection />
        <FooterSection />
      </main>
    </>
  );
}
