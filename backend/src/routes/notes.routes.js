import express from "express";
import { createNote, fetchNotes, deleteNote, updateNote, fetchNoteToRead, readNote } from "../controllers/notes.controller.js";
import { authentication } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create-note", authentication, createNote);
router.get("/fetch-notes", authentication, fetchNotes);
router.put("/update-note/:id", authentication, updateNote);
router.get("/get-note-to-read", authentication, fetchNoteToRead);
router.patch("/read-note", authentication, readNote);
router.delete("/delete-note/:id", authentication, deleteNote);

export default router;