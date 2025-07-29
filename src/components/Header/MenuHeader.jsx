import React from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { GoSearch } from 'react-icons/go';

function MenuHeader({ onSearchToggle }) {
  return (
    <header className="border-b-[#919660] shadow-[0_2px_8px_#91966050] py-1 bg-[#919660]">
      <div className="flex justify-between items-center max-w-500 mx-auto px-4">
        <Link to="/">
          <IoIosArrowBack className="text-white text-2xl" />
        </Link>
        <Link to="/">
          <img src="/images/caffecino.png" alt="Logo" className="h-14 w-14" />
        </Link>
        <GoSearch
          className="text-white text-2xl cursor-pointer"
          onClick={onSearchToggle}
        />
      </div>
    </header>
  );
}

export default MenuHeader;
