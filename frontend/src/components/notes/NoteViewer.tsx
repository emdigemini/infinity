import { useEffect } from "react";
import type { NotesType } from "../..";
import { motion } from "framer-motion";
import { X } from "lucide-react";
// import { formatDate, formatTime } from "../../utils";

const paperTransition = {
  duration: 0.85,
  ease: [0.22, 1, 0.36, 1] as const,
};

const NoteViewer = ({
  note,
  isNoteOpen,
  onClose,
}: {
  note: NotesType;
  isNoteOpen: boolean;
  onClose: (noteId: string) => void;
}) => {
  const text = `${note.title} ${note.content}`;

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const characterCount = text.length;

  // Lock body scroll while viewer is open
  useEffect(() => {
    if (!isNoteOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isNoteOpen]);

  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/30 p-5">
      {/* 3D Perspective */}
      <div className="relative w-full max-w-175 perspective-[1800px]">
        <motion.div
          className="relative h-[90dvh] w-full origin-left transform-3d"
          initial={{ rotateY: -90 }}
          animate={{ rotateY: 0 }}
          exit={{ rotateY: -90 }}
          transition={paperTransition}
        >
          {/* CLOSE BUTTON (outside the scroll area, so it stays put) */}
          <button
            type="button"
            onClick={() => onClose(note._id)}
            aria-label="Close note"
            className="
              absolute right-3 top-3 z-10 flex h-7 w-7 md:h-9 md:w-9
              items-center justify-center rounded-full border border-[#E8D9A5]
              bg-[#FFFDF6]/80 text-[#8B7A45] shadow-sm backdrop-blur-sm
              transition-all duration-200 hover:bg-[#F5EAC8]
              hover:text-[#2B2618] hover:shadow-md active:scale-95
            "
          >
            <X size={16} strokeWidth={1.8} />
          </button>

          {/* SCROLLABLE NOTEBOOK PAPER */}
          <div
            className="
              h-full w-full overflow-y-auto overscroll-contain touch-pan-y
              rounded-2xl bg-[#FFFDF6] shadow-2xl backface-hidden
            "
            style={{
              backgroundAttachment: "local",
              backgroundImage: `
                repeating-linear-gradient(
                  to bottom,
                  transparent 0px,
                  transparent 29px,
                  rgba(232, 217, 165, 0.7) 29px,
                  rgba(232, 217, 165, 0.7) 30px
                )
              `,
            }}
          >
            {/* PAPER CONTENT (grows with the text) */}
            <div className="relative flex min-h-full flex-col px-10 pb-10 pt-8">
              {/* RED NOTEBOOK MARGIN */}
              <div className="pointer-events-none absolute inset-y-0 left-6 w-px bg-[#E8B8B8]" />

              {/* DATE */}
              <p className="text-sm leading-8 text-[#8B7A45]">
                {/* {formatDate(new Date(note.date))} · {formatTime(note.time)} */}
              </p>
              <p className="absolute top-1 text-xs leading-8 text-[#8B7A45] md:text-sm">
                {wordCount} words · {characterCount} characters
              </p>

              {/* TITLE */}
              <h2 className="mt-1 text-2xl font-semibold leading-8 text-[#2B2618] md:text-3xl">
                {note.title}
              </h2>

              {/* NOTE CONTENT */}
              <p className="mt-4 whitespace-pre-wrap text-[14px] leading-8 text-[#2B2618] md:text-[16px]">
                {note.content}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NoteViewer;
