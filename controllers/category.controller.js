import Category from "../models/category.model.js";

const generateCategoryUniqueId = async () => {
  
  const lastCategory = await Category.findOne().sort({ catUniqueId: -1 });

  if (!lastCategory) return "CAT01";

  const lastId = parseInt(lastCategory.catUniqueId.replace('CAT', ''), 10);

  const newId = (lastId + 1).toString().padStart(2, "0");

  return `CAT${newId}`;
};

// Create Category
const createCategory = async (req, res) => {
  try {
    const { catName, status } = req.body;

    const catUniqueId = await generateCategoryUniqueId();

    const newCategory = new Category({
      catName,
      status,
      catUniqueId,
    });
    const savedCategory = await newCategory.save();
    res.status(201).json({ success: true, data: savedCategory });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ categoryCreateDate: -1 });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Category by ID
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }
    res.status(200).json({data: category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Category
const updateCategory = async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }
    res.status(200).json({ success: true, data: updatedCategory });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Category
const deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }
    res.status(200).json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export default {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
