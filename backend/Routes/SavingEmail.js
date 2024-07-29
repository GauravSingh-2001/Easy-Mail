import express from 'express';
import SavedEmail from '../models/SavedEmail.js';

const router = express.Router();

// Route to save a new email address
router.post('/saveEmail', async (req, res) => {
  const { name, email } = req.body;

  try {
    const newSavedEmail = new SavedEmail({ name, email });
    await newSavedEmail.save();
    res.status(201).json({ message: 'Email address saved successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to save email address: ' + error.message });
  }
});

// Route to retrieve all saved email addresses
router.get('/savedEmails', async (req, res) => {
  try {
    const savedEmails = await SavedEmail.find();
    res.status(200).json(savedEmails);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve saved email addresses: ' + error.message });
  }
});

router.put('/updateEmail/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    await SavedEmail.findByIdAndUpdate(id, { name, email });
    res.status(200).json({ message: 'Email address updated successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update email address: ' + error.message });
  }
});

router.delete('/deleteEmail/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await SavedEmail.findByIdAndDelete(id);
    res.status(200).json({ message: 'Email address deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete email address: ' + error.message });
  }
});

export default router;
