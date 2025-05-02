import Product from '../models/product.model.js';
import Company from '../models/company.model.js';
import Subcategory from '../models/subcategory.model.js';   

// Generate a unique Product ID like "PROD001"
const generateProductUniqueId = async () => {
  const lastProduct = await Product.findOne().sort({ createdAt: -1 });
  if (!lastProduct || !lastProduct.productUniqueId) return 'PROD001';

  const lastIdNum = parseInt(lastProduct.productUniqueId.replace('PROD', '')) || 0;
  const newIdNum = lastIdNum + 1;
  return `PROD${String(newIdNum).padStart(3, '0')}`;
};

// Create Product Controller
 const createProduct = async (req, res) => {
  try {
    const {
      topDeals,
      productName,
      companyId,
      categoryId,
      subcategoryId,
      price,
      offerprice,
      productUrl,
      description
    } = req.body;

    // Check if image was uploaded
    const image = req.file?.location || req.file?.path;
    if (!image) {
      return res.status(400).json({ success: false, message: 'Image file is required' });
    }

    const productUniqueId = await generateProductUniqueId();

    const newProduct = new Product({
      topDeals,
      productName,
      image,
      companyId,
      categoryId,
      subcategoryId,
      price,
      offerprice,
      productUrl,
      productUniqueId,
      description
    });

    const saved = await newProduct.save();
    res.status(201).json({message:"product data added successfully", data: saved });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all products

 const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate('companyId')
      .populate('categoryId')
      .populate('subcategoryId');
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get product by ID
 const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('companyId')
      .populate('categoryId')
      .populate('subcategoryId');

    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const getProductBySubcategory = async (req, res) => {
  try {
    const {subcategoryId} =req.params
    const product = await Product.find({subcategoryId})
      .populate('companyId','companyName')
      .populate('categoryId','catName')
      .populate('subcategoryId','subCategoryName');

    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// const getProductByCompanyId = async (req, res) => {
//   try {
//     const {companyId} =req.params
//     const product = await Product.find({companyId})
//       .populate('companyId','companyName')
//       .populate('categoryId','catName')
//       .populate('subcategoryId','subCategoryName');

//     if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

//     res.status(200).json(product);
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };



// Update product
 

const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Product not found' });
    res.status(200).json({ data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete product
 const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Product not found' });
    res.status(200).json({message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getTopDealsProducts = async (req, res) => {
  try {
    const topDealsProducts = await Product.find({ topDeals: "yes" }).sort({ createdAt: -1 })
      .populate("companyId", "companyName")
      .populate("categoryId", "catName")
      .populate("subcategoryId", "subCategoryName")
      .sort({ createdProductDate: -1 });

    res.status(200).json(topDealsProducts);
  } catch (error) {
    console.error("Error getting top deals products:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

const getProductsByCompanyWithSubcategories = async (req, res) => {
  try {
    const { companyId } = req.params;

    // Step 1: Get subcategories related to this company
    const subcategories = await Subcategory.find({ companyId }, '_id');
    const subcategoryIds = subcategories.map((subcat) => subcat._id);

    // Step 2: Get products that match companyId and subcategoryIds
    const products = await Product.find({
      companyId,
      subcategoryId: { $in: subcategoryIds }
    })
      .populate('companyId', 'companyName')
      .populate('categoryId', 'catName')
      .populate('subcategoryId', 'subCategoryName');

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getProductByCategoryId = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const products = await Product.find({ categoryId })
      .populate('companyId', 'companyName')
      .populate('categoryId', 'catName')
      .populate('subcategoryId', 'subCategoryName');

    if (!products || products.length === 0) {
      return res.status(404).json({ success: false, message: 'No products found for this category' });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export default{
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductBySubcategory,
    // getProductByCompanyId,
    getTopDealsProducts,
    getProductsByCompanyWithSubcategories,
    getProductByCategoryId
}
