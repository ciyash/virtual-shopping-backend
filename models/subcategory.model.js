import mongoose from "mongoose";

const subcategorySchema = new mongoose.Schema({
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  image:{type:String,required:true},
  subCategoryName: { type: String, required: true },
  subCatStatus: { type: String, enum: [1,2,3,4,5], default:1 },
  subCatUniqueId: { type: String, required: true, unique: true },
  subCategoryCreateDate: { type: Date, default: () => new Date() }
});

export default mongoose.model("Subcategory", subcategorySchema);
