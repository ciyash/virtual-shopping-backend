import express from "express";
import userAddressController from "../controllers/user.address.controller.js";         
import authMiddleware from "../config/jwt.middleware.js";   

const router = express.Router();

router.post("/create", authMiddleware, userAddressController.createAddress);

router.get("/", authMiddleware, userAddressController.getUserAddress);   

router.patch("/:id", authMiddleware,userAddressController.updateAddress);  

router.delete("/:id", authMiddleware, userAddressController.deleteAddress); 

export default router