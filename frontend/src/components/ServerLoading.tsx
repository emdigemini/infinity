import { motion } from "framer-motion";
import { InfinityIcon } from "lucide-react";

const ServerLoading = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-9999 flex items-center justify-center
        bg-[#FFFDF6]/90 backdrop-blur-md"
    >
      <div className="flex flex-col items-center gap-6">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.08, 1],
          }}
          transition={{
            rotate: {
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            },
            scale: {
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className="flex h-24 w-24 items-center justify-center
            rounded-4xl bg-[#D4A72C]
            shadow-[0_8px_30px_rgba(212,167,44,0.25)]"
        >
          <InfinityIcon
            size={58}
            strokeWidth={2}
            className="text-white"
          />
        </motion.div>

        {/* Loading Text */}
        <div className="flex flex-col items-center gap-2">
          <motion.h2
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-lg font-semibold tracking-wide
              text-[#2B2618]"
          >
            Connecting to Infinity
          </motion.h2>

          <p className="text-sm text-[#8B7A45]">
            Preparing your little world together...
          </p>
        </div>

        {/* Loading Indicator */}
        <div className="flex gap-2">
          {[0, 1, 2].map((dot) => (
            <motion.span
              key={dot}
              animate={{
                y: [0, -6, 0],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: dot * 0.15,
                ease: "easeInOut",
              }}
              className="h-2 w-2 rounded-full bg-[#D4A72C]"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ServerLoading;