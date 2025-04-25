import Banners from '../models/banners.model.js';

 const createBanners = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file?.location;

    if (!image) return res.status(400).json({ message: 'Image is required' });

    const banners = await Banners.create({ title, image, description });
    res.status(201).json({ message: 'Banner created successfully', banners });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while creating banner' });
  }
};

 const getAllBanners = async (req, res) => {
    try {
      const banners = await Banners.find().sort({ createdAt: -1 });

      if(!banners){
       return res.status(404).json({message:"banners not found !"})
      }
      res.status(200).json(banners);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error while fetching banners' });
    }
  };
  
   const updateBanners = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description } = req.body;
      const image = req.file?.location;
  
      const updateData = { title, description };
      if (image) updateData.image = image;
  
      const banner = await Banners.findByIdAndUpdate(id, updateData, { new: true });
  
      if (!banner) {
        return res.status(404).json({ message: 'Banner not found' });
      }
  
      res.status(200).json({ message: 'Banner updated successfully', banner });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error while updating banner' });
    }
  };
  
   const deleteBanners = async (req, res) => {
    try {
      const { id } = req.params;
      const banner = await Banners.findByIdAndDelete(id);
  
      if (!banner) {
        return res.status(404).json({ message: 'Banner not found' });
      }
  
      res.status(200).json({ message: 'Banner deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error while deleting banner' });
    }
  };
  
  export default {
    createBanners,
    getAllBanners,
    updateBanners,
    deleteBanners
  }