import { Heart, Trash2 } from "lucide-react";
import type { NotesType } from "../../index";

const NoteList = ({
  selectedNotes,
  formatTime,
  setShowDeleteOverlay,
  selectedNote,
  setSelectedNote
}: {
  selectedNotes: NotesType[];
  formatTime: (time: string) => string;
  setShowDeleteOverlay: (note: NotesType) => void;
  setSelectedNote: (note: NotesType) => void;
  selectedNote: NotesType | null;
}) => {

  return (
    <div className="space-y-3 max-h-45 overflow-y-auto">
      {selectedNotes.map((note) => (
        <div
          key={note._id}
          className="relative flex justify-between items-center gap-4 rounded-2xl border border-[#E8D9A5] bg-[#FFFDF5] p-4 transition hover:border-[#D4A72C]"
          onClick={() => {
            if (selectedNote && selectedNote._id === note._id) return;
            setSelectedNote(note);
          }}
        >
          <div className="flex items-center gap-3">

            {/* Heart */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F9F1D0]">
              <Heart
                size={17}
                fill="currentColor"
                className="text-[#D4A72C]"
              />
            </div>

            {/* Note Info */}
            <div className="min-w-0 pr-16">
              <p className="truncate text-sm font-semibold text-[#2B2618]">
                {note.title}
              </p>

              {note.time && (
                <p className="mt-1 text-xs text-[#8B7A45]">
                  {formatTime(note.time)}
                </p>
              )}
            </div>

          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (selectedNote && selectedNote._id === note._id) return;
              setShowDeleteOverlay(note);
            }}
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#B85C5C] transition hover:bg-[#FBEAEA] hover:text-[#A83F3F]"
            title="Delete note"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default NoteList;