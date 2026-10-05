import { createContext, useContext } from "react";
import type { MusicType } from "..";

type MusicContextType = {
  spotifyAccount: MusicType | null;
  setSpotifyAccount: React.Dispatch<React.SetStateAction<MusicType | null>>;
}

export const MusicContext = createContext<MusicContextType | null>(null);

export const useMusicContext = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusicContext must be used within a MusicProvider");
  }
  return context;
}