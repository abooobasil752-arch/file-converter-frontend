import { motion } from "framer-motion";
import { Zap, Shield, FileCheck, Eraser, Code2, Cpu } from "lucide-react";

const features = [
  { icon: Zap, title: "Blistering Speed", desc: "Optimized WASM engines deliver conversions in milliseconds, not minutes." },
  { icon: Shield, title: "Secure Processing", desc: "Files are processed locally or wiped immediately from memory post-conversion." },
  { icon: FileCheck, title: "Format Fidelity", desc: "Perfect preservation of fonts, tables, layouts, and image quality." },
  { icon: Eraser, title: "Clean Flow", desc: "No ads, no watermarks, no forced sign-ups. Just pure utility." },
  { icon: Cpu, title: "Python Backend Ready", desc: "Architecture designed to integrate seamlessly with Python processing microservices." },
  { icon: Code2, title: "Developer API", desc: "Integrate the Forge engine directly into your own applications." },
];

export default function FeaturesSection() {
  return (
    <div className="w-full flex flex-col gap-12" id="features">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 text-white">Why Forge?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">Built for professionals who demand reliability and performance without the bloat.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="p-8 glass-panel rounded-2xl border border-white/5 hover:border-white/20 transition-all duration-300"
          >
            <feat.icon className="w-8 h-8 text-primary mb-6" />
            <h3 className="text-xl font-bold text-white mb-3">{feat.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{feat.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
