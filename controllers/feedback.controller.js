import Feedback from "../models/feedback.model.js";

const createFeedback = async (req, res) => {
  try {
    const { name, email,title, rating, description } = req.body;

    const userId = req.user?.id || req.body.userId; 

    const newFeedback = new Feedback({
      userId,
      name,
      email,
      title,
      rating,
      description
    });

    await newFeedback.save();
    res.status(201).json({ message: "Feedback submitted successfully", newFeedback });
  } catch (error) {
    res.status(500).json({ message: "Failed to create feedback", error: error.message });
  }
};

// Get All Feedbacks
const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate('userId', 'name email');
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch feedbacks", error: error.message });
  }
};

// Get Feedback by ID
const getFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id).populate('userId', 'name email');
    if (!feedback) return res.status(404).json({ message: "Feedback not found" });

    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch feedback", error: error.message });
  }
};

// Update Feedback
const updateFeedback = async (req, res) => {
  try {
    const updatedFeedback = await Feedback.findByIdAndUpdate( req.params.id,req.body,{ new: true });

    if (!updatedFeedback) return res.status(404).json({ message: "Feedback not found" });

    res.status(200).json({ message: "Feedback updated successfully", data: updatedFeedback });
  } catch (error) {
    res.status(500).json({ message: "Failed to update feedback", error: error.message });
  }
};

// Delete Feedback
const deleteFeedback = async (req, res) => {
  try {
    const deleted = await Feedback.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Feedback not found" });

    res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete feedback", error: error.message });
  }
};

export default {
  createFeedback,
  getAllFeedbacks,
  getFeedbackById,
  updateFeedback,
  deleteFeedback
};
