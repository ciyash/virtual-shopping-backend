import Company from "../models/company.model.js";

// CREATE
const createCompany = async (req, res) => {
  try {
    const {
      countryId,
      trending,
      companyName,
      companyType,
      companyUrl,
      description,
      offerName,
      startDate,
      endDate,
    } = req.body;

    const image = req.file?.location;
    if (!image) {
      return res.status(400).json({ message: "Image is required" });
    }

    const newCompany = new Company({
      countryId,
      trending,
      companyName,
      image,
      companyType,
      companyUrl,
      description,
      offerName,
      startDate,
      endDate,
    });

    await newCompany.save();
    res.status(201).json({ message: "Company created", data: newCompany });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET ALL
const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find().sort({ createCompanyDate: -1 });
    res.status(200).json(companies);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET BY ID
const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id).populate(
      "countryId",
      "countryName"
    );
    if (!company) return res.status(404).json({ message: "Company not found" });
    res.status(200).json({ success: true, data: company });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE
const updateCompany = async (req, res) => {
  try {
    const {
      countryId,
      trending,
      companyName,
      companyType,
      companyUrl,
      description,
      offerName,
      startDate,
      endDate,
      status,
    } = req.body;

    const image = req.file?.location;

    const updateData = {
      countryId,
      trending,
      companyName,
      companyType,
      companyUrl,
      description,
      offerName,
      startDate,
      endDate,
      status,
    };

    if (image) updateData.image = image;

    const updated = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!updated) return res.status(404).json({ message: "Company not found" });

    res.status(200).json({ message: "Company updated", data: updated });
  } catch (err) {
    // res.status(500).json({error: error.message});
    res.status(500).json({ error: error.message });


  }
};

// DELETE
const deleteCompany = async (req, res) => {
  try {
    const deleted = await Company.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Company not found" });

    res.status(200).json({ message: "Company deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export default {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
};
