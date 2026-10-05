import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 64,
  },
  username: {
    type: String,
    required: true,
    maxlength: 64
  },
  password: {
    type: String,
    required: true
  },
  relationship: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    default: null
  }
}, { timestamps: true });

const Account = mongoose.model("Account", accountSchema);

export default Account;