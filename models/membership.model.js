import mongoose from 'mongoose';

const membershipSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ['BASIC', 'PREMIUM'],
    required: true
  },
  price: Number, // in ₹, 0 for BASIC
  billingCycle: {
    type: String,
    enum: ['Annual', 'Half-Yearly', 'Free'],
    default: 'Free'
  },
  benefits: {
    virtualAddress: { type: Boolean, default: true },
    consolidation: { type: String }, // e.g., "₹50 per Package", "FREE"
    shippingDiscount: { type: String },
    personalShopper: { type: String },
    photo: { type: String },
    additionalPhoto: { type: String },
    storage: { type: String }, // e.g., "20 Days", "30 Days"
    liquidClearanceCharge: { type: String },
    packageReturn: { type: String },
    pickupFromWarehouse: { type: String }
  }
}, { timestamps: true });

export default mongoose.model('Membership', membershipSchema);
