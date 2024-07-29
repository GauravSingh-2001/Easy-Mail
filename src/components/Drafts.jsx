import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ComposeDialog from './ComposeDialog'; 

const Drafts = () => {
  const [drafts, setDrafts] = useState([]);
  const [selectedDraft, setSelectedDraft] = useState(null);

  useEffect(() => {
    fetchDrafts();
  }, []);

  const fetchDrafts = async () => {
    try {
      const response = await axios.get(`/api/emails/draft`);
      setDrafts(response.data);
    } catch (error) {
      console.error('Failed to fetch drafts:', error);
    }
  };

  const handleDraftClick = (draft) => {
    setSelectedDraft(draft);
  };

  const handleDialogClose = () => {
    setSelectedDraft(null);
    fetchDrafts(); 
  };

  return (
    <div className="drafts-view">
      <h1 className="text-2xl font-bold mb-4">Drafts</h1>
      <ul className="space-y-4">
        {drafts.length > 0 ? (
          drafts.map((draft) => (
            <li
              key={draft._id}
              className="flex border-y border-gray-600 p-4 shadow-sm cursor-pointer"
              onClick={() => handleDraftClick(draft)}
            >
              <p className="text-gray-600"><strong>To:</strong> {draft.to.join(', ')}</p>
              <h2 className="text-gray-600">Subject: <strong>{draft.subject}</strong></h2>
            </li>
          ))
        ) : (
          <p>No drafts available.</p>
        )}
      </ul>
      <ComposeDialog isOpen={selectedDraft !== null} onClose={handleDialogClose} draft={selectedDraft} />
    </div>
  );
};

export default Drafts;
