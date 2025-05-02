import Country from "../models/country.model.js";

let counter = 1;

// Optional: Consider querying DB for max ID to avoid restarting counter on server restart
const generateCountryUniqueId = () => counter++;

const createCountry = async (req, res) => {
    try {
        const {
            countryName,
            fuelPrice,
            currency,
            weight,
            perKgPrice,
            economyPrice,
            expressPrice,
            economyDays,
            expressDays
        } = req.body;

        if (
            !countryName || fuelPrice == null || !currency || !weight || perKgPrice == null ||
            economyPrice == null || expressPrice == null || !economyDays || !expressDays
        ) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        const newCountry = new Country({
            countryUniqueId: generateCountryUniqueId(),
            countryName,
            fuelPrice,
            currency,
            weight,
            perKgPrice,
            economyPrice,
            expressPrice,
            economyDays,
            expressDays
        });

        const savedCountry = await newCountry.save();
        res.status(201).json({ success: true, data: savedCountry });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getAllCountries = async (req, res) => {
    try {
        const countries = await Country.find();
        res.status(200).json({ success: true, data: countries });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

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

const updateCountry = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedCountry = await Country.findByIdAndUpdate(id, updatedData, {
            new: true,
            runValidators: true
        });

        if (!updatedCountry) {
            return res.status(404).json({ success: false, message: "Country not found" });
        }

        res.status(200).json({ success: true, data: updatedCountry });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

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
    updateCountry,
    deleteCountry
};
