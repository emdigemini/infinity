import Fab from "./Fab";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InfinityIcon, House, ArrowLeftToLine, BookHeart } from "lucide-react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import LoginOverlay from "./auth/LoginOverlay";
import { useNotesContext } from "../context/NotesContext";
import NoteViewer from "./notes/NoteViewer";

const AppLayout = () => {
  const {
    user,
    isAuthenticated,
    isAppLoaded,
    isServerLoaded,
    setIsAppLoaded,
  } = useAuthContext();

  const { notesToRead, updateReadNote } = useNotesContext();

  const [touch, setTouch] = useState(false);

  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  const isHome = pathname.split("/").filter(Boolean).length === 1;

  const [noteIndex, setNoteIndex] = useState<number | null>(0);

  const currentNote = notesToRead[noteIndex!];

  const handleCloseNote = (noteId: string) => {
    if (!user) return;
    if (noteIndex! < notesToRead.length - 1) {
      setNoteIndex((prev) => prev! + 1);
    } else {
      setNoteIndex(null);
    }
    updateReadNote({ noteId, id: user.id });
  };

  useEffect(() => {
    if (isServerLoaded) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTouch(true);
    } else {
      setTouch(false);
    }
  }, [isServerLoaded]);

  return (
    <div className="min-h-screen bg-white">
      {isAppLoaded && <Fab />}

      {!isAuthenticated && !user && <LoginOverlay />}

      <AnimatePresence mode="wait">
        {isAppLoaded &&
          notesToRead.filter((note) => !note.isRead).length > 0 &&
          currentNote &&
          !currentNote.isRead && (
            <NoteViewer
              key={currentNote._id}
              note={currentNote}
              onClose={handleCloseNote}
            />
          )}
      </AnimatePresence>

      {/* Splash / Navbar */}
      <motion.div
        onClick={() => {
          if (!isServerLoaded || !touch) return;

          setIsAppLoaded(true);
        }}
        animate={{
          height: isAppLoaded ? "72px" : "100vh",
          borderRadius: isAppLoaded
            ? "0px 0px 32px 32px"
            : "0px",
        }}
        transition={{
          duration: 0.8,
          ease: [0.76, 0, 0.24, 1],
        }}
        className={`
          shadow-[0_4px_12px_rgba(0,0,0,0.25)]
          fixed top-0 left-0 z-50 w-full
          overflow-hidden
          transition-all ease-in-out
          text-white
          ${!isAppLoaded
            ? "cursor-pointer bg-[#D4A72C]"
            : "bg-[#D4A72C]"
          }
        `}
      >
        <AnimatePresence mode="wait">
          {!isAppLoaded ? (
            <motion.div
              key="splash"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-screen flex flex-col items-center justify-center"
            >
              {/* Infinity */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={
                  isServerLoaded
                    ? {
                        duration: 0.5,
                        ease: "easeOut",
                      }
                    : {
                        duration: 2,
                        ease: "linear",
                        repeat: Infinity,
                      }
                }
              >
                <InfinityIcon
                  size={128}
                  strokeWidth={2.5}
                  color="#FFFFFF"
                />
              </motion.div>

              {/* Status */}
              <AnimatePresence mode="wait">
                {!isServerLoaded ? (
                  <motion.p
                    key="loading"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 text-sm text-white animate-pulse"
                  >
                    Loading, please wait...
                  </motion.p>
                ) : (
                  <motion.p
                    key="touch"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 text-sm text-white animate-pulse"
                  >
                    Touch anywhere.
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            user && (
              <motion.nav
                key="navbar"
                initial={{
                  opacity: 0,
                  y: -20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.4,
                  duration: 0.4,
                }}
                className="h-18 px-6 flex items-center justify-between"
              >
                <div className="h-6 w-6">
                  {pathname !== "/" &&
                    (isHome ? (
                      <Link to="/">
                        <House size={18} />
                      </Link>
                    ) : (
                      <button onClick={() => navigate(-1)}>
                        <ArrowLeftToLine size={18} />
                      </button>
                    ))}
                </div>

                <div className="flex flex-col justify-center items-center">
                  <span className="font-semibold">
                    {user.name}{" "}
                    <span className="text-white">♥</span>{" "}
                    {user.relationship?.name ?? "?"}
                  </span>

                  <span className="text-xs text-white">
                    09.08.26 ♡
                  </span>
                </div>

                <button className="relative rounded-xl bg-[#FFF7CC] p-2 text-[#8B7A45] transition hover:bg-[#F5E8A8] active:scale-95">
                  <span className="absolute -right-1 -top-1 rounded-full bg-[#D4A72C] px-1.5 text-[10px] font-bold text-white">
                    {notesToRead.length}
                  </span>
                  <BookHeart size={18} />
                </button>
              </motion.nav>
            )
          )}
        </AnimatePresence>
      </motion.div>

      <main className="pt-23 px-6">
        {isAppLoaded && <Outlet />}
      </main>
    </div>
  );
};

export default AppLayout;