import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import accountRoutes from './routes/account.routes.js';
import galleryRoutes from './routes/gallery.routes.js';
import noteRoutes from './routes/notes.routes.js';
import musicRoutes from './routes/music.routes.js';
import spotifyRoutes from './routes/spotify.routes.js';

const allowedOrigins = process.env.ORIGIN_HOST.split(",");
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// routes
app.get("/", (req, res) => {
  res.send("API is running");
});
app.use('/api/account', accountRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/music', musicRoutes);
app.use('/api/spotify', spotifyRoutes);

export default app;