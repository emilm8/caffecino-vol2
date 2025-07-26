import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaAngleDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const LANGUAGES = { // bayrag sekilleri 
  az: {
    label: 'AZ',
    flagUrl: 'https://flagcdn.com/h20/az.png',
  },
  en: {
    label: 'EN',
    flagUrl: 'https://flagcdn.com/h20/us.png',
  },
  ru: {
    label: 'RU',
    flagUrl: 'https://flagcdn.com/h20/ru.png',
  },
};

function Header() {
  const { i18n } = useTranslation('landing');
  const [open, setOpen] = useState(false);
  const [activeLang, setActiveLang] = useState(i18n.language || 'az');

  useEffect(() => {
    const stored = localStorage.getItem('lang');
    if (stored && LANGUAGES[stored] && stored !== activeLang) {
      setActiveLang(stored);
      i18n.changeLanguage(stored);
    }
  }, []);

  const handleLanguage = (lang) => {
    if (!LANGUAGES[lang]) return;
    setActiveLang(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem('lang', lang);
    setOpen(false);
  };

  return (
    <header className="bg-[#919660] shadow-[0_2px_8px_#91966050] py-2">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4">
        <Link to="/" className="flex-shrink-0">
          <img src="/images/caffecino.png" alt="Logo" className="h-10" />
        </Link>

        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 px-3 py-1 bg-[#7a8a4f] rounded-full focus:outline-none hover:bg-[#6f7c49] transition-colors"
          >
            <img
              src={LANGUAGES[activeLang].flagUrl}
              alt={activeLang}
              className="h-5 w-8 rounded-sm flex-shrink-0"
            />
            <span className="text-white font-medium text-sm">{LANGUAGES[activeLang].label}</span>
            <FaAngleDown
              className={`text-white transition-transform ${open ? 'rotate-180' : ''}`}
              size={14}
            />
          </button>

          {open && (
            <ul className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg overflow-hidden z-50">
              {Object.entries(LANGUAGES).map(([code, { label, flagUrl }]) => (
                <li
                  key={code}
                  onClick={() => handleLanguage(code)}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors"
                >
                  <img
                    src={flagUrl}
                    alt={code}
                    className="h-4 w-auto rounded-sm flex-shrink-0"
                  />
                  <span className="font-medium text-sm">{label}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
