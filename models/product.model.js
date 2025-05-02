import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  topDeals:{type:String,enum:["yes","no"],default:"no"},
  productName: { type: String, required: true },
  image: { type: String, required: true },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  subcategoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Subcategory", required: true },
  price: { type: Number, required: true },
  offerprice: { type: Number },
  productUrl: { type: String,required:true },
  productStatus: { type: String, enum: [1,2,3,4,5], default:1 },  
  productUniqueId: { type: String, required: true},
  description: { type: String },
  createdProductDate: { type: Date, default: Date.now }
});

export default mongoose.model("Product", productSchema);
