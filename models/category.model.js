import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  catName: { type: String, required: true },
  catStatus: { type: Number,enum:[1,2,3,4,5],default:1 },
  catUniqueId: { type: String, required: true},
  categoryCreateDate: { type: Date, default: () => new Date() }
});

export default mongoose.model("Category", categorySchema);
