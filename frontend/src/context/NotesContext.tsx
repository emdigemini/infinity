import { createContext, useContext } from "react";
import type { NotesType } from "..";

type NotesContextType = {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  notes: NotesType[] | [];
  setNotes: React.Dispatch<React.SetStateAction<NotesType[] | []>>;
  notesToRead: NotesType[] | [];
}

export const NotesContext = createContext<NotesContextType | null>(null);

export const useNotesContext = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotesContext must be used within a NotesProvider");
  }
  return context;
}