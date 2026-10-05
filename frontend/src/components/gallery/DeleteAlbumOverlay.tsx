import { Heart, Trash2 } from "lucide-react";
import { useAlbumContext } from "../../context/AlbumContext";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import baseUrl from "../../axios";
import IsLoading from "../IsLoading";

const DeleteAlbumOverlay = ({
  onClose,
  name,
  id
}: {
  onClose: () => void;
  name: string;
  id: string;
}) => {
  const {
    albums,
    isLoading,
    setIsLoading,
    setAlbums
  } = useAlbumContext();

  const handleDelete = async () => {
    setIsLoading(true);

    try {
      const res = await baseUrl.delete(
        `/gallery/delete-album/${id}`
      );

      const newAlbum = albums.filter(
        album => album._id !== id
      );

      toast.success(res.data.message);
      setAlbums(newAlbum);

    } catch (err: unknown) {

      if (isAxiosError(err)) {
        toast.error(
          err?.response?.data?.message ||
          "Something went wrong."
        );
      }

    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <>
      {isLoading && (
        <IsLoading
          loadingMessage="Deleting album"
        />
      )}

      {/* Overlay */}
      <div
        className="
          fixed inset-0 z-50
          flex items-center justify-center
          bg-black/45 px-4 backdrop-blur-[2px]
        "
      >

        {/* Modal */}
        <div
          className="
            relative w-full max-w-sm
            overflow-hidden rounded-3xl
            border border-[#E8D9A5]
            bg-[#FFFDF5]
            shadow-[0_25px_70px_rgba(0,0,0,0.2)]
          "
        >

          {/* Top Accent */}
          <div
            className="
              h-2 w-full
              bg-[#D4A72C]
            "
          />

          {/* Content */}
          <div
            className="
              p-6
              sm:p-7
            "
          >

            {/* Icon */}
            <div
              className="
                mb-5 flex h-12 w-12
                items-center justify-center
                rounded-2xl
                bg-[#F9F1D0]
              "
            >
              <Trash2
                size={20}
                strokeWidth={2}
                className="text-[#D4A72C]"
              />
            </div>

            {/* Heading */}
            <div
              className="
                flex items-center gap-2
              "
            >
              <h2
                className="
                  text-lg font-bold
                  text-[#2B2618]
                "
              >
                Delete this album?
              </h2>

              <Heart
                size={14}
                fill="currentColor"
                className="text-[#D4A72C]"
              />
            </div>

            {/* Description */}
            <p
              className="
                mt-2 text-sm
                leading-6 text-[#8B7A45]
              "
            >
              Are you sure you want to delete{" "}
              <span
                className="
                  font-semibold text-[#2B2618]
                "
              >
                {name}
              </span>
              ? All the memories inside this
              album will be removed.
            </p>

            {/* Warning */}
            <div
              className="
                mt-5 rounded-xl
                border border-[#E8D9A5]
                bg-[#F9F1D0]/60
                px-4 py-3
              "
            >
              <div
                className="
                  flex items-start gap-2
                "
              >

                <Heart
                  size={14}
                  fill="currentColor"
                  className="
                    mt-0.5 shrink-0
                    text-[#D4A72C]
                  "
                />

                <p
                  className="
                    text-xs leading-5
                    text-[#8B7A45]
                  "
                >
                  This action cannot be undone.
                  Make sure you really want to
                  let these memories go.
                </p>

              </div>
            </div>

            {/* Actions */}
            <div
              className="
                mt-6 flex gap-3
              "
            >

              {/* Cancel */}
              <button
                type="button"
                onClick={onClose}
                className="
                  flex-1 rounded-xl
                  border border-[#E8D9A5]
                  bg-white px-4 py-3
                  text-sm font-semibold
                  text-[#8B7A45]
                  transition-all duration-200
                  hover:bg-[#F9F1D0]
                  hover:text-[#2B2618]
                  active:scale-[0.98]
                "
              >
                Keep Album
              </button>

              {/* Delete */}
              <button
                type="button"
                onClick={handleDelete}
                disabled={isLoading}
                className="
                  flex-1 rounded-xl
                  bg-[#D4A72C] px-4 py-3
                  text-sm font-semibold
                  text-white shadow-sm
                  transition-all duration-200
                  hover:bg-[#C29624]
                  hover:shadow-md
                  active:scale-[0.98]
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                Delete Album
              </button>

            </div>

          </div>

        </div>

      </div>
    </>
  );
};

export default DeleteAlbumOverlay;