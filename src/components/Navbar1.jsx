import React, { useState } from 'react';
import { LuMailSearch } from 'react-icons/lu';
import { FaArrowRight } from 'react-icons/fa';


const Navbar1 = () => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  const search = () => {
  
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };


  return (
    <div className="top-0 flex w-full justify-between bg-red-700 p-4">
      <div className="flex flex-col justify-center text-white text-xl font-semibold">EasyMail</div>
      {/* Search bar starts here */}
      <div className="flex items-center">
        <button onClick={toggleSearch} className="bg-none focus:outline-none">
          <LuMailSearch className={`text-2xl ${searchVisible ? 'text-white' : 'text-white'}`} />
        </button>
        {searchVisible && (
          <div className="flex items-center p-1 bg-gray-200 rounded-xl ml-2">
            <input
              type="text"
              className="p-2 rounded-l bg-gray-200 text-black focus:outline-none flex-grow min-w-[30vw]"
              placeholder="Search Feature is coming soon"
            />
            <button
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={search}
              className="ml-2 p-2 rounded bg-gray-200 text-black focus:outline-none"
            >
              {isHovered ? <FaArrowRight className="text-sm" /> : 'Go'}
            </button>
          </div>
        )}
      </div>
      {/* Search bar ends here */}
      <div className="relative flex items-center ml-4">
        <button onClick={toggleDropdown} className="bg-none flex focus:outline-none">
          <img src="/profile.png" alt="Profile" className="w-8 h-8" />
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-40 bg-slate-200 rounded shadow-lg z-50">
            <ul className="flex flex-col">
              <li key="account-settings" className="p-2 w-40 hover:bg-red-700 cursor-pointer">Account Settings</li>
              <li key="logout" className="p-2 hover:bg-red-700 cursor-pointer" >Logout</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar1;
