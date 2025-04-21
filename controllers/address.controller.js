import Address from "../models/address.model.js";

// ✅ Create Address
const createAddress = async (req, res) => {
  try {
    const { houseNo, address, city, state, pincode } = req.body;
    const userId = req.user.id;

    const newAddress = new Address({
      houseNo,
      address,
      city,
      state,
      pincode,
      userId,
    });

    await newAddress.save();

    res.status(201).json({
      message: "Address added successfully",
      data: newAddress,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create address",
      error: error.message,
    });
  }
};

// ✅ Get All Addresses for Admin
const getAllAddresses = async (req, res) => {
  try {
   
    const addresses = await Address.find();

    if (!addresses.length) {
      return res.status(404).json({ message: "No addresses found" });
    }

    res.status(200).json({ data: addresses });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch addresses",
      error: error.message,
    });
  }
};


const updateAddress = async (req, res) => {
    try {
      const { id } = req.params;
  
      const updatedAddress = await Address.findOneAndUpdate(
        { _id: id },
        req.body,
        { new: true }
      );
  
      if (!updatedAddress) {
        return res.status(404).json({ message: "Address not found" });
      }
  
      res.status(200).json({
        message: "Address updated successfully",
        data: updatedAddress,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to update address",
        error: error.message,
      });
    }
  };
  
  

//  Delete Address
const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Address.findOneAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Address not found" });
    }

    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete address",
      error: error.message,
    });
  }
};

const getAddressByUserId = async (req, res) => {
    try {
      const userId = req.user.id; // assuming auth middleware sets req.user
      console.log(userId)
      const addresses = await Address.find({ userId });
  
      if (!addresses || addresses.length === 0) {
        return res.status(404).json({ message: "No addresses found for this user" });
      }
  
      res.status(200).json({ data: addresses });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch addresses", error: error.message });
    }
  };
  

export default {
  createAddress,
  getAllAddresses,
  updateAddress,
  deleteAddress,
  getAddressByUserId
};
