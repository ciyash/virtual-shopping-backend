import express from "express";
import  countryController from "../controllers/country.controller.js";
import authMiddleware from "../config/jwt.middleware.js";

const router = express.Router();

router.post("/create", countryController.createCountry);
router.get("/get", countryController.getAllCountries);
router.get("/:id", countryController.getCountryById);
router.patch("/:id",authMiddleware,countryController.updateCountry);
router.delete("/:id",authMiddleware, countryController. deleteCountry);

export default router;
