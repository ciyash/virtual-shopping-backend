import Subcategory from '../models/subcategory.model.js';

let subCatCounter = 1; // Initialize the counter at 1

// Generate Subcategory Unique ID
const generateSubCatUniqueId = () => {
  // Ensure the ID has a two-digit number (e.g., SUB01, SUB02)
  const uniqueId = `SUBCAT${String(subCatCounter).padStart(2, '0')}`;
  subCatCounter++; // Increment the counter after generating the unique ID
  return uniqueId;
};

// Create Subcategory
const createSubcategory = async (req, res) => {
  try {
    const { categoryId, subCategoryName } = req.body;

    // Generate a unique subCategory ID
    const subCatUniqueId = generateSubCatUniqueId();

    const newSubcategory = new Subcategory({
      categoryId,
      subCategoryName,
      subCatUniqueId, // Make sure this is assigned correctly
    });

    // Save the new subcategory to the database
    const saved = await newSubcategory.save();
    res.status(201).json({data: saved });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// Get all Subcategories
const getAllSubcategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.find().populate('categoryId');
    res.status(200).json({data: subcategories });
  } catch (error) {
    res.status(500).json({message: error.message });
  }
};

// Get Subcategory by ID
const getSubcategoryById = async (req, res) => {
  try {
    const subcategory = await Subcategory.findById(req.params.id).populate('categoryId');
    if (!subcategory) return res.status(404).json({ success: false, message: 'Subcategory not found' });
    res.status(200).json(subcategory);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Subcategory
const updateSubcategory = async (req, res) => {
  try {
    const updated = await Subcategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Subcategory not found' });
    res.status(200).json({ message: 'Subcategory updated successfully', data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Subcategory
const deleteSubcategory = async (req, res) => {
  try {
    const deleted = await Subcategory.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Subcategory not found' });
    res.status(200).json({ message: 'Subcategory deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export default {
  createSubcategory,
  getAllSubcategories,
  getSubcategoryById,
  updateSubcategory,
  deleteSubcategory
};
