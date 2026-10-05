import { useEffect, useState } from "react"
import type { AlbumsType, Props } from ".."
import { AlbumContext } from "./AlbumContext"
import baseUrl from "../axios.js";
import { useAuthContext } from "./AuthContext.js";

const AlbumProvider = ({ children }: Props) => {
  const { user } = useAuthContext();
  const [ isLoading, setIsLoading ] = useState(false);
  const [ albums, setAlbums ] = useState<AlbumsType[] | []>([]);

  const fetchAlbums = async () => {
    setIsLoading(true);
    try {
      const res = await baseUrl.get('/gallery/fetch-album');
      setAlbums(res.data.albums);
    } catch (err: unknown) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!user) return;
    const handleFetchAlbums = () => {
      fetchAlbums();
    }
    handleFetchAlbums();
  }, [user]); 

  return (
    <AlbumContext.Provider value={{
      isLoading, setIsLoading, albums, setAlbums, fetchAlbums
    }}>
      {children}
    </AlbumContext.Provider>
  )
}

export default AlbumProvider
