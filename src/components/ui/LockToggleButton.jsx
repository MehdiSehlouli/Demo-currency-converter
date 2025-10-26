import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';

const LockToggleButton = ({ isLocked }) => {
  return (
    <button 
      className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
        isLocked 
          ? 'bg-indigo-500 text-white hover:bg-indigo-400' 
          : 'bg-indigo-100 text-indigo-700 hover:bg-white'
      }`}
    >
      <FontAwesomeIcon 
        icon={isLocked ? faLock : faLockOpen} 
        className="w-3 h-3"
      />
      <span className="text-xs">
        {isLocked ? 'Fixé' : 'Direct'}
      </span>
    </button>
  );
};

export default LockToggleButton;