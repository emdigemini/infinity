import express from "express";
import { refreshSpotifyToken, spotifyLogin, spotifyToken } from "../controllers/spotify.controller.js";

const router = express.Router();

router.get("/login", spotifyLogin);
router.post("/token", spotifyToken);
router.post("/refresh", refreshSpotifyToken);

export default router;