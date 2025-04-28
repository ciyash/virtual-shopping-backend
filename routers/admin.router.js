import express from 'express'

import adminController from '../controllers/admin.controller.js'

import authMiddleware from '../config/jwt.middleware.js'

const router=express.Router()  

router.post("/signup",adminController.signup)

router.post("/login",adminController.login)

router.get("/all",adminController.getAllAdmins)

router.get("/profile",authMiddleware,adminController.getAdminById)

router.patch("/update-profile",authMiddleware,adminController.updateAdmin)

// router.post("/change-password",auth,adminController.)

router.post("/reset-password",authMiddleware,adminController.resetPassword)

router.post("/forgot-password",authMiddleware,adminController.forgotPassword) 

router.delete("/delete-subadmin",authMiddleware,adminController.deleteAdmin)  


export default router