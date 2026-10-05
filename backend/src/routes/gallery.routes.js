import express from 'express';
import { createAlbum, fetchAlbums, addMedia, deleteAlbum } from "../controllers/gallery.controller.js";
import upload from '../middleware/upload.middleware.js';
import { authentication } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/new-album', authentication, upload.array('media'), createAlbum);
router.get('/fetch-album', authentication, fetchAlbums);
router.post('/add-media', authentication, upload.array('media'), addMedia);
router.delete('/delete-album/:id', authentication, deleteAlbum);

export default router;