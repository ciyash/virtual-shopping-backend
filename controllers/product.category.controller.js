import ProductCategory from "../models/product.category.model.js";

// Create a new product category
const createProductCategory = async (req, res) => {
  try {
    const { companyId,productId, url, offer, offerstatus, startDate, endDate } = req.body;
    const image = req.file?.location;

    if (!image) {
      return res.status(400).json({ message: "Image is required" });
    }

    const newCategory = await ProductCategory.create({
      companyId,
      productId,
      url,
      offer,
      offerstatus,
      startDate,
      endDate,
      image,
    });

    return res.status(201).json({ message: "Product category created successfully", data: newCategory });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get all product categories
const getAllProductCategories = async (req, res) => {
  try {
    const categories = await ProductCategory.find().sort({ createdAt: -1 });
    if (!categories.length) {
      return res.status(404).json({ message: "No product categories found" });
    }
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};

// Get product category by ID
const getProductCategoryById = async (req, res) => {
  try {
    const category = await ProductCategory.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Product category not found" });
    }

    res.status(200).json({ data: category });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};

// Update product category
const updateProductCategory = async (req, res) => {
  try {
    const updates = req.body;

    if (req.file?.location) {
      updates.image = req.file.location;
    }

    const updatedCategory = await ProductCategory.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Product category not found" });
    }

    res.status(200).json({ message: "Product category updated successfully", data: updatedCategory });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};

// Delete product category
const deleteProductCategory = async (req, res) => {
  try {
    const deletedCategory = await ProductCategory.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ message: "Product category not found" });
    }

    res.status(200).json({ message: "Product category deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};

const getProductByProductId = async (req, res) => {
  try {
    const { productId } = req.params;

    const productCategories = await ProductCategory.find({ productId });

    if (!productCategories || productCategories.length === 0) {
      return res.status(404).json({ message: "No product categories found for this productId." });
    }

    res.status(200).json(productCategories);
  } catch (error) {
    console.error("Error fetching product categories:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



export default {
  createProductCategory,
  getAllProductCategories,
  getProductCategoryById,
  updateProductCategory,
  deleteProductCategory,
  getProductByProductId
};
