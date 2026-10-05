import { ArrowRight } from "lucide-react";

const SpotifyEmptyState = ({ onConnect }: { onConnect: () => void }) => {
  return (
    <div className="flex min-h-80 flex-col items-center justify-center rounded-3xl border border-[#E9DFC2] bg-[#FFFDF6] px-6 text-center">
      <div
        className="
          mb-5 flex px-2 h-24 w-32 items-center justify-center
          rounded-2xl text-white shadow-[0_0_4px_rgba(0,0,0,0.15)]
        "
      >
        <img src="/spotify-icon.png" alt="" />
      </div>

      <h2 className="text-lg font-bold text-[#171717]">
        Connect with your Spotify Accounts
      </h2>

      <p className="mt-2 max-w-70 text-sm leading-6 text-[#8B7A45]">
        Connect a Spotify account to play songs directly in this App.
      </p>

      <button
        onClick={onConnect}
        className="
          mt-6 inline-flex items-center gap-2
          rounded-xl bg-[#1DB954]
          px-5 py-3
          text-sm font-semibold text-white
          shadow-sm
          transition
          hover:bg-[#c39927]
          active:scale-95
        "
      >
        Continue with Spotify
        <ArrowRight size={17} />
      </button>
    </div>
  );
};

export default SpotifyEmptyState;