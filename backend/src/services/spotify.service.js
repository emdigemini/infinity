import axios from "axios";

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

let accessToken = null;
let tokenExpiresAt = 0;

export const getSpotifyAccessToken = async () => {
  if (accessToken && Date.now() < tokenExpiresAt) {
    return accessToken;
  }

  const credentials = Buffer.from(
    `${clientId}:${clientSecret}`
  ).toString("base64");

  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    new URLSearchParams({
      grant_type: "client_credentials",
    }),
    {
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type":
          "application/x-www-form-urlencoded",
      },
    }
  );

  accessToken = response.data.access_token;

  tokenExpiresAt =
    Date.now() + response.data.expires_in * 1000 - 60000;

  return accessToken;
};

export const searchSpotify = async (query) => {
  const token = await getSpotifyAccessToken();

  const response = await axios.get(
    "https://api.spotify.com/v1/search",
    {
      params: {
        q: query,
        type: "track",
        limit: 10,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.tracks.items.map((track) => ({
    id: track.id,
    title: track.name,
    artist: track.artists
      .map((artist) => artist.name)
      .join(", "),
    album: track.album.name,
    albumCoverUrl: track.album.images[0]?.url ?? null,
    spotifyUrl: track.external_urls.spotify,
    durationMs: track.duration_ms,
    explicit: track.explicit,
  }));
};

export const getSpotifyAuthorizationUrl = (codeChallenge, state) => {
  const params = new URLSearchParams({
    client_id: clientId,
    response_type: "code",
    redirect_uri: redirectUri,

    scope: [
      "streaming",
      "user-read-email",
      "user-read-private",
      "user-modify-playback-state",
      "user-read-playback-state",
    ].join(" "),

    state,

    code_challenge_method: "S256",
    code_challenge: codeChallenge,

    show_dialog: "true",
  });

  return `https://accounts.spotify.com/authorize?${params.toString()}`;
};

export const refreshSpotifyAccessToken = async (refreshToken) => {
  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    {
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            `${clientId}:${clientSecret}`
          ).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data;
};

export const exchangeSpotifyCode = async (
  code,
  codeVerifier
) => {
  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
      client_id: clientId,
      code_verifier: codeVerifier,
    }),
    {
      headers: {
        "Content-Type":
          "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data;
};

export const getSpotifyPlaylists = async (accessToken) => {
  const response = await axios.get(
    "https://api.spotify.com/v1/me/playlists",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.data.items;
};