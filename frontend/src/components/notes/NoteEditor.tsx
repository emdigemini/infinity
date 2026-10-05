import { X } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import type { NotesType } from "../../index";

type NoteEditorProps = {
  note: NotesType;
  formatTime: (time: string) => string;
  formatDate: (date: Date) => string;
  onClose: () => void;
  onSave: (updatedNote: NotesType) => void;
};

const NoteEditor = ({
  note,
  formatTime,
  formatDate,
  onClose,
  onSave,
}: NoteEditorProps) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const initialTitle = useRef(note.title);
  const initialContent = useRef(note.content);

  const dateCreated = new Date(note.createdAt);

  const timeCreated = dateCreated.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  useEffect(() => {
    if (
      title === initialTitle.current &&
      content === initialContent.current
    ) {
      return;
    }
    const timer = setTimeout(() => {
      onSave({
        ...note,
        title,
        content,
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [title, content, onSave, note]);

  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/50 p-3 sm:p-6">
      <div className="relative flex h-[95vh] w-full max-w-3xl flex-col overflow-hidden rounded-sm bg-[#FFFDF5] shadow-2xl">

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[#FFFDF5]/90 text-[#8B7A45] shadow-sm backdrop-blur transition hover:bg-[#F9F1D0] hover:text-[#2B2618]"
          aria-label="Close note"
        >
          <X size={19} />
        </button>

        {/* Notebook Page */}
        <div
          className="flex min-h-0 flex-1 flex-col overflow-hidden px-7 py-10 sm:px-12 sm:py-12"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, transparent 0px, transparent 31px, #E8D9A5 32px)",
          }}
        >
          {/* Left Margin */}
          <div className="pointer-events-none absolute bottom-0 left-5 top-0 border-l border-[#E8B7B7]/60 sm:left-7" />

          {/* Header */}
          <header className="relative mb-8 shrink-0 pl-5 sm:pl-7">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Note title"
              className="w-full border-none bg-transparent pr-10 font-serif text-3xl font-semibold leading-tight text-[#2B2618] outline-none placeholder:text-[#B8A879] sm:text-4xl"
            />

            <div className="mt-3 space-y-1 text-xs text-[#8B7A45]">
              <div className="flex flex-wrap items-center gap-3">
                <span className="w-16 font-medium uppercase tracking-wide">
                  Created
                </span>

                <span>
                  {formatDate(new Date(note.createdAt!))}
                </span>

                <span className="text-[#D4A72C]">•</span>

                <span>{timeCreated}</span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span className="w-16 font-medium uppercase tracking-wide">
                  Scheduled
                </span>

                <span>
                  {formatDate(new Date(note.date))}
                </span>

                <span className="text-[#D4A72C]">•</span>

                <span>{formatTime(note.time)}</span>
              </div>
            </div>
          </header>

          {/* Divider */}
          <div className="relative mb-7 ml-5 shrink-0 border-t border-[#E8D9A5] sm:ml-7" />

          {/* Editable Content */}
          <main className="relative min-h-0 flex-1 pl-5 sm:pl-7">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your note..."
              className="h-full min-h-0 w-full resize-none overflow-y-auto border-none bg-transparent font-serif text-[17px] leading-8 text-[#2B2618] outline-none placeholder:text-[#B8A879]"
            />
          </main>
        </div>
      </div>
    </div>
  );
};

export default NoteEditor;