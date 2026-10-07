import Account from "../models/Account.js";
import Note from "../models/Note.js";

export const createNote = async (req, res) => {
  try {
    const { title, content, date, time } = req.body;
    const userId = req.user.id;

    if (!title || !content || !date || !time) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newNote = await Note.create({ createdBy: userId, title, content, date, time });

    res.status(201).json({
      message: "Note created successfully", 
      note: newNote
    });
  } catch (err) {
    console.error('Error in createNote controller:', err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const fetchNotes = async (req, res) => {
  try {
    const userId = req.user.id;
    const notes = await Note.find({ createdBy: userId }).sort({ createdAt: -1 }); 
    res.status(200).json({ notes });
  } catch (err) {
    console.error('Error in fetchNotes controller:', err);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, date, time } = req.body;

    const note = await Note.findByIdAndUpdate(id, { title, content, date, time }, { returnDocument: 'after' });
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({
      message: "Note updated successfully", 
      note
    });
  } catch (err) {
    console.error('Error in updateNote controller:', err);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const fetchNoteToRead = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await Account.findById(userId)
      .populate("relationship");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const partnerId = user.relationship?._id;

    if (!partnerId) {
      return res.status(200).json({
        notesToRead: [],
      });
    }

    const notes = await Note.find({
      createdBy: partnerId,
    });

    const now = new Date();
now.setHours(0, 0, 0, 0);

const notesToRead = notes.filter((note) => {
  const noteDate = new Date(note.date);
  noteDate.setHours(0, 0, 0, 0);

  return now >= noteDate;
});
    console.log("Current time:", now);
    console.log("Partner ID:", partnerId);
    console.log("Notes found:", notes.length);
    console.log("Notes to read:", notesToRead.length);

    return res.status(200).json({
      notesToRead,
    });

  } catch (err) {
    console.error("Error in fetchNoteToRead controller:", err);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findByIdAndDelete(id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (err) {
    console.error('Error in deleteNote controller:', err);
    res.status(500).json({ message: "Internal server error" });
  }
}
