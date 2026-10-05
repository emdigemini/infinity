import { MoreVertical, Music2, Play } from "lucide-react";

interface SongItemProps {
  title: string;
  artist: string;
  duration?: string;
}

const SongItem = ({
  title,
  artist,
  duration,
}: SongItemProps) => {
  return (
    <div
      className="
        flex w-full items-center gap-3
        rounded-2xl
        border border-[#E8D79E]
        bg-[#FFFDF6]
        px-2 py-2
      "
    >
      {/* Music Icon */}
      <div
        className="
          flex h-14 w-14 shrink-0
          items-center justify-center
          rounded-xl
          bg-[#FFF4C7]
          text-[#D4A72C]
        "
      >
        <Music2 size={23} strokeWidth={2} />
      </div>

      {/* Song Info */}
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-bold text-[#171717]">
          {title}
        </h3>

        <p className="mt-0.5 truncate text-xs text-[#8B7A45]">
          {artist}
        </p>
      </div>

      {/* Duration */}
      {duration && (
        <span className="hidden text-xs text-[#B09A61] sm:block">
          {duration}
        </span>
      )}

      {/* Play */}
      <button
        className="
          flex h-9 w-9 shrink-0
          items-center justify-center
          rounded-full
          bg-[#D4A72C]
          text-white
          transition
          active:scale-90
        "
      >
        <Play
          size={15}
          fill="currentColor"
          className="ml-0.5"
        />
      </button>

      {/* More */}
      <button
        className="
          flex h-9 w-7 shrink-0
          items-center justify-center
          text-[#8B7A45]
          transition
          hover:text-[#D4A72C]
        "
      >
        <MoreVertical size={18} />
      </button>
    </div>
  );
};

export default SongItem;