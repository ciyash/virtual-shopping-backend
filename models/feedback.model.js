import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  email: { type: String, required: true }, // lowercase
  phone: { type: String, required: true },
  rating: { type: Number, required: true },
  description: { type: String }
}, {
  timestamps: true
});

export default mongoose.model("Feedback", feedbackSchema);
