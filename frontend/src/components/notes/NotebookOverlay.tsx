import type { NotesType } from "../..";
import { X, Heart, BookHeart } from "lucide-react";
import { formatNameDate } from "../../utils";
import { useEffect } from "react";

type NotebookOverlayProps = {
  notes: NotesType[];
  onClose: () => void;
  onSelectNote: (note: NotesType) => void;
  showNotebook: boolean;
};

const NotebookOverlay = ({
  notes,
  onClose,
  onSelectNote,
  showNotebook,
}: NotebookOverlayProps) => {

  useEffect(() => {
    if (!showNotebook) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [showNotebook]);
  return (
      <div
        className="
          fixed inset-0 z-999
          flex items-center justify-center
          bg-[#2B2618]/40 p-3
          backdrop-blur-[2px]
          sm:p-5
        "
        onClick={onClose}
      >
        <div
          className="
            flex max-h-[85dvh] w-full max-w-3xl
            flex-col overflow-hidden
            rounded-2xl border border-[#D8C99A]
            bg-[#F3E8C8] shadow-2xl
            sm:rounded-3xl
          "
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div
            className="
              flex shrink-0 items-center
              justify-between gap-3
              border-b border-[#B08A2E]/40
              bg-[#D4A72C] px-4 py-4
              text-white sm:px-6
            "
          >
            <div className="flex min-w-0 items-center gap-3">
              <div
                className="
                  flex h-10 w-10 shrink-0
                  items-center justify-center
                  rounded-full bg-[#FFFDF5]/20
                "
              >
                <BookHeart size={21} />
              </div>

              <div className="min-w-0">
                <h2 className="font-serif text-xl font-bold">
                  Our Letters
                </h2>
                <p className="mt-0.5 text-xs text-white/85">
                  Little pieces of our hearts ♡
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close notebook"
              className="
                flex h-9 w-9 shrink-0
                items-center justify-center
                rounded-full transition
                hover:bg-white/20
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-white
              "
            >
              <X size={20} />
            </button>
          </div>

          {/* Notebook information */}
          <div
            className="
              flex shrink-0 items-center
              justify-between gap-3
              border-b border-[#D8C99A]
              bg-[#FAF2D9] px-4 py-3
              sm:px-6
            "
          >
            <div className="flex items-center gap-2">
              <Heart
                size={14}
                fill="currentColor"
                className="text-[#D4A72C]"
              />
              <span className="font-serif text-sm italic text-[#756647]">
                A collection of letters
              </span>
            </div>

            <span
              className="
                shrink-0 rounded-full
                border border-[#D4A72C]/40
                bg-[#FFFDF5] px-3 py-1
                text-xs font-medium text-[#8B7A45]
              "
            >
              {notes.length} {notes.length === 1 ? "Letter" : "Letters"}
            </span>
          </div>

          {/* Notebook pages */}
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-3 sm:p-6">
            {notes.length === 0 ? (
              <div
                className="
                  flex min-h-64 flex-col
                  items-center justify-center
                  border border-[#D8C99A]
                  bg-[#FFFDF5] px-5 py-10
                  text-center shadow-sm
                "
              >
                <Heart
                  size={30}
                  fill="currentColor"
                  className="mb-4 text-[#D4A72C]"
                />

                <h3 className="font-serif text-lg font-semibold text-[#2B2618]">
                  No letters yet
                </h3>

                <p className="mt-2 max-w-56 font-serif text-sm italic leading-relaxed text-[#8B7A45]">
                  Every beautiful story begins with a few words.
                  Your next letter awaits.
                </p>
              </div>
            ) : (
              <div
                className="
                  relative mx-auto max-w-2xl
                  overflow-hidden
                  border border-[#D8C99A]
                  bg-[#FFFDF5] shadow-md
                "
              >
                {/* Center notebook binding */}
                <div
                  className="
                    pointer-events-none absolute
                    inset-y-0 left-1/2 z-10
                    w-3 -translate-x-1/2
                    bg-linear-to-r
                    from-transparent
                    via-[#6E5830]/10
                    to-transparent
                  "
                />

                {/* Two-column notebook grid */}
                <div className="grid grid-cols-2">
                  {notes.map((note, index) => (
                    <button
                      key={note._id}
                      type="button"
                      onClick={() => onSelectNote(note)}
                      className={`
                        group relative flex h-64 min-w-0 flex-col
                        overflow-hidden p-3 text-left
                        transition-colors duration-200
                        hover:bg-[#FFF8E7]
                        sm:h-72 sm:p-5
                        ${index % 2 === 0 ? "border-r border-[#D8C99A]/80" : ""}
                        ${index >= 2 ? "border-t border-[#D8C99A]/80" : ""}
                      `}
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <span className="font-serif text-[10px] italic tracking-wide text-[#B09A63]">
                          No. {String(index + 1).padStart(2, "0")}
                        </span>

                        <Heart
                          size={12}
                          className="text-[#D4A72C]"
                        />
                      </div>
                      <span className="font-serif text-sm font-bold text-[#2B2618]">
                        {note.title || "A little note"}
                      </span>

                      <p className="mt-2 line-clamp-3 min-w-0 overflow-hidden font-serif text-xs leading-6 text-[#756647]">
                        {note.content}
                      </p>

                      <span className="mt-3 border-t border-dashed border-[#D8C99A] pt-2 text-[10px] text-[#8B7A45]">
                        Received on
                      </span>

                      <span className="text-[10px] text-[#8B7A45]">
                        {note.createdAt
                          ? formatNameDate(note.date.split("T")[0])
                          : "A timeless letter"}
                      </span>

                      <span className="mt-1.5 text-[10px] font-medium text-[#B08A2E]">
                        Read letter →
                      </span>
                    </button>
                  ))}

                  {/* Empty page kapag odd ang bilang ng notes */}
                  {notes.length % 2 !== 0 && (
                    <div
                      className="
                        flex h-64 flex-col items-center
                        justify-center gap-3 p-4 text-center
                        border-t border-[#D8C99A]/80
                        bg-[#FFFDF5] sm:h-72 sm:p-5
                      "
                    >
                      <Heart
                        size={25}
                        strokeWidth={1.3}
                        className="text-[#D4A72C]/70"
                      />

                      <p className="font-serif text-sm italic text-[#8B7A45]">
                        No more letters
                      </p>

                      <p className="max-w-32 font-serif text-xs leading-relaxed text-[#B09A63]">
                        No more letters to unfold... just yet.
                      </p>
                    </div>
                  )}
                </div>

              </div>
            )}
          </div>

          {/* Footer */}
          <div
            className="
              border-t border-[#D8C99A]
              bg-[#FAF2D9] px-3 py-3
              text-center
            "
          >
            <div className="flex items-center justify-center gap-2 font-serif text-[10px] italic tracking-wide text-[#8B7A45]">
              <Heart size={12} fill="currentColor" />
              A collection of letters, kept with love ♡
            </div>
          </div>
        </div>
      </div>
  );
};

export default NotebookOverlay;