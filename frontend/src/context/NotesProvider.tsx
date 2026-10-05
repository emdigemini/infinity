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
        const res = await baseUrl.get('/notes/read-note');
        console.log(res.data)
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
    <NotesContext.Provider value={{ isLoading, setIsLoading, notes, setNotes, notesToRead }}>
      {children}
    </NotesContext.Provider>
  )
}

export default NotesProvider
