import { useEffect, useState } from "react"
import type { AlbumsType, EditAlbumType, Props } from ".."
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

  const updateAlbum = async ({
    _id,
    name,
    cover,
    description,
  }: EditAlbumType) => {
    setIsLoading(true);

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description ?? "");

      if (cover instanceof File) {
        formData.append("cover", cover);
      } else if (!cover) {
        formData.append("cover", 'remove');
      }

      const res = await baseUrl.patch(
        `/gallery/update-album/${_id}`,
        formData
      );

      toast.success(res.data.message);

      setAlbums((prev) =>
        prev.map((album) =>
          album._id === _id
            ? {
                ...album,
                name,
                cover: res.data.album.cover ?? album.cover,
                description:
                  res.data.album.description ?? album.description,
              }
            : album
        )
      );
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        toast.error(
          err.response?.data?.message ||
            "Failed to update album. Something went wrong."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

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
      updateAlbum, deleteMedia
    }}>
      {children}
    </AlbumContext.Provider>
  )
}

export default AlbumProvider
