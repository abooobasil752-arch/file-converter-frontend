import { Flame, Github, Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 mt-20 relative overflow-hidden bg-card/50">
      {/* Top glow */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-primary" />
            <span className="font-bold text-lg text-white">Convertify Forge</span>
          </div>
          <p className="text-sm text-muted-foreground">The premium conversion command center.</p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-muted-foreground hover:text-white hover:border-white/30 transition-colors">
              <Github className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-muted-foreground hover:text-white hover:border-white/30 transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-muted-foreground hover:text-white hover:border-white/30 transition-colors">
              <Mail className="w-4 h-4" />
            </a>
          </div>
          <p className="text-xs font-mono text-muted-foreground/60">
            Built by Abdulrahman © 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
