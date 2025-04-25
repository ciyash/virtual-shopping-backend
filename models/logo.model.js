import mongoose from "mongoose";

const logoSchema = new mongoose.Schema({
  logo: { type: String, required: true },
  description: { type: String, default: "" }
});

export default mongoose.model("Logo", logoSchema);
