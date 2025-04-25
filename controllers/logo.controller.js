import Logo from '../models/logo.model.js';

 const createLogo = async (req, res) => {
  try {
    const image = req.file?.location;
    const { description } = req.body;

    if (!image) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const item = await Logo.create({ logo: image, description });
    res.status(201).json({ message: 'Logo created successfully', item });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while creating logo' });
  }

};

 const getAllLogos = async (req, res) => {
    try {
      const logos = await Logo.find().sort({ createdAt: -1 });
      res.status(200).json({ message: 'All logos fetched successfully', logos });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error while fetching logos' });
    }
  };
  
   const getLogoById = async (req, res) => {
    try {
      const { id } = req.params;
      const logo = await Logo.findById(id);
  
      if (!logo) {
        return res.status(404).json({ message: 'Logo not found' });
      }
  
      res.status(200).json({ message: 'Logo fetched successfully', logo });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error while fetching logo' });
    }
  };

   const deleteLogo = async (req, res) => {
    try {
      const { id } = req.params;
      const logo = await Logo.findByIdAndDelete(id);
  
      if (!logo) {
        return res.status(404).json({ message: 'Logo not found' });
      }
  
      res.status(200).json({ message: 'Logo deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error while deleting logo' });
    }
  };
  
  export default {
    createLogo,
    getAllLogos,
    getLogoById,
    deleteLogo
  }