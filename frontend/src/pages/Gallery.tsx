import { useState } from "react";
import Album from "../components/gallery/Album";
import NewAlbumOverlay from "../components/gallery/NewAlbumOverlay";
import { useAlbumContext } from "../context/AlbumContext";
import {
  Plus,
  Images,
  Heart
} from "lucide-react";
import DeleteAlbumOverlay from "../components/gallery/DeleteAlbumOverlay";

type DeleteAlbumType = {
  id: string;
  name: string;
};

const Gallery = () => {
  const { albums } = useAlbumContext();

  const [newAlbumOverlay, setNewAlbumOverlay] =
    useState(false);

  const [deleteOverlay, setDeleteOverlay] =
    useState<DeleteAlbumType | null>(null);

  return (
    <div className="flex flex-col gap-4 pb-12">

      {/* New Album Overlay */}
      {newAlbumOverlay && (
        <NewAlbumOverlay
          onClose={() => setNewAlbumOverlay(false)}
        />
      )}

      {/* Delete Overlay */}
      {deleteOverlay && (
        <DeleteAlbumOverlay
          onClose={() => setDeleteOverlay(null)}
          name={deleteOverlay.name}
          id={deleteOverlay.id}
        />
      )}

      <div className="
        flex w-full
        flex-col items-center
        gap-4 pb-12
      ">

        {albums?.length > 0 ? (

          <>
            {/* Header */}
            <div className="
              flex w-full
              items-center justify-between
              rounded-2xl
              border border-[#E8D9A5]
              bg-[#FFFDF5]
              px-4 py-3
              shadow-sm
            ">

              <div className="
                flex min-w-0
                items-center gap-3
              ">

                <div className="
                  flex h-10 w-10
                  shrink-0
                  items-center justify-center
                  rounded-xl
                  bg-[#F9F1D0]
                  text-[#D4A72C]
                ">
                  <Images
                    size={19}
                    strokeWidth={2}
                  />
                </div>

                <div className="min-w-0">

                  <div className="
                    flex items-center
                    gap-1.5
                  ">

                    <h1 className="
                      truncate
                      text-sm font-bold
                      text-[#2B2618]
                    ">
                      Our Gallery
                    </h1>

                    <Heart
                      size={12}
                      fill="currentColor"
                      className="text-[#D4A72C]"
                    />

                  </div>

                  <p className="
                    mt-0.5
                    text-[11px]
                    text-[#8B7A45]
                  ">
                    Keep your favorite moments together.
                  </p>

                </div>

              </div>

              {/* Add Album */}
              <button
                type="button"
                onClick={() =>
                  setNewAlbumOverlay(true)
                }
                className="
                  flex shrink-0
                  items-center gap-1.5
                  rounded-xl
                  bg-[#D4A72C]
                  px-3 py-2
                  text-xs font-semibold
                  text-white
                  shadow-sm
                  transition-all duration-200
                  hover:bg-[#C29624]
                  hover:shadow-md
                  active:scale-95
                "
              >
                <Plus
                  size={14}
                  strokeWidth={2.5}
                />

                <span className="hidden sm:block">
                  Add Album
                </span>
              </button>

            </div>

            {/* Albums */}
            <div className="
              flex w-full
              flex-col gap-3
            ">

              {albums.map((item, index) => (
                <Album
                  key={item._id}
                  name={item.name}
                  albumId={item._id}
                  index={index}
                  mediaCount={item.mediaCount}
                  media={item.media}
                  cover={item.cover}
                  setDeleteOverlay={setDeleteOverlay}
                />
              ))}

            </div>

          </>

        ) : (

          /* Empty State */
          <div className="
            w-full max-w-2xl
            overflow-hidden
            rounded-3xl
            border border-[#E8D9A5]
            bg-[#FFFDF5]
            shadow-sm
          ">

            {/* Mustard Accent */}
            <div className="
              h-2 w-full
              bg-[#D4A72C]
            " />

            <div className="
              flex flex-col
              items-center
              px-6 py-14
              text-center
              sm:px-12 sm:py-16
            ">

              {/* Icon */}
              <div className="
                mb-6
                flex h-16 w-16
                items-center justify-center
                rounded-2xl
                bg-[#F9F1D0]
                text-[#D4A72C]
              ">

                <Images
                  className="h-8 w-8"
                  strokeWidth={1.75}
                />

              </div>

              {/* Heading */}
              <div className="
                flex items-center
                gap-2
              ">

                <h2 className="
                  text-2xl
                  font-bold
                  tracking-tight
                  text-[#2B2618]
                  sm:text-[1.65rem]
                ">
                  Your gallery is waiting
                </h2>

                <Heart
                  size={17}
                  fill="currentColor"
                  className="text-[#D4A72C]"
                />

              </div>

              {/* Description */}
              <p className="
                mt-3
                max-w-sm
                text-[15px]
                leading-relaxed
                text-[#8B7A45]
              ">
                Create your first album and start
                keeping all your favorite memories
                in one special place.
              </p>

              {/* CTA */}
              <button
                type="button"
                onClick={() =>
                  setNewAlbumOverlay(true)
                }
                className="
                  mt-8
                  flex items-center
                  justify-center gap-2
                  rounded-xl
                  bg-[#D4A72C]
                  px-5 py-3
                  text-sm font-semibold
                  text-white
                  shadow-sm
                  transition-all duration-200
                  hover:bg-[#C29624]
                  hover:shadow-md
                  active:scale-[0.98]
                "
              >
                <Plus
                  className="h-4 w-4"
                  strokeWidth={2.5}
                />

                Create your first album

                <Heart
                  size={13}
                  fill="currentColor"
                />
              </button>

              {/* Small Footer */}
              <div className="
                mt-6 flex items-center
                gap-1.5 text-xs text-[#B8A979]
              ">

                <Heart
                  size={11}
                  fill="currentColor"
                  className="text-[#D4A72C]"
                />

                <span>
                  Every little moment is worth keeping.
                </span>

              </div>

            </div>

          </div>

        )}

      </div>

    </div>
  );
};

export default Gallery;