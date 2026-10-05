import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import baseUrl from "../../axios";
import { useMusicContext } from "../../context/MusicContext";

const SpotifyCallback = () => {
  const navigate = useNavigate();
  const { spotifyAccount, setSpotifyAccount } = useMusicContext();
  const hasExchanged = useRef(false);
  
  useEffect(() => {
    if (spotifyAccount) {
      navigate("/music", { replace: true });
      return;
    }

    const handleCallback = async () => {
      if (hasExchanged.current) return;

      hasExchanged.current = true;
      try {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");
        const state = params.get("state");

        const savedState =
          sessionStorage.getItem("spotify_state");
        const codeVerifier =
          sessionStorage.getItem("spotify_code_verifier");

        if (!code || !state)
          throw new Error("Missing Spotify callback data");

        if (state !== savedState)
          throw new Error("Invalid Spotify state");

        if (!codeVerifier)
          throw new Error("Missing code verifier");

        const res = await baseUrl.post("/spotify/token",
          {
            code,
            codeVerifier,
          }
        );

        setSpotifyAccount(res.data.spotifyData);

        sessionStorage.removeItem("spotify_state");
        sessionStorage.removeItem("spotify_code_verifier");

        navigate("/music", { replace: true });
      } catch (error) {
        console.error(
          "Spotify callback failed:",
          error
        );
      }
    };

    handleCallback();
  }, [spotifyAccount, navigate, setSpotifyAccount]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <div className="text-5xl font-bold">
        ∞
      </div>

      <div className="text-center">
        <h1 className="text-xl font-semibold">
          Connecting to Spotify
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Securely connecting your Spotify account...
        </p>
      </div>

      <div className="size-5 animate-spin rounded-full border-2 border-gray-300 border-t-black" />
    </div>
  );
};

export default SpotifyCallback