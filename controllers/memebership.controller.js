import Membership from '../models/membership.model.js'

const createMembership = async (req, res) => {
  try {
    const { name,price,billingCycle,benefits} = req.body;

    const membership = await Membership.create({
      name,
      price,
      billingCycle,
      benefits: {
        virtualAddress: benefits.virtualAddress,
        consolidation: benefits.consolidation,
        shippingDiscount: benefits.shippingDiscount,
        personalShopper: benefits.personalShopper,
        photo: benefits.photo,
        additionalPhoto: benefits.additionalPhoto,
        storage: benefits.storage,
        liquidClearanceCharge: benefits.liquidClearanceCharge,
        packageReturn: benefits.packageReturn,
        pickupFromWarehouse: benefits.pickupFromWarehouse,
      },
    });

    res.status(201).json({ data:membership });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


// Get All Memberships
const getAllMemberships = async (req, res) => {
  try {
    const memberships = await Membership.find();

    if (!memberships) {
        return res.status(404).json({ success: false, message: 'Membership not found' });
      }

    res.status(200).json(memberships);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//  Get Membership by Id
const getMembershipsById = async (req, res) => {
    try {
      const membership = await Membership.findById(req.params.id);
  
      if (!membership) {
          return res.status(404).json({ success: false, message: 'Membership not found' });
        }
  
      res.status(200).json(membership);
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
  deleteMembership,
  getMembershipsById
};
