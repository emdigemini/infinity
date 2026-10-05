import {
  Trash,
  Pencil,
  Play,
  Heart
} from "lucide-react";
import type { MediaType } from "../..";
import { useNavigate } from "react-router-dom";

type DeleteAlbumType = {
  id: string;
  name: string;
}

const Album = ({
  name,
  albumId,
  index,
  mediaCount,
  media,
  cover,
  setDeleteOverlay
}: {
  name: string;
  albumId: string;
  index: number;
  mediaCount: number;
  media: MediaType[];
  cover: string | null;
  setDeleteOverlay: React.Dispatch<
    React.SetStateAction<DeleteAlbumType | null>
  >;
}) => {

  const navigate = useNavigate();

  return (
    <div
      className="
        group
        flex w-full items-center justify-between
        rounded-2xl
        border border-[#E8D9A5]
        bg-[#FFFDF5]
        p-2
        shadow-sm

        transition-all
        duration-200

        hover:-translate-y-0.5
        hover:border-[#D4A72C]/50
        hover:shadow-md
      "
      onClick={() => navigate(`/gallery/${albumId}`)}
    >

      {/* Left */}
      <div className="flex min-w-0 items-center gap-3">

        {/* Album Cover */}
        <div
          className="
            h-18 w-18
            shrink-0
            overflow-hidden
            rounded-xl
            border border-[#E8D9A5]
            bg-[#F9F1D0]
          "
        >

          {cover ? (

            <img
              src={cover}
              alt=""
              className="
                block
                h-full
                w-full
                object-cover
                transition-transform
                duration-300
                group-hover:scale-105
              "
            />

          ) : (

            <div className="flex h-full w-full flex-wrap">

              {media?.slice(0, 4).map((m, index) => {

                const count = Math.min(
                  media.length,
                  4
                );

                return (
                  <div
                    key={m._id}
                    className={`
                      relative
                      overflow-hidden

                      ${count === 1
                        ? "h-full w-full"
                        : ""
                      }

                      ${count === 2
                        ? "h-full w-1/2"
                        : ""
                      }

                      ${count === 3 &&
                      index < 2
                        ? "h-1/2 w-1/2"
                        : ""
                      }

                      ${count === 3 &&
                      index === 2
                        ? "h-1/2 w-full"
                        : ""
                      }

                      ${count === 4
                        ? "h-1/2 w-1/2"
                        : ""
                      }
                    `}
                  >

                    {m.type === "image" ? (

                      <img
                        src={m.url}
                        alt=""
                        className="
                          block
                          h-full
                          w-full
                          object-cover
                          transition-transform
                          duration-300
                          group-hover:scale-105
                        "
                      />

                    ) : (

                      <>
                        <video
                          className="
                            block
                            h-full
                            w-full
                            object-cover
                          "
                          src={m.url}
                          muted
                          playsInline
                          preload="metadata"
                        />

                        <div className="
                          absolute
                          inset-0
                          flex
                          items-center
                          justify-center
                        ">

                          <div className="
                            flex
                            h-7
                            w-7
                            items-center
                            justify-center
                            rounded-full
                            bg-black/45
                            text-white
                            backdrop-blur-sm
                          ">

                            <Play
                              className="
                                ml-0.5
                                h-3.5
                                w-3.5
                                fill-white
                              "
                            />

                          </div>

                        </div>
                      </>

                    )}

                  </div>
                );

              })}

            </div>

          )}

        </div>

        {/* Album Info */}
        <div className="min-w-0">

          <div className="flex items-center gap-1.5">

            <p className="
              truncate
              text-sm
              font-semibold
              text-[#2B2618]
            ">
              {name}
            </p>

            <Heart
              size={11}
              fill="currentColor"
              className="
                shrink-0
                text-[#D4A72C]
                opacity-0
                transition-opacity
                duration-200
                group-hover:opacity-100
              "
            />

          </div>

          <p className="
            mt-0.5
            text-xs
            text-[#8B7A45]
          ">
            {mediaCount}{" "}
            {mediaCount === 1
              ? "memory"
              : "memories"
            }
          </p>

          <p className="
            mt-1
            text-[11px]
            font-medium
            text-[#B8A979]
          ">
            Gallery #{index + 1}
          </p>

        </div>

      </div>

      {/* Actions */}
      <div
        className="
          ml-3
          flex
          shrink-0
          items-center
          gap-1
          rounded-xl
          border
          border-[#E8D9A5]
          bg-[#F9F1D0]/60
          p-1
        "
      >

        {/* Edit */}
        <button
          type="button"
          title="Edit"
          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-lg
            text-[#8B7A45]

            transition-all
            duration-200

            hover:bg-[#D4A72C]
            hover:text-white

            active:scale-95
          "
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Pencil
            size={15}
            strokeWidth={2}
          />
        </button>

        {/* Delete */}
        <button
          type="button"
          title="Delete"
          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-lg
            text-[#8B7A45]

            transition-all
            duration-200

            hover:bg-red-100
            hover:text-red-600

            active:scale-95
          "
          onClick={(e) => {
            e.stopPropagation();

            setDeleteOverlay({
              name,
              id: albumId
            });
          }}
        >
          <Trash
            size={15}
            strokeWidth={2}
          />
        </button>

      </div>

    </div>
  );
}

export default Album;