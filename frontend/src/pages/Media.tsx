import { useNavigate, useParams } from "react-router-dom";
import { useAlbumContext } from "../context/AlbumContext";
import { useMemo, useState } from "react";
import { ImageOff, Plus, Play } from "lucide-react";
import PrevMedia from "../components/gallery/PrevMedia";
import AddMediaOverlay from "../components/gallery/AddMediaOverlay";

const Media = () => {
  const { albums, fetchAlbums } = useAlbumContext();
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedMedia, setSelectedMedia] = useState<number | null>(null);
  const [showAddMedia, setShowAddMedia] = useState(false);

  const album = useMemo(() => {
    const albumlist = albums.find(a => a._id === id);
    return albumlist;
  }, [albums, id]);

  if (!album) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white px-6">
        <div className="w-full max-w-md rounded-3xl border border-black/10 bg-[#FFF700] p-8 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-black text-white">
            <ImageOff className="h-7 w-7" />
          </div>

          <h1 className="text-2xl font-bold text-black">
            Album not found
          </h1>

          <p className="mt-2 text-sm leading-relaxed text-black/60">
            This album may have been deleted, moved, or doesn't exist anymore.
          </p>

          <button
            onClick={() => navigate("/gallery")}
            className="mt-6 rounded-xl bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-black/80"
          >
            Back to Gallery
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-4 py-6 sm:px-6 lg:px-8">
      {selectedMedia !== null && (
        <PrevMedia
          media={album.media}
          currentIndex={selectedMedia}
          onChange={setSelectedMedia}
          onClose={() => setSelectedMedia(null)}
        />
      )}
      {showAddMedia && (
        <AddMediaOverlay
          albumId={album._id}
          albumName={album.name}
          onClose={() => setShowAddMedia(false)}
          onSuccess={() => fetchAlbums()}
        />
      )}

      <div className="mx-auto max-w-6xl">
        {/* Album Cover */}
        <div className="mb-8 overflow-hidden rounded-3xl border border-black/10 bg-[#FFF700] shadow-sm">
          <div className="relative h-64 overflow-hidden sm:h-80">
            <div className="grid h-full w-full grid-cols-2 grid-rows-2 overflow-hidden">
              {album.cover ? (
                <img
                  src={album.cover}
                  alt="Album cover"
                  className="col-span-2 row-span-2 h-full w-full object-cover"
                />
              ) : (
                album.media.slice(0, 4).map((m, index) => {
                  const count = Math.min(album.media.length, 4);

                  const layoutClass =
                    count === 1
                      ? "col-span-2 row-span-2"
                      : count === 2
                        ? "row-span-2"
                        : count === 3 && index === 2
                          ? "col-span-2"
                          : "";

                  return (
                    <div
                      key={m._id}
                      className={`relative min-h-0 min-w-0 overflow-hidden ${layoutClass}`}
                    >
                      {m.type === "image" ? (
                        <img
                          src={m.url}
                          alt=""
                          className="block h-full w-full object-cover"
                        />
                      ) : (
                        <>
                          <video
                            className="block h-full w-full object-cover"
                            src={m.url}
                            muted
                            playsInline
                            preload="metadata"
                          />

                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm">
                              <Play className="ml-0.5 h-4 w-4 fill-white text-white" />
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

            <div className="absolute bottom-0 left-0 p-6 text-white sm:p-8">
              <p className="mb-1 text-sm font-medium text-white/80">
                Album
              </p>

              <h1 className="text-3xl font-bold tracking-tight">
                {album.name}
              </h1>

              <p className="mt-1 text-sm text-white/80">
                {album.media.length} media files
              </p>
            </div>
          </div>
        </div>

        {/* Media */}
        <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-black">
                Media
              </h2>

              <div className="flex items-center overflow-hidden rounded-full bg-black">
                <button
                  className="
                    flex h-8 w-8 items-center justify-center
                    bg-[#D4A72C]
                    text-white
                    transition
                    hover:bg-[#C29624]
                    active:scale-95
                  "
                  aria-label="Add media"
                  onClick={() => setShowAddMedia(true)}
                >
                  <Plus size={17} strokeWidth={2.5} />
                </button>

                <span className="px-3 py-1.5 text-xs font-medium text-white">
                  {album.media.length}{" "}
                  {album.media.length > 1 ? "items" : "item"}
                </span>
              </div>
            </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {album.media.map((item, index) => (
              <div
                key={item._id}
                className="group relative aspect-square overflow-hidden rounded-2xl bg-[#eeeded]"
                onClick={() => setSelectedMedia(index)}
              >
                {item.type === 'image'
                  ? <img
                      src={item.url}
                      alt=""
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  : <video 
                      src={item.url}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />}

                {/* Video indicator */}
                {item.type === "video" && (
                  <div className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-sm">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-4 w-4"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-end bg-linear-to-t from-black/40 to-transparent opacity-0 transition group-hover:opacity-100">
                  <div className="p-3 text-xs font-medium text-white">
                    {item.type === "video" ? "Video" : "Photo"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Media;