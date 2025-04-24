import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  image: { type: String, required: true },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  subcategoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Subcategory", required: true },
  price: { type: Number, required: true },
  offerprice: { type: Number },
  url: { type: String,default:null },
  productStatus: { type: String, enum: [1,2,3,4,5], default:1 },  // 1 active 2 inactive
  productUniqueId: { type: String, required: true, unique: true },
  description: { type: String },
  createdProductDate: { type: Date, default: Date.now }
});

export default mongoose.model("Product", productSchema);
