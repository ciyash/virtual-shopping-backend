import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import Admin from "../models/admin.model.js";

dotenv.config();

// Nodemailer Transporter
const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: { rejectUnauthorized: false },
});

// Send OTP Email
const sendOTPEmail = async (email, otp) => {
  try {
    await transport.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP for Password Reset",
      text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
    });
  } catch (error) {
    console.error("Error sending OTP email:", error.message);
  }
};

// Signup Admin / Subadmin
const signup = async (req, res) => {
  try {
    const { userName, email, password, role } = req.body;

    if (!userName || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists with this email" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      userName,
      email,
      password: hashedPassword,
      role,
    });

    await newAdmin.save();

    res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
    console.error("Signup error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Login Admin / Subadmin
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        userName: admin.userName,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Forgot Password (Send OTP)
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    admin.otp = otp;
    admin.otpExpires = otpExpires;

    await admin.save();
    await sendOTPEmail(email, otp);

    res.status(200).json({ message: "OTP sent to your email" });
  } catch (error) {
    console.error("Forgot Password error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Reset Password (with OTP)
const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    if (!admin.otp || admin.otpExpires < new Date()) {
      return res.status(400).json({ message: "OTP expired. Please try again." });
    }

    if (parseInt(otp) !== admin.otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    admin.password = hashedPassword;
    admin.otp = undefined;
    admin.otpExpires = undefined;

    await admin.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Reset Password error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get Admin by ID
const getAdminById = async (req, res) => {
  try {
    const { id } = req.params;

    const admin = await Admin.findById(id).select("-password -otp -otpExpires"); // exclude sensitive fields
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({ admin });
  } catch (error) {
    console.error("Get Admin by ID error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get All Admins
const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select("-password -otp -otpExpires"); // exclude sensitive fields

    res.status(200).json({ admins });
  } catch (error) {
    console.error("Get All Admins error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update Admin
const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { userName, email, role } = req.body;

    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    if (userName) admin.userName = userName;
    if (email) admin.email = email;
    if (role) admin.role = role;

    await admin.save();

    res.status(200).json({ message: "Admin updated successfully" });
  } catch (error) {
    console.error("Update Admin error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete Admin
const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const admin = await Admin.findByIdAndDelete(id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    console.error("Delete Admin error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};


export default {
  signup,
  login,
  forgotPassword,
  resetPassword,
  getAdminById,
  getAllAdmins,
  updateAdmin,
  deleteAdmin,
};
