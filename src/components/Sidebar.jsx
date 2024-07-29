import React, { useState } from 'react';
import {
  FaHome,
  FaInbox,
  FaStar,
  FaRegEdit,
  FaAddressBook,
  FaBug,
  FaTrashAlt,
  FaPaperPlane,
  FaBars,
  FaArrowLeft,
} from 'react-icons/fa';
import ComposeDialog from './ComposeDialog';

const Sidebar = ({ setSelectedCategory, isSidebarOpen, setIsSidebarOpen }) => {
  const [activeButton, setActiveButton] = useState(null);
  const [isComposeOpen, setIsComposeOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleButtonClick = (button) => {
    setActiveButton(button.label);
    if (button.label === 'Compose') {
      setIsComposeOpen(true);
    } else {
      setSelectedCategory(button.label.toLowerCase());
    }
  };

  const buttons = [
    { icon: FaRegEdit, label: 'Compose' },
    { icon: FaPaperPlane, label: 'Sent' },
    { icon: FaInbox, label: 'Inbox' },
    { icon: FaStar, label: 'Starred' },
    { icon: FaAddressBook, label: 'Contacts' },
    { icon: FaHome, label: 'Drafts' },
    { icon: FaBug, label: 'Spam' },
    { icon: FaTrashAlt, label: 'Bin' },
  ];

  return (
    <div className="flex">
      <div
        className={`fixed h-full z-10 bg-red-600 text-white transition-width duration-300 ease-in-out ${
          isSidebarOpen ? 'w-60' : 'w-14'
        }`}
      >
        <div className="flex flex-col h-full">
          <button
            onClick={toggleSidebar}
            className="p-4 text-white hover:text-black focus:outline-none"
          >
            {isSidebarOpen ? <FaArrowLeft /> : <FaBars />}
          </button>
          <div className="mt-4 flex-grow flex flex-col">
            <ul className="w-full">
              {buttons.map((button, index) => {
                const Icon = button.icon;
                const isActive = activeButton === button.label;

                return (
                  <li
                    key={index}
                    className={`flex items-center p-4 relative group cursor-pointer transition-transform duration-300 ease-in-out ${
                      isActive ? 'scale-110' : 'hover:scale-110'
                    }`}
                    onClick={() => handleButtonClick(button)}
                  >
                    <Icon className="mr-2" />
                    {isSidebarOpen && <span className="relative">{button.label}</span>}
                    <span
                      className={`absolute left-0 top-0 h-full w-full transition-opacity duration-300 bg-gradient-to-r from-white to-transparent ${
                        isActive ? 'opacity-30' : 'opacity-0 group-hover:opacity-10'
                      }`}
                      style={{ borderLeftWidth: '2px' }}
                    ></span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <ComposeDialog isOpen={isComposeOpen} onClose={() => setIsComposeOpen(false)} />
    </div>
  );
};

export default Sidebar;
