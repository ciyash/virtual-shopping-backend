import express from "express";
import addressController from "../controllers/address.controller.js";
import authMiddleware from "../config/jwt.middleware.js"

const router = express.Router();

router.post("/", authMiddleware, addressController.createAddress);

router.get("/",  addressController.getAllAddresses);

router.get("/user-address",addressController.getAddressByUserId)

router.patch("/update/:id",authMiddleware,addressController.updateAddress);

router.delete("/:id",  authMiddleware,addressController.deleteAddress);

export default router;
