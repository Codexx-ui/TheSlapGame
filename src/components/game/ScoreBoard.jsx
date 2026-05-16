import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Timer, Zap } from "lucide-react";

export default function ScoreBoard({ score, combo, timeLeft, maxTime }) {
  const timePercent = (timeLeft / maxTime) * 100;
  const isLowTime = timeLeft <= 5;

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      {/* Timer bar */}
      <div className="relative h-4 bg-muted rounded-full overflow-hidden shadow-inner">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background: isLowTime
              ? "hsl(0, 80%, 55%)"
              : "linear-gradient(90deg, hsl(350, 80%, 55%), hsl(270, 70%, 60%))",
          }}
          animate={{ width: `${timePercent}%` }}
          transition={{ duration: 0.3 }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-body font-bold text-foreground drop-shadow-sm flex items-center gap-1">
            <Timer className="w-3 h-3" />
            {timeLeft}s
          </span>
        </div>
      </div>

      {/* Score and combo */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-secondary" />
          <span className="font-display text-3xl text-foreground">{score}</span>
        </div>

        <AnimatePresence mode="wait">
          {combo > 1 && (
            <motion.div
              key={combo}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              className="flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-full"
            >
              <Flame className="w-4 h-4 text-primary" />
              <span className="font-display text-lg text-primary">
                x{combo}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}