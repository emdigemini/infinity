import type { NotesType } from "../..";
import { X, Heart, BookHeart } from "lucide-react";
import { RemoveScroll } from "react-remove-scroll";

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
  showNotebook
}: NotebookOverlayProps) => {

  return (
    <RemoveScroll enabled={showNotebook}>
      <div
        className="
          fixed inset-0 z-50
          flex items-center justify-center
          bg-[#2B2618]/40 p-4
          backdrop-blur-[2px]
        "
        onClick={onClose}
      >
        <div
          className="
            flex max-h-[85dvh] w-full max-w-3xl
            flex-col overflow-hidden
            rounded-3xl border border-[#E8D9A5]
            bg-[#FFFDF5] shadow-xl
          "
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div
            className="
              flex shrink-0 items-center
              justify-between gap-3
              bg-[#D4A72C] px-5 py-4
              text-white sm:px-6
            "
          >
            <div className="flex items-center gap-3">
              <div
                className="
                  flex h-10 w-10 items-center
                  justify-center rounded-full
                  bg-[#FFFDF5]/20
                "
              >
                <BookHeart size={21} />
              </div>

              <div>
                <h2 className="font-serif text-xl font-bold">
                  Notes Received
                </h2>
                <p className="mt-0.5 text-xs text-white/85">
                  A note message from your partner ♡
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close notes"
              className="
                flex h-9 w-9 items-center justify-center
                rounded-full transition
                hover:bg-white/20
              "
            >
              <X size={20} />
            </button>
          </div>

          {/* Notes count */}
          <div
            className="
              flex shrink-0 items-center
              justify-between border-b
              border-[#E8D9A5] px-5 py-3
              sm:px-6
            "
          >
            <span className="text-sm font-semibold text-[#2B2618]">
              Your Notes
            </span>

            <span
              className="
                rounded-full border border-[#D4A72C]/40
                bg-[#FFF8DF] px-3 py-1
                text-xs font-medium text-[#8B7A45]
              "
            >
              {notes.length} {notes.length === 1 ? "Note" : "Notes"}
            </span>
          </div>

          {/* Notes grid */}
          <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">
            {notes.length === 0 ? (
              <div
                className="
                  flex min-h-48 flex-col
                  items-center justify-center
                  rounded-2xl bg-[#F9F0CB]
                  px-5 py-8 text-center
                "
              >
                <Heart
                  size={27}
                  fill="currentColor"
                  className="mb-3 text-[#D4A72C]"
                />

                <p className="font-serif font-semibold text-[#2B2618]">
                  No notes received yet
                </p>

                <p className="mt-1 text-xs text-[#8B7A45]">
                  Your little messages will appear here.
                </p>
              </div>
            ) : (
              <div
                className="
                  grid grid-cols-1 gap-3
                  sm:grid-cols-2 lg:grid-cols-3
                "
              >
                {notes.map((note) => (
                  <button
                    key={note._id}
                    type="button"
                    onClick={() => onSelectNote(note)}
                    className="
                      group relative flex min-h-36
                      flex-col overflow-hidden
                      rounded-2xl border
                      border-[#E8D9A5]
                      bg-white text-left
                      transition duration-200
                      hover:-translate-y-0.5
                      hover:border-[#D4A72C]
                      hover:shadow-md
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-[#D4A72C]
                    "
                  >
                    {/* Notebook accent */}
                    <div className="h-1.5 w-full bg-[#D4A72C]" />

                    <div className="flex flex-1 gap-3 p-4">
                      <div
                        className="
                          flex h-9 w-9 shrink-0
                          items-center justify-center
                          rounded-full bg-[#F9F0CB]
                          text-[#D4A72C]
                        "
                      >
                        <Heart size={17} fill="currentColor" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3
                          className="
                            line-clamp-2
                            font-serif text-sm font-bold
                            leading-relaxed text-[#2B2618]
                          "
                        >
                          {note.title || "A little note"}
                        </h3>

                        <p
                          className="
                            mt-2 line-clamp-3
                            whitespace-pre-line
                            text-xs leading-relaxed
                            text-[#8B7A45]
                          "
                        >
                          {note.content}
                        </p>
                      </div>
                    </div>

                    <div
                      className="
                        flex items-center justify-between
                        border-t border-[#E8D9A5]/70
                        bg-[#FFFDF5] px-4 py-2.5
                      "
                    >
                      <span className="text-[10px] text-[#8B7A45]">
                        Open note
                      </span>

                      <Heart
                        size={12}
                        className="
                          text-[#D4A72C]
                          transition-transform
                          group-hover:scale-125
                        "
                        fill="currentColor"
                      />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div
            className="
              flex shrink-0 items-center
              justify-center gap-2
              border-t border-[#E8D9A5]
              bg-[#FFF8DF] px-4 py-3
              text-xs text-[#8B7A45]
            "
          >
            <Heart size={12} fill="currentColor" />
            Every note holds a little piece of love.
          </div>
        </div>
      </div>
    </RemoveScroll>
  );
};

export default NotebookOverlay;
