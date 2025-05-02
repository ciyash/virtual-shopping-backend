import mongoose from "mongoose";

const countrySchema = new mongoose.Schema({
  countryUniqueId: { type: Number, required: true },
  
  countryName: { type: String, required: true },
  fuelPrice: { type: Number, required: true },
  currency: { type: String, required: true },
  weight: { type: String, required: true },
  perKgPrice: { type: Number, required: true },
  economyPrice: { type: Number, required: true },
  expressPrice: { type: Number, required: true },
  economyDays: { type: String, required: true },
  expressDays: { type: String, required: true },
  createCountryDate: { type: Date, default: () => new Date() }
});

export default mongoose.model("Country", countrySchema);
