import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  countryId:{type:mongoose.Schema.Types.ObjectId,ref:"Country",required:true},
  trending:{type:String,enum:["yes","no"],default:"no"},
  companyName: { type: String, required: true },
  companyUrl:{type:String,required:true},
  image: { type: String,required:true},
  companyType: {type: String,enum: ["Internal", "External"], required: true },
  description: { type: String },
  offerName: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  companyStatus: { type: String, enum: [1,2,3,4,5], default: 1 },
  createCompanyDate: { type: Date, default: () => new Date() }
});

export default mongoose.model("Company", companySchema);
