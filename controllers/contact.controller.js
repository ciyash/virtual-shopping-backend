import Contact from '../models/contact.model.js';

// Create new contact entry
 const createContact = async (req, res) => {
  try {
    const { name, country, mobile, email, reason, message } = req.body;

    const newContact = new Contact({ name, country, mobile, email, reason, message });
    await newContact.save();

    res.status(201).json({ message: 'Contact submitted successfully', data: newContact });
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit contact', error: error.message });
  }
};

// Get all contact entries
 const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving contacts', error: error.message });
  }
};

// Get contact by ID
 const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving contact', error: error.message });
  }
};

// Delete contact by ID
 const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });

    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting contact', error: error.message });
  }
};

export default {
    createContact,
    getAllContacts,
    getContactById,
    deleteContact,
    
}