import UserAddress from '../models/user.address.model.js';

// CREATE new address
 const createAddress = async (req, res) => {
  try {
    const userId = req.userId; // Ensure middleware adds userId
    const addressData = { ...req.body, userId };

    // If this is marked as default, unset other defaults for this user
    if (addressData.isDefault) {
      await UserAddress.updateMany({ userId }, { isDefault: false });
    }

    const address = new UserAddress(addressData);
    await address.save();

    res.status(201).json({ success: true, data: address });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET all addresses for a user
 const getUserAddress = async (req, res) => {
  try {
    const userId = req.userId;
    const addresses = await UserAddress.find({ userId });

    res.status(200).json({ success: true, data: addresses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE an address
 const updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const updateData = req.body;

    if (updateData.isDefault) {
      await UserAddress.updateMany({ userId }, { isDefault: false });
    }

    const updated = await UserAddress.findOneAndUpdate(
      { _id: id, userId },
      updateData,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Address not found' });
    }

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE an address
 const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const deleted = await UserAddress.findOneAndDelete({ _id: id, userId });

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Address not found' });
    }

    res.status(200).json({ success: true, message: 'Address deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export default {        
    createAddress,
    getUserAddress,
    updateAddress,
    deleteAddress,
    };