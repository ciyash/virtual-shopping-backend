import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  comment: { type: String }
}, { timestamps: true });

export default mongoose.model('Item', itemSchema);
