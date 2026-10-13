import { Heart, Trash2 } from "lucide-react";
import type { NotesType } from "../../index";

const NoteList = ({
  selectedNotes,
  formatTime,
  setShowDeleteOverlay,
  editingNote,
  setEditingNote
}: {
  selectedNotes: NotesType[];
  formatTime: (time: string) => string;
  setShowDeleteOverlay: (note: NotesType) => void;
  setEditingNote: (note: NotesType) => void;
  editingNote: NotesType | null;
}) => {

  return (
    <div className="space-y-3 max-h-45 overflow-y-auto">
      {selectedNotes.map((note) => (
        <div
          key={note._id}
          className="flex items-center justify-between gap-2 sm:gap-4 rounded-2xl border border-[#E8D9A5] bg-[#FFFDF5] p-3 sm:p-4 transition hover:border-[#D4A72C]"
          onClick={() => {
            if (editingNote && editingNote._id === note._id) return;
            setEditingNote(note);
          }}
        >
          <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">

            {/* Heart */}
            <div className="flex h-7 w-7 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-full bg-[#F9F1D0]">
              <Heart
                fill="currentColor"
                className="h-3 w-3 md:h-4 md:w-4 text-[#D4A72C]"
              />
            </div>

            {/* Note Info */}
            <div className="min-w-0 flex-1">
              <p className="wrap-break-word text-sm font-semibold text-[#2B2618]">
                {note.title}
              </p>

              {note.time && (
                <p className="mt-0.5 text-xs text-[#8B7A45]">
                  {formatTime(note.time)}
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (editingNote && editingNote._id === note._id) return;
              setShowDeleteOverlay(note);
            }}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#B85C5C] transition hover:bg-[#FBEAEA] hover:text-[#A83F3F]"
            title="Delete note"
            aria-label="Delete note"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default NoteList;