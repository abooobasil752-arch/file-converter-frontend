import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const PrimaryButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ y: -2 }}
        whileTap={{ y: 0 }}
        className={cn(
          "relative inline-flex items-center justify-center px-8 py-3 text-sm font-bold text-white transition-all duration-200 bg-gradient-to-r from-primary to-accent rounded-md shadow-[0_0_20px_rgba(255,122,26,0.3)] hover:shadow-[0_0_30px_rgba(255,122,26,0.5)] overflow-hidden",
          className
        )}
        {...props}
      >
        <span className="relative z-10">{children}</span>
        <div className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity" />
      </motion.button>
    );
  }
);
PrimaryButton.displayName = "PrimaryButton";

export const SecondaryButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ y: -2 }}
        whileTap={{ y: 0 }}
        className={cn(
          "relative inline-flex items-center justify-center px-8 py-3 text-sm font-bold text-primary transition-all duration-200 bg-transparent border border-primary/50 rounded-md hover:border-primary hover:bg-primary/10 shadow-[0_0_0_rgba(255,122,26,0)] hover:shadow-[0_0_20px_rgba(255,122,26,0.2)]",
          className
        )}
        {...props}
      >
        <span>{children}</span>
      </motion.button>
    );
  }
);
SecondaryButton.displayName = "SecondaryButton";
