import mongoose from "mongoose";

const albumSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true
  },
  name: {
    type: String,
    required: true,
    maxlength: 100,
  },
  cover: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  }
}, { timestamps: true });

albumSchema.virtual("media", {
  ref: "Media",
  localField: "_id",
  foreignField: "albumId",
});

albumSchema.set("toJSON", { virtuals: true });
albumSchema.set("toObject", { virtuals: true });

const Album = mongoose.model("Album", albumSchema);

export default Album;