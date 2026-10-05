import {
  Heart, Music, Plus, Search,
  Play, Shuffle, X
} from "lucide-react";
import SongItem from "./SongItem";

const Playlist = ({ onClose }: { onClose: () => void }) => {
  return (
    <div
      className="
        fixed inset-0 z-999
        flex h-screen flex-col
        bg-white
      "
    >
      {/* Playlist */}
      <div
        className="
          flex min-h-0 flex-1
          flex-col
          overflow-hidden
          bg-[#FFFDF6]
        "
      >
        {/* Playlist Hero */}
        <div className="shrink-0 bg-[#D4A72C] px-5 pb-6 pt-5">
          <div className="relative flex items-end gap-4">
            {/* Close Button */}
            <button
              className="
                absolute right-2 top-2
                text-white
                transition
                active:scale-90
              "
              onClick={onClose}
            >
              <X size={24} />
            </button>

            {/* Add Song Button */}
            <button
              className="
                absolute bottom-2 right-2
                flex h-10 w-10 shrink-0
                items-center justify-center
                rounded-full
                bg-white/90
                text-[#D4A72C]
                shadow-sm
                transition
                active:scale-95
              "
            >
              <Plus size={19} strokeWidth={2.5} />
            </button>

            {/* Album Art */}
            <div
              className="
                flex h-28 w-28 shrink-0
                items-center justify-center
                rounded-2xl
                bg-[#FFF4C7]
                shadow-md
              "
            >
              <Heart
                size={46}
                fill="#D4A72C"
                className="text-[#D4A72C]"
              />
            </div>

            {/* Info */}
            <div className="min-w-0 pb-1 text-white">
              <p
                className="
                  mb-1
                  text-xs font-medium
                  uppercase tracking-wider
                  text-white/75
                "
              >
                Playlist
              </p>

              <h2 className="truncate text-2xl font-bold">
                Sai ♥ Den
              </h2>

              <p className="mt-1 text-xs text-white/80">
                9 songs
              </p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex shrink-0 items-center gap-2 px-5 py-4">
          {/* Search */}
          <div
            className="
              flex w-full
              items-center gap-3
              rounded-2xl
              border border-[#E8D79E]
              bg-[#FFFDF6]
              px-4 py-3
            "
          >
            <Search
              size={18}
              className="shrink-0 text-[#B09A61]"
            />

            <input
              type="text"
              placeholder="Search songs..."
              className="
                w-full
                bg-transparent
                text-sm
                text-[#171717]
                outline-none
                placeholder:text-[#B09A61]
              "
            />
          </div>

          {/* Shuffle */}
          <button
            className="
              flex h-10 w-10 shrink-0
              items-center justify-center
              rounded-full
              text-[#D4A72C]
              transition
              active:scale-95
            "
          >
            <Shuffle size={22} />
          </button>

          {/* Play All */}
          <button
            className="
              flex h-10 w-10 shrink-0
              items-center justify-center
              rounded-full
              bg-[#D4A72C]
              text-white
              shadow-md
              transition
              active:scale-95
            "
          >
            <Play
              size={18}
              fill="currentColor"
              className="ml-0.5"
            />
          </button>
        </div>

        {/* Song List */}
        <div
          className="
            min-h-0
            flex-1
            overflow-y-auto
            px-2.5
            pb-4
            pt-1
            overscroll-contain
          "
        >
          <div className="flex flex-col gap-2">
            <SongItem
              title="Your first song"
              artist="Your favorite artist"
              duration="3:45"
            />
          </div>
          {/* Empty State */}
          <EmptyState />
        </div>
      </div>

      {/* Bottom Hint */}
      <div
        className="
          flex shrink-0
          items-center justify-center
          gap-2
          bg-white
          px-4
          py-3
          text-xs
          text-[#B09A61]
        "
      >
        <Heart size={12} fill="currentColor" />

        <span>Our little collection of songs</span>

        <Heart size={12} fill="currentColor" />
      </div>
    </div>
  );
};

const EmptyState = () => {
  return (
    <div className="pb-8 pt-3">
      <div
        className="
          flex min-h-55 flex-col items-center justify-center rounded-2xl
          border border-dashed border-[#E8D79E] text-center px-4
        "
      >
        <div
          className="
            mb-4 flex h-16 w-16
            items-center justify-center
            rounded-full
            bg-[#FFF4C7]
          "
        >
          <Music
            size={28}
            strokeWidth={1.8}
            className="text-[#D4A72C]"
          />
        </div>

        <h3 className="font-bold text-[#171717]">
          Your playlist is empty
        </h3>

        <p className="mt-1.5 max-w-60 text-sm leading-5 text-[#8B7A45]">
          Add songs that remind you of each other.
        </p>

        <button
          className="
            mt-4 inline-flex items-center gap-2
            rounded-full bg-[#D4A72C]
            px-4 py-2 text-sm font-semibold
            text-white transition active:scale-95
          "
        >
          <Plus size={16} />
          Add Song
        </button>
      </div>
    </div>
  )
}

export default Playlist;