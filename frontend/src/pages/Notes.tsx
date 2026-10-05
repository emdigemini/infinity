import type { NotesType } from '../index';
import { NotebookPen, Heart, Notebook } from 'lucide-react'
import Calendar from '../components/notes/Calendar'
import { useState } from 'react'
import CreateNoteOverlay from '../components/notes/CreateNoteOverlay';
import DeleteNoteOverlay from '../components/notes/DeleteNoteOverlay';
import NoteEditor from '../components/notes/NoteEditor';
import { formatDate, formatTime } from '../utils';
import { isAxiosError } from 'axios';
import { toast } from 'react-hot-toast';
import baseUrl from '../axios';
import { useNotesContext } from '../context/NotesContext';

const Notes = () => {
  const { setIsLoading, setNotes, notes } = useNotesContext();
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showDeleteOverlay, setShowDeleteOverlay] = useState<NotesType | false>(false);
  const [selectedNote, setSelectedNote] = useState<NotesType | null>(null);

  const handleUpdateNote = async (updatedNote: NotesType) => {
    setIsLoading(true);
    try {
      await baseUrl.put(`/notes/update-note/${updatedNote._id}`, updatedNote);
      setNotes((prevNotes) => {
        return prevNotes.map((note) => note._id === updatedNote._id ? updatedNote : note);
      });
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        console.error(`Error updating note with ID: `, err);
        toast.error(err.response?.data.message || "Failed to update note.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-4">
      {showDeleteOverlay && (
        <DeleteNoteOverlay 
          note={showDeleteOverlay}
          formatDate={formatDate}
          formatTime={formatTime}
          onCancel={() => setShowDeleteOverlay(false)}
        />
      )}
      {selectedNote && (
        <NoteEditor 
          note={selectedNote}
          formatTime={formatTime}
          formatDate={formatDate}
          onClose={() => setSelectedNote(null)}
          onSave={handleUpdateNote}
        />
      )}
      {showNoteModal && (
        <CreateNoteOverlay 
          onClose={() => setShowNoteModal(false)} 
        />
      )}

    {/* Header */}
      <div className="flex items-center justify-between gap-4 px-1">

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-[#2B2618]">
              Leave a Little Note
            </h1>

            <Heart
              size={15}
              fill="currentColor"
              className="text-[#D4A72C]"
            />
          </div>

          <p className="mt-1 text-sm text-[#8B7A45]">
            Leave something sweet for your partner to discover.
          </p>
        </div>

        {/* Create Note */}
        <div className="flex flex-col gap-3">
          {/* Total Notes */}
          <div className="flex items-center gap-2 rounded-xl border border-[#E8D9A5] bg-[#FFFDF5] px-4 py-2.5 shadow-sm">
            <Notebook
              size={16}
              strokeWidth={1.8}
              className="text-[#D4A72C]"
            />

            <div className="flex items-baseline gap-1.5">
              <span className="text-sm font-bold text-[#2B2618]">
                {notes.length}
              </span>

              <span className="font-semibold text-sm text-[#8B7A45]">
                {notes.length > 1 ? 'Notes' : 'Note'} 
              </span>
            </div>
          </div>

          {/* Create Note */}
          <button
            type="button"
            onClick={() => setShowNoteModal(true)}
            className="
              group
              inline-flex items-center justify-center gap-2
              whitespace-nowrap rounded-xl bg-[#D4A72C] px-4 py-2.5
              text-sm font-semibold text-white
              shadow-sm transition-all duration-200
              hover:-translate-y-0.5 hover:bg-[#C29624]
              hover:shadow-md active:translate-y-0 active:scale-[0.97]
            "
          >
            <NotebookPen
              size={16}
              strokeWidth={2}
              className="transition-transform duration-200 group-hover:-rotate-3"
            />

            <span>Create Note</span>

            <Heart
              size={13}
              fill="currentColor"
              strokeWidth={1.8}
              className="transition-transform duration-200 group-hover:scale-125"
            />
          </button>
        </div>
      </div>

      {/* Calendar */}
      <Calendar
        setShowDeleteOverlay={setShowDeleteOverlay}
        setSelectedNote={setSelectedNote}
        selectedNote={selectedNote}
      />

    </div>
  )
}

export default Notes
