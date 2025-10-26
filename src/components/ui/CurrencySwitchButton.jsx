import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons';

const CurrencySwitchButton = ({ onSwitch }) => {
  return (
    <div className="shrink-0">
      <button 
        onClick={onSwitch}
        className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-md transition duration-150 transform hover:scale-105"
      >
        <FontAwesomeIcon 
          icon={faArrowRightArrowLeft} 
          className="w-6 h-6"
        />
      </button>
      <p className="text-xs text-center text-gray-500 mt-1 hidden md:block">Inverser</p>
    </div>
  );
};

export default CurrencySwitchButton;