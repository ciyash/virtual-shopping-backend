import Membership from '../models/Membership.js';

// Create Membership
const createMembership = async (req, res) => {
  try {
    const membership = await Membership.create(req.body);
    res.status(201).json({ success: true, membership });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get All Memberships
const getAllMemberships = async (req, res) => {
  try {
    const memberships = await Membership.find();
    res.status(200).json({ success: true, memberships });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Membership by ID
const updateMembership = async (req, res) => {
  try {
    const membership = await Membership.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!membership) {
      return res.status(404).json({ success: false, message: 'Membership not found' });
    }
    res.status(200).json({ success: true, membership });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete Membership
const deleteMembership = async (req, res) => {
  try {
    const result = await Membership.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ success: false, message: 'Membership not found' });
    }
    res.status(200).json({ success: true, message: 'Membership deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export default {
  createMembership,
  getAllMemberships,
  updateMembership,
  deleteMembership
};
