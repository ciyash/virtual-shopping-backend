import mongoose from "mongoose";

const bannersSchema=new mongoose.Schema({
    title:{type:String,required:true},
    image:{type:String,required:true},
    description:{type:String,default:null}
},
{timestamps:true}
)
export default mongoose.model("Banners",bannersSchema)