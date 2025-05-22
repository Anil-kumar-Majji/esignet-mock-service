import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useOutsideClick from '../appUtils/UseOutsideClick';

const languages = {
    en: { code: "en", label: "English" },
    es: { code: "es", label: "Español" },
    fr: { code: "fr", label: "Français" },
};

const Navbar = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { i18n, t } = useTranslation();
    const [selectedLanguage, setSelectedLanguage] = useState(languages[i18n.language]);
    const langDropdownRef = useRef(null);
    const navigator = useNavigate();

    useOutsideClick(langDropdownRef, () => setDropdownOpen(false));

    const handleLanguageChange = (e) => {
        i18n.changeLanguage(e.target.id);
        setDropdownOpen(!isDropdownOpen);
        setSelectedLanguage(languages[e.target.id]);
    }

    const handleNavOptions = (e) => {
        let id = e.target.id;
        if (id === 'home') {
            navigator('/login');
            localStorage.setItem("isAuthenticated", "false");
        }
        if (id === 'home') {
            navigator('/login');
        }
    };

    return (
        <nav className="w-full bg-[#FFFFFF] p-[4%] px-[3%] md:py-[1.2%] text-black flex items-center justify-between">
            <div className={`absolute flex-col md:hidden  ${isOpen ? 'w-36 p-[5%] left-0 bg-[#FFFFFF] top-0' : 'w-4 top-0'} duration-500`}>
                <div className={`space-y-1 cursor-pointer ${isOpen ? 'ml-[84%]' : 'ml-[4%] mt-3.5'} duration-700`} onClick={() => setIsOpen(!isOpen)}>
                    <div className='w-[17px] border-[#000000] border'></div>
                    <div className='w-[17px] border-[#000000] border'></div>
                    <div className='w-[17px] border-[#000000] border'></div>
                </div>
                <div className={`${isOpen ? 'flex-col gap-y-4 h-[300px] mt-4' : 'hidden'}`}>
                    <p>Home</p>
                    <p>Help</p>
                </div>
            </div>

            <img src='images/truck_pass_apply_title.png' className='w-[150px] ml-7 md:ml-0 md:w-[200px] lg:w-[275px] xl:w-[380px]' />
            <div className="flex space-x-6 text-[#202020] ">
                <div onClick={handleNavOptions} className="flex space-x-2 md:space-x-4 lg:space-x-6 xl:space-x-9 items-center text-[10px] sm:text-sm md:text-normal lg:text-lg xl:text-xl">
                    <button id='home' className='hidden md:flex cursor-pointer font-semibold'>Home</button>
                    <button id='help' className='hidden md:flex cursor-pointer font-semibold'>Help</button>
                    <div className="relative inline-block text-left" ref={langDropdownRef}>
                        <button
                            onClick={() => setDropdownOpen(!isDropdownOpen)}
                            className="flex items-center rounded-lg font-semibold cursor-pointer sm:text-sm md:text-normal lg:text-lg 2xl:text-2xl"
                        >
                            <img src='images/globe_icon.png' alt='dropdown_icon' className='h-[12px] md:h-[16px] lg:h-[18px] xl:h-[20px] px-1' />
                            <p class="text-[10px] sm:text-sm md:text-normal lg:text-lg xl:text-xl">{selectedLanguage.label}</p>
                            <img src='images/dropdown_icon.png' alt='dropdown_icon' className='h-[5px] md:h-[7px] lg:h-auto lg:pt-1 px-1' />
                        </button>

                        {isDropdownOpen && (
                            <div className="flex absolute mt-[1%] w-[66px] md:w-[90px] lg:w-[108px] bg-white rounded-b-lg shadow-lg z-30 border-r border-l duration-500">
                                <ul className="py-1 duration-200 w-full" onClick={handleLanguageChange}>
                                    <li id='en' className="px-2 py-2 hover:bg-gray-100 cursor-pointer">English</li>
                                    <li id='fr' className="px-2 py-2 hover:bg-gray-100 cursor-pointer">French</li>
                                    <li id='ar' className="px-2 py-2 hover:bg-gray-100 cursor-pointer">Arabic</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
                {/* <NavbarItem label="Home" to="/" />
        <NavbarItem label="About" to="/about" />
        <NavbarItem label="Contact" to="/contact" /> */}
            </div>
        </nav>
    );
};

export default Navbar;
