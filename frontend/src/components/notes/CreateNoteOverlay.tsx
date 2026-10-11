import { X, Heart, Send, CalendarDays} from 'lucide-react'
import { formatNameDate } from '../../utils';
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { isAxiosError } from "axios";
import baseUrl from '../../axios';
import { useNotesContext } from '../../context/NotesContext';

const CreateNoteOverlay = ({
  onClose
}: {
  onClose: () => void
}) => {
  const { setIsLoading, setNotes } = useNotesContext();
  const [note, setNote] = useState({
    title: '',
    content: '',
    date: '',
    time: ''
  });
  const [today] = useState(() => {
    const date = new Date();
    const offset = date.getTimezoneOffset();

    return new Date(date.getTime() - offset * 60000)
      .toISOString()
      .split("T")[0];
  });

  const handleCreateNote = async () => {
    
    if (!note.title || !note.content) {
      toast.error(
        'Please fill in both the title and content of the note.'
      )
      return
    }

    if (!note.date || !note.time) {
      toast.error(
        'Please select a delivery date and time for the note.'
      )
      return
    }
    setIsLoading(true);
    try {
      const res = await baseUrl.post('/notes/create-note', note);
      toast.success(res.data.message || 'Note created successfully!');
      setNotes((prevNotes) => [res.data.note, ...prevNotes]);
      onClose()
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        toast.error(
          err.response?.data?.message || 'An error occurred while creating the note.'
        )
      }
    } finally {
      setIsLoading(false);
    }
  }

  const createdDate = new Date().toLocaleDateString(
    'default',
    {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }
  )

  return (
    <div className="
      fixed inset-0 z-50
      flex items-center justify-center
      bg-black/50
      px-3
      py-4
      backdrop-blur-[2px]
    ">

      {/* Close */}
      <button
        onClick={onClose}
        className="
          fixed right-5 top-5 z-20
          flex h-10 w-10
          items-center justify-center
          rounded-full
          bg-[#D4A72C]
          text-white
          shadow-lg
          transition
          hover:bg-[#C29624]
          hover:scale-105
          active:scale-95
        "
      >
        <X size={19} />
      </button>

      {/* Paper */}
      <div
        className="
          relative
          h-[92vh]
          w-full
          max-w-2xl
          overflow-y-auto
          shadow-2xl
        "
        style={{
          backgroundColor: '#FFFDF5',
          backgroundImage: `
            repeating-linear-gradient(
              to bottom,
              transparent 0px,
              transparent 31px,
              #E8D9A5 32px,
              #E8D9A5 33px
            )
          `
        }}
      >

        {/* Paper left margin */}
        <div className="
          pointer-events-none
          absolute
          bottom-0 left-10 top-0
          w-px
          bg-[#E4B9A0]/60
        " />

        {/* Content */}
        <div className="
          relative
          min-h-full
          px-14
          pb-20
          pt-10
          sm:px-20
          sm:pt-12
        ">

          {/* Header */}
          <div className="mb-8">

            <div className="
              flex
              items-center
              justify-between
            ">

              <div>
                <p className="
                  text-xs
                  font-medium
                  uppercase
                  tracking-[0.2em]
                  text-[#8B7A45]
                ">
                  A message for your partner
                </p>

                <p className="
                  mt-1
                  text-xs
                  text-[#A89563]
                ">
                  Written on {formatNameDate(note.date) || createdDate}
                </p>
              </div>

              <Heart
                size={22}
                fill="currentColor"
                className="text-[#D4A72C]"
              />

            </div>

          </div>

          {/* Title */}
          <div className="mb-7">
            <input
              type="text"
              value={note.title}
              placeholder="Title..."
              onChange={(e) =>
                setNote(prev => ({
                  ...prev,
                  title: e.target.value
                }))
              }
              className="
                mt-1
                w-full
                border-0
                border-b
                border-[#D4A72C]/50
                bg-transparent
                px-0
                py-1
                font-serif
                text-lg
                text-[#2B2618]
                outline-none
                placeholder:text-[#B8A979]
                focus:border-[#D4A72C]
              "
            />
          </div>

          {/* Message */}
          <div className="mb-10">

            <label className="
              mb-2
              block
              font-serif
              text-lg
              text-[#2B2618]
            ">
              Dear love,
            </label>

            <textarea
              value={note.content}
              placeholder="Write something from your heart..."
              onChange={(e) =>
                setNote(prev => ({
                  ...prev,
                  content: e.target.value
                }))
              }
              className="
                min-h-70 w-full overflow-y-auto
                overflow-hidden
                bg-[#FFFDF5] font-serif
                text-[16px] leading-8.25
                text-[#2B2618] rounded-xl
                border border-[#D4A72C]/40
                p-4 shadow-[inset_0_1px_4px_rgba(212,167,44,0.08)]
                outline-none transition-all duration-200
                placeholder:text-[#B8A979]
                focus:border-[#D4A72C]
                focus:ring-2 focus:ring-[#D4A72C]/15
              "
            />

          </div>

          {/* Delivery section */}
          <div className="
            relative
            overflow-hidden
            rounded-2xl
            border border-[#D4A72C]/25
            bg-linear-to-br
            from-[#FFFDF5]
            to-[#FFF8DF]
            p-5
            shadow-sm
          ">

            {/* Decorative heart */}
            <Heart
              size={90}
              className="
                pointer-events-none
                absolute
                -right-5
                -top-5
                rotate-12
                text-[#D4A72C]/10
              "
              fill="currentColor"
            />

            {/* Header */}
            <div className="
              relative
              mb-5
              flex
              items-start
              gap-3
            ">
              <div className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-[#D4A72C]/15
                text-[#B18A1E]
              ">
                <Heart
                  size={19}
                  fill="currentColor"
                />
              </div>

              <div>
                <h3 className="
                  font-serif
                  text-lg
                  font-semibold
                  tracking-tight
                  text-[#2B2618]
                ">
                  A note for later
                </h3>

                <p className="
                  mt-1
                  text-xs
                  leading-relaxed
                  text-[#8B7A45]
                ">
                  A little message, waiting for the perfect day.
                </p>
              </div>
            </div>

            {/* Date picker */}
            <div className="relative">
              <label
                htmlFor="note-date"
                className="
                  mb-2
                  flex
                  items-center
                  gap-2
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-[#8B7A45]
                "
              >
                <CalendarDays size={14} />
                Delivery date
              </label>

              <div className="
                flex
                items-center
                gap-3
                rounded-xl
                border
                border-[#D4A72C]/35
                bg-white/80
                px-3
                transition-colors
                focus-within:border-[#D4A72C]
                focus-within:ring-2
                focus-within:ring-[#D4A72C]/15
              ">
                <CalendarDays
                  size={19}
                  className="shrink-0 text-[#D4A72C]"
                />

                <input
                  id="note-date"
                  type="date"
                  min={today}
                  value={note.date}
                  onChange={(e) =>
                    setNote((prev) => ({
                      ...prev,
                      date: e.target.value,
                    }))
                  }
                  className="
                    min-w-0
                    w-full
                    cursor-pointer
                    bg-transparent
                    py-3
                    text-sm
                    font-medium
                    text-[#2B2618]
                    outline-none
                  "
                />
              </div>

              <p className="
                mt-2
                flex
                items-center
                gap-1.5
                text-[11px]
                leading-relaxed
                text-[#8B7A45]
              ">
                <Heart
                  size={11}
                  fill="currentColor"
                  className="shrink-0 text-[#D4A72C]"
                />
                This note will be waiting for your special someone.
              </p>
            </div>

          </div>


          {/* Footer */}
          <div className="
            mt-8
            flex
            items-center
            justify-between
            gap-4
          ">

            <div className="
              flex
              items-center
              gap-1.5
              text-xs
              text-[#8B7A45]
            ">

              <Heart
                size={12}
                fill="currentColor"
                className="text-[#D4A72C]"
              />

              <span>
                For your favorite person
              </span>

            </div>

            <button
              onClick={handleCreateNote}
              className="
                flex
                items-center
                gap-2
                rounded-xl
                bg-[#D4A72C]
                px-5
                py-2.5
                text-sm
                font-semibold
                text-white
                shadow-sm
                transition
                hover:bg-[#C29624]
                hover:shadow-md
                active:scale-95
              "
            >
              <Send size={15} />

              Leave Note
            </button>

          </div>

        </div>

      </div>

    </div>
  )
}

export default CreateNoteOverlay