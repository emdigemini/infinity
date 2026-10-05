import { Link, useLocation } from "react-router-dom";
import { InfinityIcon, BookImage, ScrollText } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import { useAlbumContext } from "../context/AlbumContext";
import { useNotesContext } from "../context/NotesContext";



const Fab = () => {
  const { albums } = useAlbumContext();
  const { notes } = useNotesContext();
  const [open, setOpen] = useState(false);

  const albumCount = albums?.length;
  const noteCount = notes?.length > 9 ? "9+" : notes?.length;

  const fablists = [
    { id: 1, icon: <BookImage />, name: `Gallery (${albumCount})`,  path: '/gallery' },
    { id: 2, icon: <ScrollText />, name: `Notes (${noteCount})`, path: '/notes' },
    // { id: 3, icon: <ListMusic />, name: 'Music (2)',  path: '/music' },
  ]

  return (
    <div
      className={`
        fixed bottom-16 right-2 z-999
        flex flex-col items-end gap-4
        cursor-pointer transition-all duration-200
      `}
    >
      <AnimatePresence>
        {open &&
          <>
            {fablists.toReversed().map((list, index) => (
              <FabList
                key={list.id}
                icon={list.icon}
                name={list.name}
                index={index + 1}
                path={list.path}
              />
            ))}
          </>}
      </AnimatePresence>
      <button
        className={`
          rounded-full bg-[#e0d902]
          border-2 border-white
          h-14 w-14 flex
          items-center justify-center
          shadow-[0_6px_20px_rgba(0,0,0,0.18)]
          transition-all duration-200
          hover:scale-110 active:scale-95
          ${open ? 'rotate-270' : 'rotate-0'}
        `}
        onClick={() => setOpen(prev => !prev)}
      >
        <InfinityIcon
          size={24}
          strokeWidth={2.5}
          className="text-white"
        />
      </button>
    </div>
  )
}

const FabList = ({ icon, name, index, path }: { icon: ReactNode, name: string, index: number, path: string }) => {
  const openDelay = (2 - index) * 0.1;
  const closeDelay = (index - 2) * 0.1;
  const navOpen = useLocation().pathname === path;

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 40,
        scale: 0.95,
      }}
      animate={{
        opacity: 1,
        x: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        x: 40,
        scale: 0.95,
        transition: {
          delay: closeDelay,
          duration: 0.3,
          ease: "easeIn",
        },
      }}
      transition={{
        delay: openDelay,
        duration: 0.3,
        ease: "easeOut",
      }}
      className={`
        flex items-center gap-2
        rounded-2xl
        px-4 py-2.5
        text-sm font-semibold
        transition-all duration-200
        ${
          navOpen
            ? "bg-[#D4CC00] text-black shadow-[0_5px_18px_rgba(0,0,0,0.25)] scale-[1.02]"
            : "bg-[#FFF700] text-black shadow-[0_4px_14px_rgba(0,0,0,0.18)] ring-1 ring-black/10"
        }
      `}
    >
      <Link 
        to={path}
        className="flex items-center gap-1.5"
      >
        {icon}
        {name}
      </Link>
    </motion.div>
  )
}

export default Fab
