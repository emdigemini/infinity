import { useEffect, useState } from "react"
import type { AlbumsType, Props } from ".."
import { AlbumContext } from "./AlbumContext"
import baseUrl from "../axios.js";
import { useAuthContext } from "./AuthContext.js";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";

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

  const deleteMedia = async (id: string) => {
    setIsLoading(true);
    try {
      const res = await baseUrl.delete(`/gallery/delete-media/${id}`);
      toast.success(res.data.message);
      setAlbums(prev =>
        prev.map(album => ({
          ...album,
          media: album.media.filter(item => item._id !== id),
        }))
      );
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        toast.error(err?.response?.data?.message || 'Something went wrong.');
      }
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
      isLoading, setIsLoading, albums, setAlbums, fetchAlbums,
      deleteMedia
    }}>
      {children}
    </AlbumContext.Provider>
  )
}

export default AlbumProvider
