import { useState } from "react";
import PlaylistItem from "../components/music/PlaylistItem";
import Playlist from "../components/music/Playlist";
import SpotifyEmptyState from "../components/music/SpotifyEmptyState";
import SpotifyAccountModal from "../components/music/SpotifyAccountModal";

import { AnimatePresence, motion } from "framer-motion";
import { Plus, Heart } from "lucide-react";
import baseUrl from "../axios";
import { generateCodeChallenge, generateCodeVerifier } from "../utils";
import { useMusicContext } from "../context/MusicContext";

const Music = () => {
  const { spotifyAccount } = useMusicContext();
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
  const [showSpotifyAccounts, setShowSpotifyAccounts] = useState(false);

  const handleSpotifyAuth = async () => {
    const codeVerifier = generateCodeVerifier();

    const codeChallenge =
      await generateCodeChallenge(codeVerifier);

    const state = crypto.randomUUID();

    sessionStorage.setItem(
      "spotify_code_verifier",
      codeVerifier
    );

    sessionStorage.setItem(
      "spotify_state",
      state
    );

    window.location.href =
      `${baseUrl.defaults.baseURL}/spotify/login` +
      `?codeChallenge=${encodeURIComponent(codeChallenge)}` +
      `&state=${encodeURIComponent(state)}`;
  };

  return (
    <div>
      {/* Create Playlist */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-[#171717]">
              Our Playlists
            </h1>

            <Heart
              size={17}
              fill="#D4A72C"
              className="text-[#D4A72C]"
            />
          </div>

          <p className="mt-1 text-sm text-[#8B7A45]">
            A little collection of songs for us.
          </p>
        </div>

        <button
          onClick={() => setShowCreatePlaylist(true)}
          className="
            flex h-10 w-10 shrink-0
            items-center justify-center
            rounded-full
            bg-[#D4A72C]
            text-white
            shadow-sm
            transition
            active:scale-95
          "
        >
          <Plus size={19} strokeWidth={2.5} />
        </button>
      </div>

      {/* Playlist */}
      <AnimatePresence>
        {showPlaylist && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="fixed inset-0 z-50"
          >
            <Playlist
              onClose={() => setShowPlaylist(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spotify Account Modal */}
      <SpotifyAccountModal
        isOpen={showSpotifyAccounts}
        onClose={() => setShowSpotifyAccounts(false)}
        onDendenAccount={() => {
          setShowSpotifyAccounts(false);
        }}
        onLoginAccount={handleSpotifyAuth}
      />

      {/* Music Content */}
      {!spotifyAccount ? (
        <SpotifyEmptyState
          onConnect={() => setShowSpotifyAccounts(true)}
        />
      ) : (
        <PlaylistItem
          name="Our Playlist"
          songCount={12}
          onClick={() => setShowPlaylist(true)}
        />
      )}
    </div>
  );
};

export default Music;