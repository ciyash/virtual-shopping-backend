import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {  
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin","subadmin"], required: true },
    ipAddress: { type: String },
    documents: [{ type: String }],
    otp: { type: Number  },    
    otpExpires: { type: Date }, 
  },
  { timestamps: true }
);

export default mongoose.model("Admin", adminSchema);     