import mongoose from "mongoose";

const conutrySchema=new mongoose.Schema({
    countryUniqueId:{type:Number,required:true},
    countryName:{type:String,required:true,
    currency:{type:String,required:true},
    createCountryDate:{type:Date,default:()=>new Date()}   
    }
})
export default mongoose.model("Country",conutrySchema)