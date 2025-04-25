import mongoose from "mongoose";

const companyCategorySchema = new mongoose.Schema({
  image: { type: String, required: true },
  companycatUniqueid: { type: String, required: true},
  companycatStatus: { type: String, enum:[1,2,3,4,5],default:1},
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
  url: { type: String,required:true },
  offer: { type: String },
  offerstatus: { type: String },
  startdate: { type: Date },
  endDate: { type: Date }
}, {
  timestamps: true
});

export default mongoose.model("CompanyCategory", companyCategorySchema);
