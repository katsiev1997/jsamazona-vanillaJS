import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    index: true,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
});

const User = mongoose.model("User", userSchema);
export default User;
