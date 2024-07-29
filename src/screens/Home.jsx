import React, { useState } from 'react';
import Navbar1 from '../components/Navbar1';
import Sidebar from '../components/Sidebar';
import EmailView from '../components/EmailView';
import InboxMails from '../components/InboxMails';
import ContactPage from '../components/Contacts';
import Drafts from '../components/Drafts';

function Home() {
  const [selectedCategory, setSelectedCategory] = useState('inbox');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      <Navbar1 />
      <div className="flex flex-1">
        <Sidebar 
          setSelectedCategory={setSelectedCategory} 
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen} 
        />
        <div className={`flex-1 overflow-y-auto transition-all duration-300 ${isSidebarOpen ? 'ml-60' : 'ml-14'}`}>
        {selectedCategory === 'contacts' ? (
            <ContactPage />
          ) : selectedCategory === 'inbox' ? (
            <InboxMails /> 
          ) : selectedCategory === 'drafts' ? ( 
            <Drafts />
          ) : (
            <EmailView category={selectedCategory} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
