import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  title:{type:String,required:true},
  email: { type: String, required: true }, // lowercase
  rating: { type: Number, required: true },
  description: { type: String }
}, {
  timestamps: true
});

export default mongoose.model("Feedback", feedbackSchema);
