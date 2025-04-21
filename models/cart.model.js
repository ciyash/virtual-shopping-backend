import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type:String,
    required: true
  },
  subTotal: {
    type: Number,
    required: true
  },
  addressId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address'
  },
  charges: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    default: 1
  },
  price: {
    type: Number,
    required: true
  }
}, { timestamps: true });

export default mongoose.model('Cart', cartSchema);
