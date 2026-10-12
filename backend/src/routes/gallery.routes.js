import express from 'express';
import { createAlbum, fetchAlbums, updateAlbum, addMedia, deleteMedia, deleteAlbum } from "../controllers/gallery.controller.js";
import upload from '../middleware/upload.middleware.js';
import { authentication } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/new-album', authentication, upload.array('media'), createAlbum);
router.get('/fetch-album', authentication, fetchAlbums);
router.patch('/update-album/:id', authentication, upload.single('cover'), updateAlbum);
router.post('/add-media', authentication, upload.array('media'), addMedia);
router.delete('/delete-media/:id', authentication, deleteMedia);
router.delete('/delete-album/:id', authentication, deleteAlbum);

export default router;