import express from "express";
import  countryController from "../controllers/country.controller.js";

const router = express.Router();

router.post("/", countryController.createCountry);
router.get("/", countryController.getAllCountries);
router.get("/:id", countryController.getCountryById);
router.patch("/:id", countryController.updateCountry);
router.delete("/:id", countryController. deleteCountry);

export default router;
