import { Heart, MoreVertical, Play } from "lucide-react";

interface PlaylistItemProps {
  name: string;
  songCount: number;
  cover?: string;
  onClick?: () => void;
}

const PlaylistItem = ({
  name,
  songCount,
  cover,
  onClick,
}: PlaylistItemProps) => {
  return (
    <div
      onClick={onClick}
      className="
        group flex w-full items-center gap-3
        rounded-2xl border border-[#E8D79E]
        bg-[#FFFDF6] p-2 pr-3 shadow-sm
        transition hover:bg-[#FFF9E8]
        active:scale-[0.99] cursor-pointer
      "
    >
      {/* Cover */}
      <div
        className="
          flex h-14 w-14 shrink-0
          items-center justify-center
          overflow-hidden
          rounded-xl
          bg-[#FFF4C7]
        "
      >
        {cover ? (
          <img
            src={cover}
            alt={name}
            className="h-full w-full object-cover"
          />
        ) : (
          <Heart
            size={23}
            fill="#D4A72C"
            className="text-[#D4A72C]"
          />
        )}
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-bold text-[#171717]">
          {name}
        </h3>

        <p className="mt-0.5 text-xs text-[#8B7A45]">
          {songCount} {songCount === 1 ? "song" : "songs"}
        </p>
      </div>

      {/* Play */}
      <button
        onClick={(e) => e.stopPropagation()}
        className="
          flex h-9 w-9 shrink-0
          items-center justify-center
          rounded-full
          bg-[#D4A72C]
          text-white
          opacity-0
          transition
          group-hover:opacity-100
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
        onClick={(e) => e.stopPropagation()}
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

export default PlaylistItem;