import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import accountRoutes from './routes/account.routes.js';
import galleryRoutes from './routes/gallery.routes.js';
import noteRoutes from './routes/notes.routes.js';
import musicRoutes from './routes/music.routes.js';
import spotifyRoutes from './routes/spotify.routes.js';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));

// routes
app.use('/api/account', accountRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/music', musicRoutes);
app.use('/api/spotify', spotifyRoutes);

export default app;