import { useEffect, useRef, useState } from "react";
import {
  X,
  Plus,
  ImagePlus,
  Heart,
  Trash2,
  Images,
} from "lucide-react";
import baseUrl from "../../axios";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";
import { useAlbumContext } from "../../context/AlbumContext";
import IsLoading from "../IsLoading";

const NewAlbumOverlay = ({
  onClose,
}: {
  onClose: () => void;
}) => {
  const { isLoading, setIsLoading, setAlbums } = useAlbumContext();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [media, setMedia] = useState<File[]>([]);
  const [albumName, setAlbumName] = useState("");
  const [description, setDescription] = useState("");

  const handleAddPhotos = () => {
    fileInputRef.current?.click();
  };

  const handleCreateAlbum = async () => {
    if (!albumName.trim()) {
      toast.error("Please enter an album name.");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();

      formData.append("name", albumName);
      formData.append("description", description);

      media.forEach((file) => {
        formData.append("media", file);
      });

      const res = await baseUrl.post(
        "/gallery/new-album",
        formData
      );

      setAlbums((prev) => [
        res.data.albums,
        ...prev,
      ]);

      toast.success(res.data.message);

      onClose();
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        toast.error(
          err.response?.data?.message ||
          "Something went wrong."
        );
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log(media);
  }, [media]);

  return (
    <>
      {/* Loading */}
      {isLoading && (
        <IsLoading
          loadingMessage="Creating your album"
        />
      )}

      {/* Overlay */}
      <div
        className="
          fixed inset-0 z-50 flex items-center justify-center
          bg-black/45 px-4 py-5 backdrop-blur-[2px]
        "
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >

        {/* Modal */}
        <div
          className="
            relative flex max-h-[92vh] w-full max-w-lg
            flex-col overflow-hidden rounded-3xl
            border border-[#E8D9A5] bg-[#FFFDF5]
            shadow-[0_25px_70px_rgba(0,0,0,0.2)]
          "
        >

          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            className="
              absolute right-5 top-5 z-10
              flex h-9 w-9
              items-center justify-center
              rounded-full
              border border-[#E8D9A5]
              bg-[#FFFDF5]
              text-[#8B7A45]
              shadow-sm
              transition-all
              duration-200
              hover:bg-[#F9F1D0]
              hover:text-[#2B2618]
              active:scale-95
            "
          >
            <X size={17} />
          </button>

          {/* Scrollable Content */}
          <div className="overflow-y-auto">

            <div className="p-6 sm:p-7">

              {/* Header */}
              <div className="mb-6 pr-10">

                <div className="
                  mb-2
                  flex
                  items-center
                  gap-2
                ">

                  <div className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#F9F1D0]
                    text-[#D4A72C]
                  ">
                    <Images
                      size={20}
                      strokeWidth={2}
                    />
                  </div>

                  <div>

                    <div className="
                      flex
                      items-center
                      gap-1.5
                    ">

                      <h2 className="
                        text-xl
                        font-bold
                        text-[#2B2618]
                      ">
                        Create a New Album
                      </h2>

                      <Heart
                        size={14}
                        fill="currentColor"
                        className="text-[#D4A72C]"
                      />

                    </div>

                    <p className="
                      mt-0.5
                      text-xs
                      text-[#8B7A45]
                    ">
                      Keep your favorite moments together.
                    </p>

                  </div>

                </div>

              </div>

              {/* Album Name */}
              <div className="mb-5">

                <div className="
                  mb-2
                  flex
                  items-center
                  justify-between
                ">

                  <label className="
                    text-sm
                    font-semibold
                    text-[#2B2618]
                  ">
                    Album Name
                  </label>

                  <span className="
                    text-[11px]
                    text-[#B8A979]
                  ">
                    Required
                  </span>

                </div>

                <input
                  type="text"
                  value={albumName}
                  placeholder="e.g. Our Little Moments"
                  onChange={(e) =>
                    setAlbumName(e.target.value)
                  }
                  className="
                    w-full
                    rounded-xl
                    border border-[#E8D9A5]
                    bg-white
                    px-4 py-3
                    text-sm
                    text-[#2B2618]
                    outline-none
                    transition-all
                    duration-200
                    placeholder:text-[#B8A979]
                    focus:border-[#D4A72C]
                    focus:ring-2
                    focus:ring-[#D4A72C]/15
                  "
                />

              </div>

              {/* Description */}
              <div className="mb-6">

                <div className="
                  mb-2
                  flex
                  items-center
                  justify-between
                ">

                  <label className="
                    text-sm
                    font-semibold
                    text-[#2B2618]
                  ">
                    Description
                  </label>

                  <span className="
                    text-[11px]
                    text-[#B8A979]
                  ">
                    Optional
                  </span>

                </div>

                <textarea
                  rows={3}
                  value={description}
                  placeholder="Tell a little something about this album..."
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                  className="
                    w-full
                    resize-none
                    rounded-xl
                    border border-[#E8D9A5]
                    bg-white
                    px-4 py-3
                    text-sm
                    leading-6
                    text-[#2B2618]
                    outline-none
                    transition-all
                    duration-200
                    placeholder:text-[#B8A979]
                    focus:border-[#D4A72C]
                    focus:ring-2
                    focus:ring-[#D4A72C]/15
                  "
                />

              </div>

              {/* Media Section */}
              <div>

                <div className="
                  mb-3
                  flex
                  items-center
                  justify-between
                ">

                  <div>

                    <div className="
                      flex
                      items-center
                      gap-2
                    ">

                      <p className="
                        text-sm
                        font-semibold
                        text-[#2B2618]
                      ">
                        Memories
                      </p>

                      {media.length > 0 && (
                        <span className="
                          rounded-full
                          bg-[#F9F1D0]
                          px-2
                          py-0.5
                          text-[10px]
                          font-semibold
                          text-[#8B7A45]
                        ">
                          {media.length}
                        </span>
                      )}

                    </div>

                    <p className="
                      mt-0.5
                      text-[11px]
                      text-[#B8A979]
                    ">
                      Add photos or videos to your album. <br /> (maximum of 10 MB each)
                    </p>

                  </div>

                  <button
                    type="button"
                    onClick={handleAddPhotos}
                    className="
                      flex
                      items-center
                      gap-1.5
                      rounded-xl
                      bg-[#D4A72C]
                      px-3
                      py-2
                      text-xs
                      font-semibold
                      text-white
                      shadow-sm
                      transition-all
                      duration-200
                      hover:bg-[#C29624]
                      hover:shadow-md
                      active:scale-95
                    "
                  >
                    <Plus
                      size={14}
                      strokeWidth={2.5}
                    />

                    Add
                  </button>

                </div>

                {/* Hidden File Input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    const files = e.target.files;

                    if (!files) return;

                    const selectedFiles =
                      Array.from(files).filter(
                        (file) =>
                          file.type.startsWith("image/") ||
                          file.type.startsWith("video/")
                      );

                    const isSizeTooLarge =
                      selectedFiles.some(
                        (file) =>
                          file.size >
                          10 * 1024 * 1024
                      );

                    if (isSizeTooLarge) {
                      toast.error(
                        "Some files are too large. Each file must be 10 MB or smaller."
                      );

                      e.target.value = "";
                      return;
                    }

                    setMedia((prev) => [
                      ...prev,
                      ...selectedFiles,
                    ]);

                    e.target.value = "";
                  }}
                />

                {/* Media Container */}
                <div className="
                  rounded-2xl
                  border border-[#E8D9A5]
                  bg-[#F9F1D0]/40
                  p-3
                ">

                  {media.length === 0 ? (

                    /* Empty State */
                    <button
                      type="button"
                      onClick={handleAddPhotos}
                      className="
                        flex
                        min-h-32
                        w-full
                        flex-col
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-dashed
                        border-[#D4A72C]/50
                        bg-[#FFFDF5]
                        text-center
                        transition-all
                        duration-200
                        hover:border-[#D4A72C]
                        hover:bg-[#FFF8DC]
                      "
                    >

                      <div className="
                        mb-2
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        bg-[#F9F1D0]
                        text-[#D4A72C]
                      ">
                        <ImagePlus size={19} />
                      </div>

                      <p className="
                        text-sm
                        font-semibold
                        text-[#2B2618]
                      ">
                        Add your memories
                      </p>

                      <p className="
                        mt-1
                        text-[11px]
                        text-[#B8A979]
                      ">
                        Photos and videos up to 10 MB each
                      </p>

                    </button>

                  ) : (

                    /* Media Preview */
                    <div className="
                      flex
                      gap-2.5
                      overflow-x-auto
                      pb-1
                      scrollbar-hide
                    ">

                      {media.map((file, index) => {

                        const previewUrl =
                          URL.createObjectURL(file);

                        const isVideo =
                          file.type.startsWith("video/");

                        return (
                          <div
                            key={`${file.name}-${index}`}
                            className="
                              group
                              relative
                              h-28
                              w-28
                              shrink-0
                              overflow-hidden
                              rounded-xl
                              border
                              border-[#E8D9A5]
                              bg-[#FFFDF5]
                              shadow-sm
                            "
                          >

                            {isVideo ? (

                              <video
                                src={previewUrl}
                                className="
                                  h-full
                                  w-full
                                  object-cover
                                "
                                muted
                                playsInline
                                preload="metadata"
                              />

                            ) : (

                              <img
                                src={previewUrl}
                                alt={file.name}
                                className="
                                  h-full
                                  w-full
                                  object-cover
                                  transition-transform
                                  duration-300
                                  group-hover:scale-105
                                "
                              />

                            )}

                            {/* Overlay */}
                            <div className="
                              absolute
                              inset-0
                              bg-linear-to-t
                              from-black/40
                              via-transparent
                              to-transparent
                              opacity-0
                              transition-opacity
                              duration-200
                              group-hover:opacity-100
                            " />

                            {/* Remove */}
                            <button
                              type="button"
                              onClick={() => {
                                setMedia((prev) =>
                                  prev.filter(
                                    (_, i) =>
                                      i !== index
                                  )
                                );
                              }}
                              className="
                                absolute
                                right-1.5
                                top-1.5
                                flex
                                h-6
                                w-6
                                items-center
                                justify-center
                                rounded-full
                                bg-black/55
                                text-white
                                opacity-0
                                backdrop-blur-sm
                                transition-all
                                duration-200
                                group-hover:opacity-100
                                hover:bg-red-500
                                active:scale-90
                              "
                              title="Remove"
                            >
                              <Trash2 size={12} />
                            </button>

                            {/* Video Badge */}
                            {isVideo && (
                              <div className="
                                absolute
                                bottom-1.5
                                left-1.5
                                rounded-md
                                bg-black/55
                                px-1.5
                                py-0.5
                                text-[9px]
                                font-semibold
                                tracking-wide
                                text-white
                                backdrop-blur-sm
                              ">
                                VIDEO
                              </div>
                            )}

                          </div>
                        );
                      })}

                      {/* Add More */}
                      <button
                        type="button"
                        onClick={handleAddPhotos}
                        className="
                          flex
                          h-28
                          w-28
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl
                          border
                          border-dashed
                          border-[#D4A72C]/50
                          bg-[#FFFDF5]
                          text-[#B8A979]
                          transition-all
                          duration-200
                          hover:border-[#D4A72C]
                          hover:bg-[#FFF8DC]
                          hover:text-[#D4A72C]
                          active:scale-95
                        "
                        title="Add more"
                      >
                        <Plus size={20} />
                      </button>

                    </div>

                  )}

                </div>

              </div>

              {/* Bottom Message */}
              <div className="
                mt-5
                flex
                items-center
                gap-2
                rounded-xl
                bg-[#F9F1D0]
                px-4
                py-3
              ">

                <Heart
                  size={14}
                  fill="currentColor"
                  className="
                    shrink-0
                    text-[#D4A72C]
                  "
                />

                <p className="
                  text-[11px]
                  leading-5
                  text-[#8B7A45]
                ">
                  Keep the little moments that matter
                  close to your heart.
                </p>

              </div>

              {/* Actions */}
              <div className="
                mt-5
                flex
                gap-3
              ">

                <button
                  type="button"
                  onClick={onClose}
                  className="
                    flex-1
                    rounded-xl
                    border
                    border-[#E8D9A5]
                    bg-white
                    px-4
                    py-3
                    text-sm
                    font-semibold
                    text-[#8B7A45]
                    transition-all
                    duration-200
                    hover:bg-[#F9F1D0]
                    hover:text-[#2B2618]
                    active:scale-[0.98]
                  "
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleCreateAlbum}
                  disabled={isLoading}
                  className="
                    flex-1
                    rounded-xl
                    bg-[#D4A72C]
                    px-4
                    py-3
                    text-sm
                    font-semibold
                    text-white
                    shadow-sm
                    transition-all
                    duration-200
                    hover:bg-[#C29624]
                    hover:shadow-md
                    active:scale-[0.98]
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  Create Album
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
};

export default NewAlbumOverlay;