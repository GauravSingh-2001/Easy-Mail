import React, { useState, useEffect } from 'react';

const API_URL = `https://easymail-0cfn.onrender.com/api`;

const ContactPage = () => {
  const [contacts, setContacts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', id: null });

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch(`${API_URL}/savedEmails`);
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = formData.id ? 'PUT' : 'POST';
    const endpoint = formData.id ? `${API_URL}/updateEmail/${formData.id}` : `${API_URL}/saveEmail`;
    
    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: formData.name, email: formData.email }),
      });

      if (!response.ok) throw new Error('Failed to save contact');
      setShowForm(false);
      setFormData({ name: '', email: '', id: null });
      fetchContacts();
    } catch (error) {
      console.error('Failed to save contact:', error);
    }
  };

  const handleEdit = (contact) => {
    setFormData({ ...contact, id: contact._id });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/deleteEmail/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete contact');
      fetchContacts();
    } catch (error) {
      console.error('Failed to delete contact:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Contacts</h2>
      {contacts.map((contact) => (
        <div key={contact._id} className="bg-gray-200 p-4 mb-2 rounded shadow">
          <div className="flex justify-between">
            <div>
              <p><strong>Name:</strong> {contact.name}</p>
              <p><strong>Email:</strong> {contact.email}</p>
            </div>
            <div>
              <button 
                className="bg-yellow-500 text-white p-2 rounded mr-2 hover:bg-yellow-700" 
                onClick={() => handleEdit(contact)}
              >
                Modify
              </button>
              <button 
                className="bg-red-500 text-white p-2 rounded hover:bg-red-700" 
                onClick={() => handleDelete(contact._id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
      <button 
        className="fixed bottom-5 right-5 bg-blue-500 text-white p-4 rounded-full hover:bg-blue-700" 
        onClick={() => setShowForm(true)}
      >
        <img src="/add.png" alt="Profile" className="w-10 h-10"/>
      </button>
      {showForm && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className=" bg-white rounded shadow-lg">
            <div className='bg-red-700 rounded-t-sm'>
            <h3 className="text-xl text-gray-200 font-bold mb-4">{formData.id ? 'Edit Contact' : 'Add Contact'}</h3>
            </div>
            <div className=' px-8 pb-4'>
            <form onSubmit={handleSubmit}>
              <div className=" mb-4">
                <label className="block text-gray-600 mb-2" htmlFor="name">Name</label>
                <input 
                  type="text" 
                  name="name" 
                  id="name" 
                  placeholder='Enter Contact Name'
                  value={formData.name} 
                  onChange={handleInputChange} 
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 mb-2" htmlFor="email">Email</label>
                <input 
                  type="email" 
                  name="email" 
                  id="email" 
                  value={formData.email} 
                  placeholder='Enter Email Address'
                  onChange={handleInputChange} 
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="flex justify-end">
                <button 
                  type="button" 
                  className="bg-gray-500 text-white p-2 rounded mr-2 hover:bg-gray-700" 
                  onClick={() => {
                    setShowForm(false);
                    setFormData({ name: '', email: '', id: null });
                  }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
                >
                  {formData.id ? 'Update' : 'Save'}
                </button>
              </div>
            </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactPage;
