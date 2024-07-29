import React from 'react';
import EmailCard from './EmailCards';

const EmailList = ({ emails, refreshEmails }) => {
  return (
    <div>
      {emails.map((email) => (
        <EmailCard key={email._id} email={email} refreshEmails={refreshEmails} />
      ))}
    </div>
  );
};

export default EmailList;
