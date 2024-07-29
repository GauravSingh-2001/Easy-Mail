import React, { useState, useEffect } from 'react';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

const ComposeDialog = ({ isOpen, onClose, draft }) => {
  const [editorHtml, setEditorHtml] = useState('');
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [contacts, setContacts] = useState([]);
  const [showContacts, setShowContacts] = useState(false);

  useEffect(() => {
    if (draft) {
      setEditorHtml(draft.html);
      setTo(draft.to.join(', ')); 
      setSubject(draft.subject);
    } else {
      setEditorHtml('');
      setTo('');
      setSubject('');
    }
    fetchContacts();
  }, [draft, isOpen]); 

  const fetchContacts = async () => {
    try {
      const response = await fetch(`/api/savedEmails`);
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
    }
  };

  const handleEditorChange = (html) => {
    setEditorHtml(html);
  };

  const sendMail = async (e) => {
    e.preventDefault();

    const mailOptions = {
      to: [to],
      subject: subject,
      text: editorHtml,
      html: editorHtml,
    };

    try {
      const response = await fetch(`/api/sendmail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mailOptions),
      });

      if (!response.ok) {
        throw new Error('Response is not OK');
      }

      alert("Email sent successfully!");
      onClose();
    } catch (error) {
      alert("Failed to send email: " + error.message);
      console.error("Error details:", error);
    }
  };

  const saveDraft = async () => {
    const draftOptions = {
      to: [to],
      subject: subject,
      text: editorHtml,
      html: editorHtml,
    };

    try {
      const response = await fetch(`/api/emails/draft`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(draftOptions),
      });

      if (!response.ok) {
        throw new Error('Failed to save draft');
      }

      alert("Draft saved successfully!");
      onClose();
    } catch (error) {
      alert("Failed to save draft: " + error.message);
      console.error("Error details:", error);
    }
  };

  const handleCancel = async () => {
    const confirmSave = window.confirm("Do you want to save this email as a draft?");
    if (confirmSave) {
      saveDraft();
    } else {
      if (draft && draft._id) {
        try {
          const response = await fetch(`/api/emails/${draft._id}`, {
            method: 'DELETE',
          });
          if (!response.ok) {
            throw new Error('Failed to delete draft');
          }
          alert('Draft deleted successfully!');
        } catch (error) {
          alert('Failed to delete draft: ' + error.message);
          console.error('Error details:', error);
        }
      }
      onClose();
    }
  };

  const handleSelectContact = (email) => {
    setTo(email);
    setShowContacts(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-white rounded-lg shadow-lg h-svh w-3/4">
        <div className="bg-red-700 rounded-t-lg flex justify-between items-center border-b p-4">
          <h2 className="text-lg text-slate-200 font-semibold">Compose Email</h2>
          <button onClick={onClose} className="border-0 bg-transparent text-white hover:text-black">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div className="p-6">
          <form>
            <div className="mb-4">
              <label className="flex text-gray-700 text-sm font-bold mb-2" htmlFor="to">
                To:
              </label>
              <div className="flex">
                <input
                  id="to"
                  type="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Recipient's email"
                  value={to}
                  onChange={e => setTo(e.target.value)}
                />
                <button
                  type="button"
                  className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => setShowContacts(true)}
                >
                  Contacts
                </button>
              </div>
            </div>
            <div className="mb-4">
              <label className="flex text-gray-700 text-sm font-bold mb-2" htmlFor="subject">
                Subject:
              </label>
              <input
                id="subject"
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Email subject"
                value={subject}
                onChange={e => setSubject(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="flex text-gray-700 text-sm font-bold mb-2" htmlFor="body">
                Body:
              </label>
              <ReactQuill
                value={editorHtml}
                onChange={handleEditorChange}
                modules={ComposeDialog.modules}
                formats={ComposeDialog.formats}
                className="h-64"
              />
            </div>
            <div className="flex items-center justify-between mt-20">
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={(e) => sendMail(e)}
              >
                Send
              </button>
              <button
                type="button"
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      {showContacts && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white rounded-lg shadow-lg h-svh w-3/4 p-4 flex flex-col justify-between">
  <div>
    <h2 className="text-lg font-bold mb-4">Select Contact</h2>
    <ul className="list-disc ml-3">
      {contacts.map(contact => (
        <li
          key={contact._id}
          className="cursor-pointer border-y border-gray-600 my-2 hover:bg-gray-300"
          onClick={() => handleSelectContact(contact.email)}
        >
          {contact.name} ({contact.email})
        </li>
      ))}
    </ul>
  </div>
  <div className="flex justify-end mt-4">
    <button
      type="button"
      className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      onClick={() => setShowContacts(false)}
    >
      Close
    </button>
  </div>
</div>

        </div>
      )}
    </div>
  );
};


ComposeDialog.modules = {
  toolbar: [
    [{ 'font': [] }, { 'size': [] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'script': 'sub' }, { 'script': 'super' }],
    ['blockquote', 'code-block'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],
    [{ 'direction': 'rtl' }],
    [{ 'align': [] }],
    ['link', 'image', 'video'],
    ['clean']
  ]
};

ComposeDialog.formats = [
  'font', 'size',
  'bold', 'italic', 'underline', 'strike',
  'color', 'background',
  'script', 'blockquote', 'code-block',
  'list', 'bullet', 'indent', 'direction',
  'align', 'link', 'image', 'video'
];

export default ComposeDialog;
