import type { MediaType } from "../..";
import { useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Download,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface PrevMediaProps {
  media: MediaType[];
  currentIndex: number;
  onChange: (index: number) => void;
  onClose: () => void;
}
const PrevMedia = ({
  media,
  currentIndex,
  onChange,
  onClose,
}: PrevMediaProps) => {
  const currentMedia = media[currentIndex];

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === media.length - 1;

  const handlePrevious = useCallback( () => {
    if (!isFirst) {
      onChange(currentIndex - 1);
    }
  }, [currentIndex, isFirst, onChange]);

  const handleNext = useCallback(() => {
    if (!isLast) {
      onChange(currentIndex + 1);
    }
  }, [currentIndex, isLast, onChange]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }

      if (e.key === "ArrowLeft") {
        handlePrevious();
      }

      if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleNext, currentIndex, media.length, onClose, handlePrevious]);

  if (!currentMedia) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="
          fixed inset-0 z-999
          flex items-center justify-center
          bg-black/80 p-4
          backdrop-blur-sm
        "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Actions */}
        <div className="absolute right-5 top-5 z-20 flex items-center gap-2">
          {/* Download */}
          <a
            href={currentMedia.url}
            download
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="
              flex h-10 w-10 items-center justify-center
              rounded-full
              bg-white/10
              text-white
              backdrop-blur-md
              transition
              hover:bg-white/20
            "
            title="Download"
          >
            <Download size={20} />
          </a>

          {/* Close */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="
              flex h-10 w-10 items-center justify-center
              rounded-full
              bg-white/10
              text-white
              backdrop-blur-md
              transition
              hover:bg-white/20
            "
            title="Close"
          >
            <X size={22} />
          </button>
        </div>

        {/* Previous */}
        <button
          disabled={isFirst}
          onClick={(e) => {
            e.stopPropagation();
            handlePrevious();
          }}
          className="
            absolute left-4 top-1/2 z-20
            flex h-11 w-11
            -translate-y-1/2
            items-center justify-center
            rounded-full
            bg-white/10
            text-white
            backdrop-blur-md
            transition
            hover:bg-white/20
            disabled:pointer-events-none
            disabled:opacity-20
          "
        >
          <ChevronLeft size={28} />
        </button>

        {/* Media */}
        <motion.div
          key={currentMedia._id}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className="flex max-h-[90vh] max-w-[100vw] flex-col items-center"
        >
          {/* Image */}
          {currentMedia.type === "image" && (
            <img
              src={currentMedia.url}
              alt={currentMedia.caption || "Photo"}
              className="
                max-h-[78vh]
                max-w-[95vw]
                rounded-2xl
                object-contain
                shadow-2xl
              "
            />
          )}

          {/* Video */}
          {currentMedia.type === "video" && (
            <video
              key={currentMedia.url}
              src={currentMedia.url}
              controls
              autoPlay
              playsInline
              className="
                max-h-[78vh]
                max-w-[85vw]
                rounded-2xl
                object-contain
                shadow-2xl
              "
            />
          )}

          {/* Caption */}
          {currentMedia.caption && (
            <p className="
              mt-4
              max-w-2xl
              text-center
              text-sm
              text-white/90
            ">
              {currentMedia.caption}
            </p>
          )}

          {/* Counter */}
          <p className="mt-2 text-xs text-white/50">
            {currentIndex + 1} / {media.length}
          </p>
        </motion.div>

        {/* Next */}
        <button
          disabled={isLast}
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="
            absolute right-4 top-1/2 z-20
            flex h-11 w-11
            -translate-y-1/2
            items-center justify-center
            rounded-full
            bg-white/10
            text-white
            backdrop-blur-md
            transition
            hover:bg-white/20
            disabled:pointer-events-none
            disabled:opacity-20
          "
        >
          <ChevronRight size={28} />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default PrevMedia;
