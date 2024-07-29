import express from 'express';
import Email from '../models/Email.js';

const router = express.Router();

router.get('/emails/:category', async (req, res) => {
  const category = req.params.category;
  let filter = {};

  switch (category) {
    case 'sent':
      filter = { status: 'sent' };
      break;
    case 'starred':
      filter = { tags: 'starred' };
      break;
    case 'spam':
      filter = { tags: 'spam' };
      break;
    case 'bin':
      filter = { tags: 'bin' };
      break;
    case 'draft':
      filter = { status: 'draft' };
      break;
    default:
      filter = { status: 'inbox' };
  }

  try {
    const emails = await Email.find(filter);
    res.status(200).json(emails);
  } catch (error) {
    res.status(500).send('Failed to fetch emails: ' + error.message);
  }
});

router.post('/star', async (req, res) => {
  const { emailId, action } = req.body;
  
  try {
    const email = await Email.findById(emailId);
    if (action === 'star') {
      if (!email.tags.includes('starred')) {
        email.tags.push('starred');
      }
    } else {
      email.tags = email.tags.filter(tag => tag !== 'starred');
    }
    await email.save();
    res.status(200).send(`Email ${action}red!`);
  } catch (error) {
    res.status(500).send(`Failed to ${action} email: ` + error.message);
  }
});

router.post('/markSpam', async (req, res) => {
  const { emailId, action } = req.body;

  try {
    const email = await Email.findById(emailId);
    if (action === 'spam') {
      if (!email.tags.includes('spam')) {
        email.tags.push('spam');
      }
    } else {
      email.tags = email.tags.filter(tag => tag !== 'spam');
    }
    await email.save();
    res.status(200).send(`Email marked as ${action}!`);
  } catch (error) {
    res.status(500).send(`Failed to mark email as ${action}: ` + error.message);
  }
});

router.post('/moveToBin', async (req, res) => {
  const { emailId, action } = req.body;

  try {
    const email = await Email.findById(emailId);
    if (action === 'bin') {
      if (!email.tags.includes('bin')) {
        email.tags.push('bin');
      }
    } else {
      email.tags = email.tags.filter(tag => tag !== 'bin');
    }
    await email.save();
    res.status(200).send(`Email moved to ${action}!`);
  } catch (error) {
    res.status(500).send(`Failed to move email to ${action}: ` + error.message);
  }
});

router.post('/emails/draft', async (req, res) => {
  const { to, subject, text, html } = req.body;

  const draftEmail = new Email({
    to,
    subject,
    text,
    html,
    status: 'draft',
  });

  try {
    await draftEmail.save();
    res.status(201).send('Draft saved successfully!');
  } catch (error) {
    res.status(500).send('Failed to save draft: ' + error.message);
  }
});


router.delete('/emails/:id', async (req, res) => {
  try {
    const emailId = req.params.id;
    await Email.findByIdAndDelete(emailId);
    res.status(200).send('deleted successfully');
  } catch (error) {
    res.status(500).send('Failed to delete: ' + error.message);
  }
});

export default router;
