import type { NotesType } from "../..";
import { motion } from "framer-motion";
import { X } from "lucide-react";
// import { formatDate, formatTime } from "../../utils";

const paperTransition = {
  duration: 0.85,
  ease: [0.22, 1, 0.36, 1] as const,
};

const NoteViwer = ({
  note,
  onClose,
}: {
  note: NotesType;
  onClose: () => void;
}) => {
  const text = `${note.title} ${note.content}`;

  const wordCount = text.trim()
    ? text.trim().split(/\s+/).length
    : 0;

  const characterCount = text.length;

  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/30 p-5">

      {/* 3D Perspective */}
      <div className="relative w-full max-w-175 perspective-[1800px]">

        {/* ACTUAL NOTEBOOK PAPER */}
        <motion.div
          className="
            relative
            min-h-[75vh]
            w-full
            origin-left
            transform-3d
          "
          initial={{
            rotateY: -90,
          }}
          animate={{
            rotateY: 0,
          }}
          exit={{
            rotateY: -90,
          }}
          transition={paperTransition}
        >{/* NOTEBOOK PAPER */}
          <div
            className="
              relative
              min-h-[95vh]
              max-h-[95vh]
              w-full
              overflow-y-auto
              rounded-2xl
              bg-[#FFFDF6]
              shadow-2xl
              backface-hidden
            "
            style={{
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
            {/* RED NOTEBOOK MARGIN */}
            <div
              className="
                pointer-events-none
                absolute
                bottom-0
                left-10
                top-0
                w-px
                bg-[#E8B8B8]
              "
            />

            {/* PAPER CONTENT */}
            <div className="relative flex flex-col px-14 pt-8">

              {/* DATE */}
              <p className="text-sm leading-8 text-[#8B7A45]">
                {/* {formatDate(new Date(note.date))} · {formatTime(note.time)} */}
              </p>
              <p className="absolute top-1 text-sm leading-8 text-[#8B7A45]">
                {wordCount} words · {characterCount} characters
              </p>

              {/* TITLE */}
              <h2
                className="
                  mt-1
                  text-3xl
                  font-semibold
                  leading-8
                  text-[#2B2618]
                "
              >
                {note.title}
              </h2>

              {/* NOTE CONTENT */}
              <p
                className="
                  mt-4
                  whitespace-pre-wrap
                  text-[16px]
                  leading-8
                  text-[#2B2618]
                "
              >
                {note.content}
              </p>

            </div>

            {/* CLOSE BUTTON */}
            <button
              onClick={onClose}
              className="
                fixed right-4 top-4 flex h-9 w-9 items-center justify-center
                rounded-full border border-[#E8D9A5] bg-[#FFFDF6]/80
                text-[#8B7A45] shadow-sm backdrop-blur-sm transition-all
                duration-200 hover:bg-[#F5EAC8] hover:text-[#2B2618]
                hover:shadow-md active:scale-95
              "
            >
              <X size={18} strokeWidth={1.8} />
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default NoteViwer;