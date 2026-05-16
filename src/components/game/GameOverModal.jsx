import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Trophy, RotateCcw, Zap, Flame, Share2 } from "lucide-react";
import Leaderboard from "./Leaderboard";

function getRank(score) {
  if (score >= 100) return { label: "SLAP GOD 🏆", color: "text-secondary" };
  if (score >= 70) return { label: "SLAP MASTER 🔥", color: "text-primary" };
  if (score >= 40) return { label: "SLAP WARRIOR ⚔️", color: "text-accent" };
  if (score >= 20) return { label: "SLAP ROOKIE 👋", color: "text-muted-foreground" };
  return { label: "SLAP NEWBIE 😅", color: "text-muted-foreground" };
}

const FUNNY_COMMENTS = [
  "Αυτό σου άξιζε. 😤",
  "Και λίγες έφαγες! 👊",
  "Έτσι παθαίνουν όσοι ψηφίζουν λάθος! 🗳️",
  "Ούτε στον εχθρό σου τέτοια μάσκα. 😷",
  "Αν ήταν πραγματικός, θα σε είχε μηνύσει. ⚖️",
  "Η δικαιοσύνη είναι αργή, αλλά εσύ γρήγορος. ⚡",
  "15 δευτερόλεπτα αλήθειας. 🔥",
  "Μπράβο. Ο κόσμος είναι καλύτερος τώρα. 🌍",
  "Τον άφησες με μνήμες. 😈",
  "Και πάλι δεν του φτάνουν! 💢",
  "Αυτός το ήξερε ότι θα ερχόταν. 😶",
  "Τέτοιοι χρειάζονται κι άλλο. 😒",
  "Μην τον λυπάσαι. Δεν σε λυπόταν κι αυτός. 🫵",
  "Αυτό ήταν για όλους μας. 🙏",
  "Ο λαός απαίτησε. Εσύ εκτέλεσες. 🫡",
];

function getFunnyComment() {
  return FUNNY_COMMENTS[Math.floor(Math.random() * FUNNY_COMMENTS.length)];
}

function ShareButton({ score, maxCombo }) {
  const [copied, setCopied] = React.useState(false);

  const shareText = `🎮 Φάπα - Ξάπλα | Πύργος Edition\n👊 Score: ${score} | 🔥 Best Combo: x${maxCombo}\nΑυτό σου άξιζε! Μπορείς να τα βγάλεις καλύτερα;`;

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ text: shareText });
    } else {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Button
      onClick={handleShare}
      size="lg"
      variant="outline"
      className="w-full font-display text-base h-12 rounded-xl border-accent text-accent hover:bg-accent hover:text-accent-foreground gap-2"
    >
      <Share2 className="w-4 h-4" />
      {copied ? "✅ Αντιγράφηκε!" : "SHARE MY SCORE"}
    </Button>
  );
}

export default function GameOverModal({ score, maxCombo, totalSlaps, onRestart, onHome, currentUserEmail }) {
  const rank = getRank(score);
  const funnyComment = React.useState(() => getFunnyComment())[0];
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-foreground/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.5, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 15, stiffness: 200 }}
        className="bg-card rounded-3xl shadow-2xl p-6 max-w-sm w-full text-center space-y-5 my-4"
      >
        <motion.div
          initial={{ rotate: -10 }}
          animate={{ rotate: [0, -5, 5, 0] }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Trophy className="w-14 h-14 mx-auto text-secondary" />
        </motion.div>

        <div>
          <h2 className="font-display text-2xl text-foreground">TIME'S UP!</h2>
          <p className={`font-display text-xl mt-1 ${rank.color}`}>{rank.label}</p>
          <p className="font-body text-sm text-muted-foreground mt-2 italic">"{funnyComment}"</p>
        </div>

        <div className="bg-muted rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-muted-foreground font-body text-sm">
              <Zap className="w-4 h-4" /> Score
            </span>
            <span className="font-display text-2xl text-foreground">{score}</span>
          </div>
          <div className="h-px bg-border" />
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-muted-foreground font-body text-sm">
              <Flame className="w-4 h-4" /> Best Combo
            </span>
            <span className="font-display text-xl text-primary">x{maxCombo}</span>
          </div>
          <div className="h-px bg-border" />
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-muted-foreground font-body text-sm">
              👋 Total Slaps
            </span>
            <span className="font-display text-xl text-foreground">{totalSlaps}</span>
          </div>
        </div>

        <Button
          onClick={() => setShowLeaderboard(true)}
          size="lg"
          variant="outline"
          className="w-full font-display text-base h-12 rounded-xl gap-2"
        >
          <Trophy className="w-4 h-4 text-secondary" />
          GLOBAL HIGH SCORES
        </Button>

        <ShareButton score={score} maxCombo={maxCombo} />

        <AnimatePresence>
          {showLeaderboard && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/70 backdrop-blur-sm flex items-center justify-center z-[60] p-4"
              onClick={() => setShowLeaderboard(false)}
            >
              <motion.div
                initial={{ scale: 0.85, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.85, y: 30 }}
                transition={{ type: "spring", damping: 18, stiffness: 220 }}
                className="w-full max-w-sm"
                onClick={(e) => e.stopPropagation()}
              >
                <Leaderboard currentUserEmail={currentUserEmail} />
                <Button
                  onClick={() => setShowLeaderboard(false)}
                  className="w-full mt-3 font-display rounded-xl"
                  variant="outline"
                >
                  ΚΛΕΙΣΙΜΟ
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex gap-3">
          <Button
            onClick={onHome}
            size="lg"
            variant="outline"
            className="flex-1 font-display text-lg h-14 rounded-xl"
          >
            🏠 HOME
          </Button>
          <Button
            onClick={onRestart}
            size="lg"
            className="flex-1 font-display text-lg h-14 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            ΞΑΝΑ!
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}