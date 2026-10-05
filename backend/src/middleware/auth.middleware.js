import jwt from 'jsonwebtoken';

export const authentication = async (req, res, next) => {
  const token = req.cookies?.acc_id;
  if (!token)
    return res.status(401).end();

  try {
    const user = jwt.verify(token, process.env.JWT_SUPER_SECRET);
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
}

export const getSpotifyRefreshToken = (req, res, next) => {
  const refreshToken = req.cookies.spotify_refresh_token;

  if (!refreshToken) {
    return res.status(401).json({
      message: "Spotify refresh token not found.",
    });
  }

  req.spotifyRefreshToken = refreshToken;

  next();
};