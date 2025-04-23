import CompanyCategory from '../models/company.category.model.js';

// Serial ID generator
const generateSerialUniqueId = async () => {
  const lastEntry = await CompanyCategory.findOne().sort({ createdAt: -1 }).lean();
  let serial = 1;

  if (lastEntry && lastEntry.companycatUniqueid) {
    const lastSerial = parseInt(lastEntry.companycatUniqueid.split('-')[1]);
    serial = lastSerial + 1;
  }

  const paddedSerial = serial.toString().padStart(2, '0');
  return `COMPCAT-${paddedSerial}`;
};

// Create company category
const createCompanyCategory = async (req, res) => {
  try {
    const {
      companyId,
      categoryId,
      subcategoryId,
      url,
      offer,
      offerstatus,
      startdate,
      endDate
    } = req.body;

    const image = req.file?.location;
    if (!image) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const companycatUniqueid = await generateSerialUniqueId();

    const newCompanyCategory = await CompanyCategory.create({
      companycatUniqueid,
      companyId,
      categoryId,
      subcategoryId,
      url,
      offer,
      offerstatus,
      startdate,
      endDate,
      image
    });

    return res.status(201).json({
      message: 'Company category created successfully',
      data: newCompanyCategory
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Server error',
      error: err.message
    });
  }
};

// Get all
const getAllCompanyCategories = async (req, res) => {
  try {
    const categories = await CompanyCategory.find().sort({ createdAt: -1 });
    if(categories.length===0){
      return res.status(404).json({message:"No data found in categoris !"})
    }
    res.status(200).json(categories);
  } catch (err) {
  
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get by ID
const getCompanyCategoryById = async (req, res) => {
  try {
    const category = await CompanyCategory.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Company category not found' });
    }

    res.status(200).json({ data: category });
  } catch (err) {
    console.error(`Error retrieving company category with ID ${req.params.id}:`, err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update
const updateCompanyCategory = async (req, res) => {
  try {
    const updates = req.body;
    if (req.file?.location) {
      updates.image = req.file.location;
    }

    const updated = await CompanyCategory.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Company category not found' });
    }

    res.status(200).json({ message: 'Company category updated successfully', data: updated });
  } catch (err) {
    console.error(`Error updating company category with ID ${req.params.id}:`, err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete
const deleteCompanyCategory = async (req, res) => {
  try {
    const deleted = await CompanyCategory.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Company category not found' });
    }

    res.status(200).json({ message: 'Company category deleted successfully' });
  } catch (err) {
    console.error(`Error deleting company category with ID ${req.params.id}:`, err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default {
  createCompanyCategory,
  getAllCompanyCategories,
  getCompanyCategoryById,
  updateCompanyCategory,
  deleteCompanyCategory
};
