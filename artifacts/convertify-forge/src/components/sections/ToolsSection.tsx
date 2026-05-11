import { motion } from "framer-motion";
import { FileText, Image, Scissors, Merge, Minimize, Settings2 } from "lucide-react";
import { useState } from "react";

const tools = [
  { icon: FileText, name: "DOCX Converter", desc: "Bidirectional Word document conversion with formatting preserved." },
  { icon: Scissors, name: "PDF Splitter", desc: "Extract specific pages or split by size/bookmarks." },
  { icon: Image, name: "Image Converter", desc: "Lossless conversion between PNG, JPG, WEBP, and PDF." },
  { icon: Merge, name: "PDF Merger", desc: "Combine multiple documents into a single optimized file." },
  { icon: Minimize, name: "PDF Compressor", desc: "Reduce file size without visible quality loss." },
  { icon: Settings2, name: "Format Detector", desc: "Deep binary analysis to detect true file formats." },
];

export default function ToolsSection() {
  return (
    <div className="w-full flex flex-col gap-8" id="tools">
      <div>
        <h2 className="text-2xl font-bold mb-2 text-white">Tool Arsenal</h2>
        <p className="text-muted-foreground text-sm">Professional-grade utilities for document manipulation.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tools.map((tool, idx) => (
          <ToolCard key={idx} tool={tool} index={idx} />
        ))}
      </div>
    </div>
  );
}

function ToolCard({ tool, index }: { tool: any; index: number }) {
  const Icon = tool.icon;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group h-full"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl blur-xl" />
      
      <div className="relative h-full p-6 glass-panel rounded-xl border border-white/5 hover:border-primary/30 transition-all duration-300 flex flex-col gap-4 overflow-hidden">
        <div className="flex justify-between items-start">
          <div className={`w-12 h-12 rounded-lg bg-background border border-white/10 flex items-center justify-center transition-colors duration-300 ${isHovered ? 'border-primary/50 bg-primary/10' : ''}`}>
            <Icon className={`w-6 h-6 transition-colors duration-300 ${isHovered ? 'text-primary' : 'text-muted-foreground'}`} />
          </div>
          <span className="text-[10px] font-mono uppercase px-2 py-1 rounded bg-secondary/10 text-secondary border border-secondary/20">
            Available
          </span>
        </div>
        
        <div>
          <h3 className="font-bold text-white text-lg mb-1 group-hover:text-primary transition-colors">{tool.name}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{tool.desc}</p>
        </div>
      </div>
    </motion.div>
  );
}
