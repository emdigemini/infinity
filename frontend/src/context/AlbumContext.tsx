import { createContext, useContext } from "react";
import type { AlbumsType } from "..";

type AlbumContextType = {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  albums: AlbumsType[] | [];
  setAlbums: React.Dispatch<React.SetStateAction<[] | AlbumsType[]>>;
  fetchAlbums: () => Promise<void>;
} 

export const AlbumContext = createContext<AlbumContextType | null>(null);

export const useAlbumContext = () => {
  const context = useContext(AlbumContext);

  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}