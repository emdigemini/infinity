import { X, Trash2 } from "lucide-react";
import type { NotesType } from "../../index";
import { useNotesContext } from "../../context/NotesContext";
import baseUrl from "../../axios";
import { isAxiosError } from 'axios';
import { toast } from "react-hot-toast";

type DeleteNoteOverlayProps = {
  note: NotesType;
  formatDate: (date: Date) => string;
  formatTime: (time: string) => string;
  onCancel: () => void;
};

const DeleteNoteOverlay = ({
  note,
  formatDate,
  formatTime,
  onCancel,
}: DeleteNoteOverlayProps) => {
  const { setIsLoading, setNotes } = useNotesContext();
  
  const handleDeleteNote = async () => {
    setIsLoading(true);
    try {
      const res = await baseUrl.delete(`/notes/delete-note/${note._id}`);
      toast.success(res.data.message);
      setNotes((prevNotes) => prevNotes.filter((n) => n._id !== note._id));
      onCancel();
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        console.error(`Error deleting note with ID: `, err);
        toast.error(err.response?.data.message || "Failed to delete note.");
      }
    } finally {
      setIsLoading(false);
      console.log(`Deleting note with ID: ${note._id}`);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-sm rounded-3xl border border-[#E8D9A5] bg-[#FFFDF5] p-6 shadow-xl">
        
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#2B2618]">
              Delete note?
            </h2>

            <p className="mt-1 text-sm text-[#8B7A45]">
              Are you sure you want to delete this note?
            </p>
          </div>

          <button
            type="button"
            onClick={onCancel}
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#8B7A45] transition hover:bg-[#F9F1D0]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Note Preview */}
        <div className="mt-5 rounded-2xl border border-[#E8D9A5] bg-[#F9F1D0]/50 p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="truncate text-sm font-semibold text-[#2B2618]">
              {note.title}
            </p>

            {note.date && (
              <p className="shrink-0 text-[11px] text-[#8B7A45]">
                {formatDate(new Date(note.date))}
              </p>
            )}
          </div>

          {note.time && (
            <p className="mt-1 text-xs text-[#8B7A45]">
              {formatTime(note.time)}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-xl border border-[#E8D9A5] px-4 py-2.5 text-sm font-semibold text-[#8B7A45] transition hover:bg-[#F9F1D0]"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDeleteNote}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#B85C5C] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#A83F3F]"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteNoteOverlay;