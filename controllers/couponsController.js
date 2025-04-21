import Coupons from '../models/coupons.model.js';


const createCoupon = async (req, res) => {
  try {
    const { name, price, discount, couponCode, description, validateDays } = req.body;
    const image = req.file?.location;

    if (!image) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const coupon = new Coupons({
      name,
      price,
      discount,
      couponCode,
      description,
      image,
      validateDays
    });

    await coupon.save();
    res.status(201).json({ message: 'Coupon created successfully', coupon });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get all coupons
const getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupons.find();
    if (!coupons.length) {
      return res.status(404).json({ message: "No coupons found" });
    }
    res.status(200).json(coupons);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get coupon by ID
const getCouponById = async (req, res) => {
  try {
    const { id } = req.params;  // Get ID from URL params
    const coupon = await Coupons.findById(id);

    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    res.status(200).json(coupon);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete coupon by ID
const deleteCouponById = async (req, res) => {
  try {
    const { id } = req.params;  // Get ID from URL params
    const deletedCoupon = await Coupons.findByIdAndDelete(id);

    if (!deletedCoupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    res.status(200).json({ message: "Coupon deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export default {
  createCoupon,
  getAllCoupons,
  getCouponById,
  deleteCouponById
};
