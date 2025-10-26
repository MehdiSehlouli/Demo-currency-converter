import React, { useState, useEffect } from 'react';
import LockToggleButton from './ui/LockToggleButton';

const RateDisplay = ({ onRateUpdate }) => {
    // Rate Euro_to_USD initially set to 1.1
    const [currentRate, setCurrentRate] = useState(1.1);
    // Lock state for fixed rate
    const [isLocked, setIsLocked] = useState(false);
    // Fixed rate when locked
    const [fixedRate, setFixedRate] = useState(null);
    // Input value as string for typing 
    const [fixedRateInput, setFixedRateInput] = useState('');

    useEffect(() => {
        const intervalId = setInterval(() => {
        // random (between -0.05 and +0.05)
        const randomChange = (Math.random() * 0.10) - 0.05; 
        
        setCurrentRate(prevRate => {
            const newRate = 1.1 + randomChange;
            return newRate;
        });
        
        }, 3000); // Call every 3 seconds

        // Cleanup function
        return () => clearInterval(intervalId);
    }, []);

  // Auto-lock/unlock based on 2% threshold
    useEffect(() => {
        if (fixedRate) {
            const percentageDiff = Math.abs((currentRate - fixedRate) / fixedRate) * 100;
            console.log('Percentage Difference:', percentageDiff);
            if (percentageDiff <= 2) {
                // Auto-lock: rate is within 2%
                setIsLocked(true);
            } else {
                // Auto-unlock: rate has changed more than 2%
                setIsLocked(false);
            }
        }
    }, [currentRate, fixedRate]); 

  // Callback: onRateUpdate with rate info
  useEffect(() => {
    if (onRateUpdate) {
      const rateInfo = {
        conversionRate: isLocked ? fixedRate : currentRate,
        liveRate: currentRate,
        isFixed: isLocked
      };
      onRateUpdate(rateInfo);
    }
  }, [currentRate, isLocked, fixedRate]);

  const handleFixedRateChange = (e) => {
    const inputValue = e.target.value;
    setFixedRateInput(inputValue); 
    
    const newRate = parseFloat(inputValue);
    if (!isNaN(newRate) && newRate > 0) {
      setFixedRate(newRate);
    }
  };


  return (
    <div className="bg-indigo-600 shadow-xl rounded-xl p-6 text-center relative">
      
      {/* Lock */}
        <div className="absolute top-4 right-4">
            <LockToggleButton isLocked={isLocked} />
        </div>

        <h2 className="text-sm font-semibold uppercase text-indigo-200 tracking-wider">
            {isLocked ? 'Taux de change EUR/USD fixé' : 'Taux de change EUR/USD en direct'}
        </h2>
        
        {/* Always show input field for fixed rate */}
        <div className="mt-2 text-white relative">
            <div className="flex items-center justify-center gap-4">
                <span className="text-lg font-semibold text-indigo-200">EUR</span>
                <div className="flex-1 relative">
                    <input
                      type="text"
                      value={fixedRateInput}
                      onChange={handleFixedRateChange}
                      className="bg-transparent border-b-2 border-white/50 text-4xl font-extrabold tracking-tight text-white text-center w-full focus:border-white focus:outline-none hover:border-white/70 transition-colors"
                      placeholder="1.1000"
                    />
                </div>
                <span className="text-lg font-semibold text-indigo-200">USD</span>
            </div>
            <div className="text-center mt-1">
                <span className="text-xs text-indigo-300">1 Euro = ? Dollars</span>
            </div>
        </div>
        <p className="text-indigo-200 mt-1 text-sm">
            Taux fixe (entrez votre taux souhaité)
        </p>
        
        {/* Always show live rate */}
        <div className="mt-4 p-3 bg-indigo-500/30 rounded-lg">
            <p className="text-indigo-100 text-xs uppercase tracking-wide mb-1">Taux en direct</p>
            <p className="text-white text-2xl font-semibold">
            {currentRate.toFixed(4)}
            </p>
        </div>
    </div>
  )
}

export default RateDisplay