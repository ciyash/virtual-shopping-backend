import Country from "../models/country.model.js"; 


let counter = 1;

const generateCountryUniqueId = () => counter++;


const createCountry = async (req, res) => {
    try {
        const { countryName,currency} = req.body;

        const newCountry = new Country({
            countryUniqueId: generateCountryUniqueId(), 
            countryName,
            currency
        });

        const savedCountry = await newCountry.save();
        res.status(201).json({ success: true, data: savedCountry });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all countries
 const getAllCountries = async (req, res) => {
    try {
        const countries = await Country.find();
        res.status(200).json(countries);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get a country by ID
 const getCountryById = async (req, res) => {
    try {
        const { id } = req.params;
        const country = await Country.findById(id);

        if (!country) {
            return res.status(404).json({ success: false, message: "Country not found" });
        }

        res.status(200).json({ success: true, data: country });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update a country
 const updateCountry = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedCountry = await Country.findByIdAndUpdate(id, updatedData, {
            new: true,
        });

        if (!updatedCountry) {
            return res.status(404).json({ success: false, message: "Country not found" });
        }

        res.status(200).json({ success: true, data: updatedCountry });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete a country
 const deleteCountry = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCountry = await Country.findByIdAndDelete(id);

        if (!deletedCountry) {
            return res.status(404).json({ success: false, message: "Country not found" });
        }

        res.status(200).json({ success: true, message: "Country deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export default {
    createCountry,
    getAllCountries,
    getCountryById,
    deleteCountry,
    updateCountry,

}