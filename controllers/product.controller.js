import Product from '../models/product.model.js';

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
      productName,
      companyId,
      categoryId,
      subcategoryId,
      price,
      offerprice,
      url,
      description
    } = req.body;

    // Check if image was uploaded
    const image = req.file?.location || req.file?.path;
    if (!image) {
      return res.status(400).json({ success: false, message: 'Image file is required' });
    }

    const productUniqueId = await generateProductUniqueId();

    const newProduct = new Product({
      productName,
      image,
      companyId,
      categoryId,
      subcategoryId,
      price,
      offerprice,
      url,
      productUniqueId,
      description
    });

    const saved = await newProduct.save();
    res.status(201).json({ data: saved });
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

export default{
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductBySubcategory
}
