import React, { useEffect, useState } from 'react';
import { FetchEmails } from '../../backend/EmailServices';
import EmailList from './EmailList';

const EmailView = ({ category }) => {
  const [emails, setEmails] = useState([]);

  const refreshEmails = async () => {
    try {
      const fetchedEmails = await FetchEmails(category);
      setEmails(fetchedEmails);
    } catch (error) {
      console.error(`Failed to fetch ${category} emails:`, error.message);
    }
  };

  useEffect(() => {
    refreshEmails();
  }, [category]);

  return (
    <div className="email-view">
      <h1 className="text-2xl font-bold mb-4 capitalize">{category} Emails</h1>
      <EmailList emails={emails} refreshEmails={refreshEmails} />
    </div>
  );
};

export default EmailView;
