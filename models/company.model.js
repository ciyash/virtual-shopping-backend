import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  countryId:{type:mongoose.Schema.Types.ObjectId,ref:"Country",required:true},
  companyName: { type: String, required: true },
  image: { type: String,required:true},
  companyType: {type: String,enum: ["Internal", "External"], required: true },
  description: { type: String },
  offerName: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  createCompanyDate: { type: Date, default: () => new Date() }
});

export default mongoose.model("Company", companySchema);
