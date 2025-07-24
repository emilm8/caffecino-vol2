  import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CiSearch } from "react-icons/ci";
import { FaAngleDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Header() {
  const { i18n } = useTranslation('landing');
  const [open, setOpen] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState(i18n.language || 'az');

  useEffect(() => {
    const storedLang = localStorage.getItem('lang');
    if (storedLang && storedLang !== activeLanguage) {
      setActiveLanguage(storedLang);
      i18n.changeLanguage(storedLang);
    }
  }, []);

  function handleLanguage(lang) {
    setActiveLanguage(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem('lang', lang);
    setOpen(false);
  }

  return (
    <header className="border border-b-[#919660] shadow-[0_2px_8px_#91966050] py-1 bg-[#919660]">
      <div className="flex justify-between items-center max-w-500 mx-auto px-4">
        <div className="w-15">
          <Link to="/">
            <img src="/images/caffecino.png" alt="Logo" />
          </Link>
        </div>

 
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="text-white focus:outline-none"
          >
            <div className="flex justify-center items-center gap-2">
              <div className="p-2  flex items-center gap-2 rounded-2xl  text-white">
                <p>{activeLanguage.toUpperCase()}</p> <FaAngleDown className='transition-transform duration-300 group-hover:rotate-180' />
              </div>
            </div>
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow z-50">
              <div
                onClick={() => handleLanguage('az')}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                <p>AZ</p>

              </div>
              <div
                onClick={() => handleLanguage('en')}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                <p>EN</p>
              </div>
              <div
                onClick={() => handleLanguage('ru')}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                <p>RU</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
