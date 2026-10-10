import type { NotesType, Props } from ".."
import baseUrl from "../axios";
import { useAuthContext } from "./AuthContext";
import { NotesContext } from "./NotesContext"
import { useEffect, useState } from "react"
  

const NotesProvider = ({ children }: Props) => {
  const { user } = useAuthContext();
  const [ isLoading, setIsLoading ] = useState(false);
  const [ notes, setNotes ] = useState<NotesType[] | []>([]);
  const [notesToRead, setNotesToRead] = useState<NotesType[] | []>([]);

  const updateReadNote = async ({ noteId, id }: { noteId: string, id: string }) => {
    try {
      await baseUrl.patch("/notes/read-note", null, {
        params: {
          noteId,
          id,
        },
      });

    } catch (err: unknown) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (!user) return;

    const fetchNotes = async () => {
      setIsLoading(true);
      try {
        const res = await baseUrl.get("/notes/fetch-notes");
        setNotes(res.data.notes);
      } catch (err: unknown) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    const fetchNoteToRead = async () => {
      setIsLoading(true);
      try {
        const res = await baseUrl.get('/notes/get-note-to-read');
        if (!res.data || !res.data.notesToRead || res.data.notesToRead.length === 0) {
          setNotesToRead([]);
          return;
        }
        setNotesToRead(res.data.notesToRead);
      } catch (err: unknown) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchNotes();
    fetchNoteToRead();
  }, [user]);

  return (
    <NotesContext.Provider value={{
      isLoading, setIsLoading, notes,
      setNotes, notesToRead, updateReadNote
    }}>
      {children}
    </NotesContext.Provider>
  )
}

export default NotesProvider
