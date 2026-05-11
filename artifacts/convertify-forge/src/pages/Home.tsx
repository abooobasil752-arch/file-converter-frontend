import React from "react";
import Navbar from "@/components/sections/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import ConverterSection from "@/components/sections/ConverterSection";
import ToolsSection from "@/components/sections/ToolsSection";
import ActivityPanel from "@/components/sections/ActivityPanel";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="min-h-[100dvh] w-full bg-background text-foreground relative overflow-x-hidden selection:bg-primary selection:text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 z-[-1] bg-grid-pattern opacity-50" />
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-secondary/20 blur-[120px] pointer-events-none" />
      <div className="fixed inset-0 z-[-1] pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" />

      <Navbar />

      <main className="flex flex-col items-center w-full">
        <HeroSection />
        
        <div className="w-full max-w-7xl mx-auto px-6 py-20 flex flex-col gap-32">
          <div id="converter">
            <ConverterSection />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="col-span-1 lg:col-span-2">
              <ToolsSection />
            </div>
            <div className="col-span-1">
              <ActivityPanel />
            </div>
          </div>
          
          <div id="workflow">
            <HowItWorksSection />
          </div>
          
          <div id="features">
            <FeaturesSection />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
