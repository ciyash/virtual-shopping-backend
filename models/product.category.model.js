import mongoose from "mongoose";

const productCategorySchema = new mongoose.Schema({
  image: { type: String, required: true },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
  productId:{type:mongoose.Schema.Types.ObjectId,ref:"Product",required:true},
  url: { type: String,required:true },
  offer: { type: String },
  offerstatus: { type: String },
  startdate: { type: Date },
  endDate: { type: Date }
}, {
  timestamps: true
});

export default mongoose.model("ProductCategory", productCategorySchema);
