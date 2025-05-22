import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

function LoginForm({ sentOtp }) {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState('');
  const [idError, setIdError] = useState('');

  const emailRegex = /(.+)@(.+){2,}\.(.+){2,}/;

  const footerMenu = [
    { icon: 'images/creditcard_check_icon.png', name: 'Instant TruckPass Issuance ' },
    { icon: 'images/export_shield_tick_icon.png', name: 'Secure and Protected' },
    { icon: 'images/access_anywhere_icon.png', name: 'Access Anytime, Anywhere' },
    { icon: 'images/arrows_right_icon.png', name: 'Smooth Border Entry' }
  ]

  const Carousel = ({ menu }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % menu.length);
      }, 3000);

      return () => clearInterval(timer);
    }, [menu.length, 3000]);

    const nextSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % menu.length);
    };

    const prevSlide = () => {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + menu.length) % menu.length
      );
    };


    return (
      <div className="relative w-full max-w-lg mx-auto">
        <div className="overflow-hidden">
          <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {menu.map((opt, index) => (
              <div key={index} className="flex-shrink-0 w-full space-y-3">
                <img src={opt.icon} alt={`${opt.name}`} className="h-16 w-16 place-self-center" />
                <p class="text-normal font-[500] text-[#8972b9] place-self-center">{opt.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div class="flex justify-between items-center">
          <button onClick={prevSlide} className="h-20 font-[700] text-[#7F56D9] p-2 rounded-full"> ❮ </button>
          <div class={`h-3 w-3 rounded-lg ${currentIndex!==0 ? 'bg-[#c0b0e2]' : 'bg-[#8d5ff0]'}`}></div>
          <div class={`h-3 w-3 rounded-lg ${currentIndex!==1 ? 'bg-[#c0b0e2]' : 'bg-[#8d5ff0]'}`}></div>
          <div class={`h-3 w-3 rounded-lg ${currentIndex!==2 ? 'bg-[#c0b0e2]' : 'bg-[#8d5ff0]'}`}></div>
          <div class={`h-3 w-3 rounded-lg ${currentIndex!==3 ? 'bg-[#c0b0e2]' : 'bg-[#8d5ff0]'}`}></div>
          <button onClick={nextSlide} className="h-20 font-[700] text-[#7F56D9] p-2 rounded-full"> ❯ </button>
        </div>
      </div>
    );
  };


  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Backspace") {
      setInputValue(inputValue.pop());
    }
    if (e.key === "Enter") {
      handleLogin();
      e.preventDefault()
    }
  };

  const handleLogin = () => {
    if (!inputValue) {
      setIdError('*Email is required');
      return false;
    } else if (!emailRegex.test(inputValue)) {
      setIdError('*Please enter a valid email address');
      return false;
    }
    setIdError('');
    sentOtp();
    return true;
  };

  return (
    <div className="flex flex-col space-y-3">
      <div className="md:flex gap-x-6 mb-[0.2rem] md:justify-between">
        <img src='images/truck_pass_welcome_page.png' alt='welcomeImage' className="h-[220px] md:h-[350px] lg:h-[460px] xl:h-[560px] w-full md:w-[66%]" />

        <div className="bg-white flex items-center w-[30%]">
          <div className="w-full max-w-sm space-y-2 md:space-y-4 py-5 px-3 md:p-0">
            <h2 className="md:text-lg xl:text-2xl 2xl:text-3xl font-bold mb-2 text-[#101828]">Log In</h2>
            <form className="space-y-4 w-full">
              <div>
                <input
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  type="text"
                  placeholder="Enter Your Email ID"
                  className="md:text-xs lg:text-sm sm:w-[70%] xl:w-[84%] px-4 py-1.5 border border-[#D0D5DD] rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 font-semibold"
                />
                {idError && <div className="text-red-700 text-xs lg:text-sm">{idError}</div>}
              </div>
              <button type="button" onClick={handleLogin}
                className={`${!inputValue ? 'bg-[#b1b0b2] cursor-default' : 'bg-purple-600 hover:bg-[#7F56D9] cursor-pointer'} text-xs lg:text-sm w-[120px] md:w-[81%] font-semibold py-1.5 text-white rounded-sm md:rounded-md hover:transition bg-opacity-100`}>
                Log in with OTP
              </button>
            </form>
          </div>
        </div>
      </div >
      <div className="hidden md:flex justify-evenly py-6 lg:h-[7rem] 2xl:h-[8rem]">
        {footerMenu.map((item) => {
          return (
            <div className="flex-col space-y-[4%] sm:text-xs lg:text-sm 2xl:text-xl">
              <img src={item.icon} className="h-[55%] sm:h-[45%] place-self-center border-[2px] border-[#DFDCE6] p-1.5 rounded-md" />
              <p className="text-[#292437] place-self-center text-center font-semibold md:w-[6rem] lg:w-full">{item.name}</p>
            </div>
          )
        })}
      </div>
      <div className="p-4 md:hidden">
        <Carousel menu={footerMenu} />
      </div>
    </div>
  );
}

export default LoginForm;