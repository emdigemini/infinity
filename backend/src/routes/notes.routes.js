import express from "express";
import { createNote, fetchNotes, deleteNote, updateNote, fetchNoteToRead } from "../controllers/notes.controller.js";
import { authentication } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create-note", authentication, createNote);
router.get("/fetch-notes", authentication, fetchNotes);
router.put("/update-note/:id", authentication, updateNote);
router.get("/read-note", authentication, fetchNoteToRead);
router.delete("/delete-note/:id", authentication, deleteNote);

export default router;