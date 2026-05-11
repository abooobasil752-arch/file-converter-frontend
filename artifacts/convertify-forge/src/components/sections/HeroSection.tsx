import { motion } from "framer-motion";
import { PrimaryButton, SecondaryButton } from "@/components/ui/custom-buttons";
import { FileText, FileImage, Layers, ShieldCheck, Zap, Flame } from "lucide-react";

export default function HeroSection() {
  const scrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 pt-40 pb-20 lg:pt-48 lg:pb-32 flex flex-col lg:flex-row items-center gap-16 overflow-hidden">
      {/* Left Content */}
      <div className="flex-1 flex flex-col items-start z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 mb-6"
        >
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-xs font-mono text-primary uppercase tracking-wider">v2.0 Engine Live</span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl lg:text-7xl font-bold leading-tight mb-6"
        >
          Forge Any File Into <br className="hidden lg:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">The Format You Need</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-muted-foreground mb-10 max-w-xl"
        >
          Convert Word, PDF, images, and documents through a fast, elegant, and developer-built conversion platform. No ads, no limits, just pure performance.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center gap-4"
        >
          <PrimaryButton onClick={() => scrollTo("#converter")}>
            Initialize Forge
          </PrimaryButton>
          <SecondaryButton onClick={() => scrollTo("#workflow")}>
            View Workflow
          </SecondaryButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-12 flex items-center gap-6 text-sm text-muted-foreground font-mono"
        >
          <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-secondary" /> Local Processing</div>
          <div className="flex items-center gap-2"><Layers className="w-4 h-4 text-secondary" /> 50+ Formats</div>
        </motion.div>
      </div>

      {/* Right Mockup */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex-1 relative w-full aspect-square max-w-[500px] lg:max-w-none z-10 perspective-1000"
      >
        <div className="absolute inset-0 glass-panel rounded-2xl border border-white/10 p-6 flex items-center justify-center overflow-hidden">
          {/* Decorative grid */}
          <div className="absolute inset-0 bg-grid-pattern opacity-30" />
          
          {/* Central Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute w-64 h-64 rounded-full border border-dashed border-primary/30"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute w-48 h-48 rounded-full border border-accent/20"
          />

          {/* Floating Elements */}
          <motion.div
            animate={{ y: [-10, 10, -10], x: [-5, 5, -5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 glass-panel p-3 rounded-lg shadow-lg border-primary/30 flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded bg-blue-500/20 flex items-center justify-center">
              <FileText className="w-4 h-4 text-blue-400" />
            </div>
            <span className="font-mono text-xs font-bold">DOCX</span>
          </motion.div>

          <motion.div
            animate={{ y: [10, -10, 10], x: [5, -5, 5] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-1/4 right-1/4 glass-panel p-3 rounded-lg shadow-lg border-secondary/30 flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded bg-red-500/20 flex items-center justify-center">
              <FileText className="w-4 h-4 text-red-400" />
            </div>
            <span className="font-mono text-xs font-bold">PDF</span>
          </motion.div>

          <motion.div
            animate={{ y: [-15, 15, -15], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-1/3 right-1/4 glass-panel p-3 rounded-lg shadow-lg border-accent/30 flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded bg-purple-500/20 flex items-center justify-center">
              <FileImage className="w-4 h-4 text-purple-400" />
            </div>
            <span className="font-mono text-xs font-bold">PNG</span>
          </motion.div>

          {/* Center core */}
          <div className="relative w-24 h-24 rounded-full bg-background border border-primary/50 flex items-center justify-center shadow-[0_0_50px_rgba(255,122,26,0.3)]">
            <Flame className="w-10 h-10 text-primary" />
          </div>

          {/* Mini terminal log */}
          <div className="absolute bottom-4 left-4 right-4 glass-panel p-3 rounded border border-white/5 font-mono text-[10px] text-muted-foreground h-20 overflow-hidden flex flex-col justify-end">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ repeat: Infinity, duration: 2, repeatDelay: 1 }}
            >
              <span className="text-secondary">{">"}</span> Extracting binary...<br/>
              <span className="text-secondary">{">"}</span> Compiling to PDF...<br/>
              <span className="text-primary">{">"}</span> Success in 0.4s
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
