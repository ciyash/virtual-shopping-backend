// models/address.model.js
import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
 userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  houseNo: { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  state: { type: String, required: true, trim: true },
  pincode: { type: String, required: true, trim: true },

}, { timestamps: true });

export default mongoose.model("Address", addressSchema);
