import Subcategory from '../models/subcategory.model.js';

let subCatCounter = 1;

// Generate Subcategory Unique ID
const generateSubCatUniqueId = () => {
  return `SUBCAT${String(subCatCounter++).padStart(2, '0')}`;
};

// Create Subcategory
const createSubcategory = async (req, res) => {
  try {
    const { categoryId, subCategoryName } = req.body;
    const image = req.file?.location;

    if (!image) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const subCatUniqueId = generateSubCatUniqueId();

    const newSubcategory = new Subcategory({
      image,
      categoryId,
      subCategoryName,
      subCatUniqueId,
    });

    const saved = await newSubcategory.save();
    return res.status(201).json({ message: 'Subcategory created successfully', data: saved });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get all Subcategories
const getAllSubcategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.find().populate('categoryId','catName');
    return res.status(200).json(subcategories);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get Subcategory by ID
const getSubcategoryById = async (req, res) => {
  try {
    const subcategory = await Subcategory.findById(req.params.id).populate('categoryId');
    if (!subcategory) {
      return res.status(404).json({ success: false, message: 'Subcategory not found' });
    }
    return res.status(200).json({ data: subcategory });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Update Subcategory
const updateSubcategory = async (req, res) => {
  try {
    const updated = await Subcategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Subcategory not found' });
    }
    return res.status(200).json({ message: 'Subcategory updated successfully', data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Subcategory
const deleteSubcategory = async (req, res) => {
  try {
    const deleted = await Subcategory.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Subcategory not found' });
    }
    return res.status(200).json({ message: 'Subcategory deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export default {
  createSubcategory,
  getAllSubcategories,
  getSubcategoryById,
  updateSubcategory,
  deleteSubcategory
};
