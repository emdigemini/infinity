import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema({
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true
  },
  albumId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Album',
    required: true
  },
  url: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    default: '',
    maxlength: 64
  },
  type: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Media = mongoose.model('Media', mediaSchema);

export default Media;