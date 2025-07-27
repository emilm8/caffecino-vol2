import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci'; 
import { IoIosArrowBack } from 'react-icons/io';
import { GoSearch } from 'react-icons/go';


function MenuHeader() {
  const [open, setOpen] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState('az');

  const handleLanguage = (lang) => {
    setActiveLanguage(lang);
    setOpen(false);
  };

  return (
    <header className="border border-b-[#919660] shadow-[0_2px_8px_#91966050] py-1 bg-[#919660]">
      <div className="flex justify-between items-center max-w-500 mx-auto px-4">
        <div>
            <Link to="/">
                <IoIosArrowBack className='text-white text-2xl ' />
            </Link>

        </div>
         <div className="w-14 h-14">
          <Link to="/">
             <img src="/images/caffecino.png" alt="Logo" className='h-14 w-14'/> 
          </Link>
        </div>
        <div>
            <GoSearch className='text-white text-2xl' />

        </div>
       
      </div>
    </header>
  );
}

export default MenuHeader;
