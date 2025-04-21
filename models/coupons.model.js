import mongoose from "mongoose";

const couponsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, required: true },
  couponCode: { type: String, required: true, unique: true },
  description: { type: String },
  image: { type: String,required:true }, 
  validateDays: { type: Number, required: true }
}, {
  timestamps: true
});

export default mongoose.model("Coupons", couponsSchema);
