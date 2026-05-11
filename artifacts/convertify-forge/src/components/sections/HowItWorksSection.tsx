import { motion } from "framer-motion";
import { UploadCloud, SlidersHorizontal, Cpu, Download } from "lucide-react";

const steps = [
  { icon: UploadCloud, title: "Upload", desc: "Drag & drop your source file into the secure zone." },
  { icon: SlidersHorizontal, title: "Configure", desc: "Select target format and fine-tune compression." },
  { icon: Cpu, title: "Forge", desc: "Our engine processes the binary at maximum speed." },
  { icon: Download, title: "Download", desc: "Retrieve the optimized output immediately." },
];

export default function HowItWorksSection() {
  return (
    <div className="w-full flex flex-col gap-12 items-center py-10" id="workflow">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 text-white">The Workflow</h2>
        <p className="text-muted-foreground">Four steps from raw input to polished output.</p>
      </div>

      <div className="flex flex-col md:flex-row w-full justify-between relative max-w-5xl">
        {/* Connecting Line */}
        <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[2px] bg-white/10 z-0">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="h-full bg-gradient-to-r from-primary/20 via-primary to-primary/20"
          />
        </div>

        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2 }}
            className="relative z-10 flex flex-col items-center text-center max-w-[200px] mb-8 md:mb-0"
          >
            <div className="w-24 h-24 rounded-2xl glass-panel border border-white/10 mb-6 flex items-center justify-center relative group hover:border-primary/50 transition-colors">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
              <step.icon className="w-10 h-10 text-muted-foreground group-hover:text-primary transition-colors relative z-10" />
              <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-card border border-white/10 flex items-center justify-center text-xs font-mono font-bold text-white shadow-lg">
                0{idx + 1}
              </div>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
