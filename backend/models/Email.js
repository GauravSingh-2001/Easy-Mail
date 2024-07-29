import mongoose from 'mongoose';

const emailSchema = new mongoose.Schema({
  from: {
    name: String,
    address: String,
  },
  to: [String],
  subject: String,
  text: String,
  html: String,
  status: {
    type: String,
    enum: ['inbox', 'sent', 'spam', 'bin', 'starred', 'draft'],
    default: 'inbox',
  },
  tags:[String],
  date: {
    type: Date,
    default: Date.now,
  },
});

const Email = mongoose.model('Email', emailSchema);

export default Email;
