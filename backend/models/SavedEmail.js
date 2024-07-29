import mongoose from 'mongoose';

const savedEmailSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const SavedEmail = mongoose.model('SavedEmail', savedEmailSchema);

export default SavedEmail;
