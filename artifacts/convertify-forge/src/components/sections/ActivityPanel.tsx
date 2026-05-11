import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

const logs = [
  { text: "Initializing Forge engine...", color: "text-muted-foreground" },
  { text: "Loading conversion modules...", color: "text-muted-foreground" },
  { text: "Waiting for user input.", color: "text-secondary" },
  { text: "User connected via WebSocket.", color: "text-muted-foreground" },
  { text: "Detected file signature: application/pdf", color: "text-blue-400" },
  { text: "Extracting binary streams...", color: "text-accent" },
  { text: "Rebuilding as DOCX format...", color: "text-primary" },
  { text: "Optimizing output size (-42%)...", color: "text-blue-400" },
  { text: "Conversion complete. Ready for download.", color: "text-secondary" },
];

export default function ActivityPanel() {
  const [visibleLogs, setVisibleLogs] = useState<number[]>([]);

  useEffect(() => {
    // Simulate activity loop
    let currentIndex = 0;
    const interval = setInterval(() => {
      setVisibleLogs((prev) => {
        const next = [...prev, currentIndex].slice(-6); // Keep last 6
        return next;
      });
      currentIndex = (currentIndex + 1) % logs.length;
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex flex-col gap-4 h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Terminal className="w-5 h-5 text-primary" />
          System Log
        </h2>
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          <span className="text-muted-foreground">Online</span>
        </div>
      </div>

      <div className="flex-1 glass-panel rounded-xl border border-white/10 p-4 font-mono text-xs flex flex-col justify-end overflow-hidden min-h-[300px] shadow-inner relative">
        <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-card to-transparent z-10" />
        
        <div className="flex flex-col gap-2 relative z-0">
          {visibleLogs.map((logIndex, i) => (
            <motion.div
              key={`${logIndex}-${i}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex gap-2"
            >
              <span className="text-muted-foreground/50 shrink-0">
                {new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit' })}
              </span>
              <span className="text-white/30 shrink-0">{">"}</span>
              <span className={logs[logIndex].color}>{logs[logIndex].text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
