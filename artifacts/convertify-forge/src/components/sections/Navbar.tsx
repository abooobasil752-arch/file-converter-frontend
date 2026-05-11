import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Menu, X } from "lucide-react";
import { PrimaryButton } from "@/components/ui/custom-buttons";
import { cn } from "@/lib/utils";

const links = [
  { name: "Tools", href: "#tools" },
  { name: "Workflow", href: "#workflow" },
  { name: "Converter", href: "#converter" },
  { name: "Features", href: "#features" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
          scrolled
            ? "bg-background/80 backdrop-blur-md border-primary/20 shadow-[0_4px_30px_rgba(255,122,26,0.1)] py-4"
            : "bg-transparent py-6"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo("body")}>
            <div className="relative w-8 h-8 flex items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
              <Flame className="w-5 h-5 text-black" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">Convertify Forge</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {links.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollTo(link.href)}
                  className="text-sm font-medium text-muted-foreground hover:text-white transition-colors"
                >
                  {link.name}
                </button>
              ))}
            </div>
            <PrimaryButton onClick={() => scrollTo("#converter")} className="py-2 px-6 text-xs">
              Launch Converter
            </PrimaryButton>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        
        {/* Glowing bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {links.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollTo(link.href)}
                className="text-2xl font-bold text-muted-foreground hover:text-white transition-colors"
              >
                {link.name}
              </button>
            ))}
            <PrimaryButton onClick={() => scrollTo("#converter")} className="mt-4">
              Launch Converter
            </PrimaryButton>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
