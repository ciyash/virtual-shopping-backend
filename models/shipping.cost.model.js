import mongoose from "mongoose";

const shippingSchema=new mongoose.Schema({
    countryId:{type:mongoose.Schema.Types.ObjectId,ref:"Country",required:true},
    packageWeight:{type:String,required:true},
    packageType:{type:String,enum:["document","non-document"]},
    unitCm
})