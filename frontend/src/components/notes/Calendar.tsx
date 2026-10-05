import { useState } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Heart
} from 'lucide-react'
import { useNotesContext } from '../../context/NotesContext'
import NoteList from './NoteList'
import { formatDate, formatTime } from '../../utils'
import type { NotesType } from '../..'

const Calendar = ({ setShowDeleteOverlay, setSelectedNote, selectedNote }: { setShowDeleteOverlay: (note: NotesType) => void; setSelectedNote: (note: NotesType) => void; selectedNote: NotesType | null }) => {
  const { notes } = useNotesContext();
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const daysInMonth = new Date(
    year,
    month + 1,
    0
  ).getDate()

  const firstDayOfMonth = new Date(
    year,
    month,
    1
  ).getDay()

  const monthName = currentDate.toLocaleString(
    'default',
    {
      month: 'long'
    }
  )

  const selectedDateString = formatDate(selectedDate)

  const selectedNotes = notes.filter(
    note => note.date.split('T')[0] === selectedDateString
  )

  const previousMonth = () => {
    setCurrentDate(
      new Date(year, month - 1, 1)
    )
  }

  const nextMonth = () => {
    setCurrentDate(
      new Date(year, month + 1, 1)
    )
  }

  const goToToday = () => {
    const today = new Date()

    setCurrentDate(today)
    setSelectedDate(today)
  }

  const isSelected = (day: number) => {
    return (
      selectedDate.getFullYear() === year &&
      selectedDate.getMonth() === month &&
      selectedDate.getDate() === day
    )
  }

  const hasNotes = (day: number) => {
    const date = new Date(year, month, day)

    return notes.some(
      note => note.date.split('T')[0] === formatDate(date)
    )
  }

  return (
    <div className="w-full max-w-3xl overflow-hidden rounded-4xl border border-[#E8D9A5] bg-[#FFFDF5] shadow-sm">

      {/* Header */}
      <div className="bg-[#D4A72C] px-6 py-6 sm:px-8">

        <div className="flex items-center justify-between">

          {/* Previous Month */}
          <button
            onClick={previousMonth}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-[#2B2618] transition hover:bg-white"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Month */}
          <div className="text-center">

            <div className="mb-1 flex items-center justify-center gap-2">

              <Heart
                size={15}
                fill="currentColor"
                className="text-white"
              />

              <h2 className="text-lg font-bold text-white">
                {monthName} {year}
              </h2>

              <Heart
                size={15}
                fill="currentColor"
                className="text-white"
              />

            </div>

            {/* Today */}
            <button
              onClick={goToToday}
              className="
                text-xs font-semibold text-white/80 
                transition hover:text-white border border-white/30 px-2 py-1 rounded-lg
              "
            >
              Today
            </button>

          </div>

          {/* Next Month */}
          <button
            onClick={nextMonth}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-[#2B2618] transition hover:bg-white"
          >
            <ChevronRight size={20} />
          </button>

        </div>

      </div>

      {/* Calendar */}
      <div className="px-5 py-6 sm:px-8">

        {/* Weekdays */}
        <div className="mb-3 grid grid-cols-7 text-center">

          {[
            'Sun',
            'Mon',
            'Tue',
            'Wed',
            'Thu',
            'Fri',
            'Sat'
          ].map(day => (
            <div
              key={day}
              className="text-xs font-bold text-[#8B7A45]"
            >
              {day}
            </div>
          ))}

        </div>

        {/* Days */}
        <div className="grid grid-cols-7 gap-1.5">

          {/* Empty spaces */}
          {Array.from({
            length: firstDayOfMonth
          }).map((_, index) => (
            <div key={`empty-${index}`} />
          ))}

          {/* Days */}
          {Array.from(
            { length: daysInMonth },
            (_, index) => {

              const day = index + 1

              return (
                <button
                  key={day}
                  onClick={() =>
                    setSelectedDate(
                      new Date(year, month, day)
                    )
                  }
                  className={`
                    relative flex h-11 items-center
                    justify-center rounded-2xl
                    text-sm font-medium transition

                    ${
                      isSelected(day)
                        ? 'bg-[#D4A72C] text-white shadow-sm'
                        : 'text-[#2B2618] hover:bg-[#F9F1D0]'
                    }
                  `}
                >

                  {day}

                  {/* Task Indicator */}
                  {hasNotes(day) && (
                    <Heart
                      size={9}
                      fill="currentColor"
                      className={`
                        absolute bottom-1

                        ${
                          isSelected(day)
                            ? 'text-white'
                            : 'text-[#D4A72C]'
                        }
                      `}
                    />
                  )}

                </button>
              )
            }
          )}

        </div>

      </div>

      {/* Schedule */}
      <div className="border-t border-[#E8D9A5] bg-white px-6 py-6 sm:px-8">

        {/* Schedule Header */}
        <div className="mb-5 flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D4A72C]">

            <Heart
              size={18}
              fill="currentColor"
              className="text-white"
            />

          </div>

          <div>

            <p className="text-sm font-bold text-[#2B2618]">
              Your Notes
            </p>

            <p className="text-xs text-[#8B7A45]">
              {selectedDate.toLocaleDateString(
                'default',
                {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                }
              )}
            </p>

          </div>

        </div>

        {/* No Tasks */}
        {selectedNotes.length === 0 ? (

          <div className="rounded-2xl bg-[#F9F1D0] px-5 py-8 text-center">

            <Heart
              size={22}
              className="mx-auto mb-2 text-[#D4A72C]"
              fill="currentColor"
            />

            <p className="text-sm text-[#8B7A45]">
              No notes for this day.
            </p>

          </div>

        ) : (

          /* Tasks */
          
          <NoteList
            selectedNotes={selectedNotes}
            selectedNote={selectedNote}
            formatTime={formatTime}
            setShowDeleteOverlay={setShowDeleteOverlay}
            setSelectedNote={setSelectedNote}
          />
        )}

      </div>

    </div>
  )
}

export default Calendar