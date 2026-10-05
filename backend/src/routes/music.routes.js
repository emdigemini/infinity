import express from 'express';
import { searchMusic } from '../controllers/music.controller.js';

const router = express.Router();

router.get("/search", searchMusic);

export default router