import { MusicContext } from "./MusicContext"
import { useState } from "react"
import type { Props, MusicType } from ".."

const MusicProvider = ({ children }: Props) => {
  const [ spotifyAccount, setSpotifyAccount] = useState<MusicType | null>(null);

  return (
    <MusicContext.Provider value={{
      spotifyAccount, setSpotifyAccount
    }}>
      {children}
    </MusicContext.Provider>
  )
}

export default MusicProvider
