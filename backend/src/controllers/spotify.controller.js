import axios from "axios";
import {
  getSpotifyAuthorizationUrl,
  exchangeSpotifyCode, refreshSpotifyAccessToken
} from "../services/spotify.service.js";

export const spotifyLogin = async (req, res) => {
  try {
    const { codeChallenge, state } = req.query;

    if (!codeChallenge || !state) {
      return res.status(400).json({
        message: "Missing PKCE parameters",
      });
    }

    const authUrl = getSpotifyAuthorizationUrl(
      codeChallenge,
      state
    );

    res.redirect(authUrl);
  } catch (err) {
    console.error("Spotify login error:", err);
    res.status(500).json({ message: "Failed to login with Spotify" });
  }
};

export const refreshSpotifyToken = async (req, res) => {
  try {
    const refreshToken = req.spotifyRefreshToken;

    const tokenData = await refreshSpotifyAccessToken(refreshToken);
    const accountRes = await axios.get(
      "https://api.spotify.com/v1/me",
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      }
    );

    const spotifyData = {
      id: accountRes.data.account_id,
      name: accountRes.data.display_name,
      imageUrl: accountRes.data.images[0].url,
      accessToken: tokenData.access_token,
      expiresIn: tokenData.expires_in
    }

    res.json({ spotifyData });
  } catch (err) {
    console.error("refreshSpotifyToken controller error:", err);
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const spotifyToken = async (req, res) => {
  try {
    const { code, codeVerifier } = req.body;

    if (!code || !codeVerifier) {
      return res.status(400).json({
        message: "Missing code or code verifier",
      });
    }

    const tokenData = await exchangeSpotifyCode(
      code,
      codeVerifier
    );

    const accountRes = await axios.get(
      "https://api.spotify.com/v1/me",
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      }
    );

    console.log(accountRes.data)

    const spotifyData = {
      id: accountRes.data.account_id,
      name: accountRes.data.display_name,
      imageUrl: accountRes.data.images[0].url,
      accessToken: tokenData.access_token,
      expiresIn: tokenData.expires_in
    }

    res.json({ spotifyData });
  } catch (err) {
    console.error("Spotify token exchange error:", err.response?.data || err);
    res.status(500).json({ message: "Spotify authentication failed" });
  }
};

// export const fetchPlaylist = async (req, res) => {
//   try {
//     const { req }
//   } catch (err) {
//     console.error('Error in fetchPlaylist controller:', err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// }