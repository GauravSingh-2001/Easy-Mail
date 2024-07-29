import React, { useState, useEffect } from 'react';
import { AiOutlineStar, AiFillStar, AiOutlineDelete, AiOutlineWarning } from 'react-icons/ai';
import EmailModal from './EmailModal';

const EmailCard = ({ email, refreshEmails }) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isStarred, setIsStarred] = useState(email.tags.includes('starred'));
  const [isSpam, setIsSpam] = useState(email.tags.includes('spam'));
  const [isDeleted, setIsDeleted] = useState(email.tags.includes('bin'));
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const togglePreview = () => {
    setIsPreviewOpen(!isPreviewOpen);
  };

  const updateEmailTag = async (action, tag, setState) => {
    try {
      const response = await fetch(`https://localhost:5000/api/${action}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emailId: email._id, action: tag }),
      });
      if (!response.ok) {
        throw new Error(`Failed to ${tag} email`);
      }
      setState((prev) => !prev);
      refreshEmails();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const toggleStar = () => updateEmailTag('star', isStarred ? 'unstar' : 'star', setIsStarred);
  const toggleSpam = () => updateEmailTag('markSpam', isSpam ? 'unspam' : 'spam', setIsSpam);
  const toggleDelete = () => {
    if (isDeleted) {
      setShowConfirmDialog(true);
    } else {
      updateEmailTag('moveToBin', 'bin', setIsDeleted);
    }
  };

  const deletePermanently = async () => {
    try {
      const response = await fetch(`https://localhost:5000/api/emails/${email._id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete email permanently');
      }
      refreshEmails(); 
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const restoreEmail = () => {
    updateEmailTag('moveToBin', 'restore', setIsDeleted);
    setShowConfirmDialog(false);
  };

  useEffect(() => {
    setIsStarred(email.tags.includes('starred'));
    setIsSpam(email.tags.includes('spam'));
    setIsDeleted(email.tags.includes('bin'));
  }, [email]);

  return (
    <div className="border-y-2 bg-gray-200 border-gray-400 p-1 mb-1">
      <div className="flex justify-between">
        <div className="flex">
          <p className="text-gray-600 m-2">
            <b className="text-black">From: </b>{email.from?.name ?? email.from}
          </p>
          <p className="text-gray-600 m-2">
            <b className="text-black">To:</b>{email.to?.name ?? email.to}
          </p>
          <p className="text-gray-600 m-2">
            <b className="text-black">Subject: </b>{email.subject}
          </p>
        </div>
        <div className="flex items-center">
          <button
            onClick={togglePreview}
            className="text-blue-500 hover:text-blue-700 mr-2"
          >
            {isPreviewOpen ? 'Close' : 'View'}
          </button>
          <button
            className="text-gray-500 mr-2"
            onClick={toggleStar}
            title="Mark as Star"
          >
            {isStarred ? <AiFillStar className="h-5 w-5 text-yellow-500" /> : <AiOutlineStar className="h-5 w-5" />}
          </button>
          <button
            className="text-gray-500 mr-2"
            onClick={toggleSpam}
            title="Mark as Spam"
          >
            {isSpam ? <AiOutlineWarning className="h-5 w-5 text-orange-500" /> : <AiOutlineWarning className="h-5 w-5" />}
          </button>
          <button
            className="text-gray-500 mr-2"
            onClick={toggleDelete}
            title="Delete"
          >
            {isDeleted ? <AiOutlineDelete className="h-5 w-5 text-red-500" /> : <AiOutlineDelete className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {isPreviewOpen && (
        <EmailModal email={email} onClose={togglePreview} />
      )}
      {showConfirmDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <p>Do you want to delete this email permanently or restore it?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={deletePermanently}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Delete Permanently
              </button>
              <button
                onClick={restoreEmail}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Restore
              </button>
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailCard;
