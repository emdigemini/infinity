import mongoose from "mongoose";

const anniversarySchema = new mongoose.Schema({
  accounts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true
  }],
  date: {
    type: Date,
    required: true
  }
}, { timestamps: true });