import React, { useState, useEffect, useRef } from 'react';
import CurrencyInput from './CurrencyInput';
import CurrencySwitchButton from './ui/CurrencySwitchButton';

const ConverterBlock = ({ rateInfo = { conversionRate: 1.1, liveRate: 1.1, isFixed: false }, onAddToHistory }) => {
  // State isEuroInput : True is Euro to USD.
  const [isEuroInput, setIsEuroInput] = useState(true); 
  
  // Default values to start the app with
  const [inputValue, setInputValue] = useState('100.00');
  const [outputValue, setOutputValue] = useState('110.00'); 

  // Refs to detect changes for history entries
  const prevRateRef = useRef(rateInfo.conversionRate);
  const prevInputRef = useRef(inputValue); 

  // Dynamic labels based on switch state
  const inputLabel = isEuroInput 
    ? 'Montant à convertir (EUR)' 
    : 'Montant à convertir (USD)'; 
  
  const outputLabel = isEuroInput 
    ? 'Montant converti (USD)' 
    : 'Montant converti (EUR)'; 

  const inputCurrency = isEuroInput ? 'EUR' : 'USD';
  const outputCurrency = isEuroInput ? 'USD' : 'EUR';

  // Handle input value changes
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Recalculate output value whenever something changes
  useEffect(() => {
    const inputNum = parseFloat(inputValue);
    if (!isNaN(inputNum)) {
      let newOutput;
      if (isEuroInput) {
        newOutput = (inputNum * rateInfo.conversionRate).toFixed(2);
      } else {
        newOutput = (inputNum / rateInfo.conversionRate).toFixed(2);
      }
      setOutputValue(newOutput);
    }
  }, [rateInfo.conversionRate, inputValue, isEuroInput]);

  // Add to history when rate or input changes
  useEffect(() => {
    const inputNum = parseFloat(inputValue);
    if (onAddToHistory && inputNum > 0 && 
        (prevRateRef.current !== rateInfo.conversionRate || prevInputRef.current !== inputValue)) {
      
      const calculatedAmount = isEuroInput 
        ? (inputNum * rateInfo.conversionRate).toFixed(2)
        : (inputNum / rateInfo.conversionRate).toFixed(2);

      onAddToHistory({
        realRate: rateInfo.liveRate,
        fixedRate: rateInfo.isFixed ? rateInfo.conversionRate : null,
        initialAmount: inputNum.toFixed(2),
        initialCurrency: isEuroInput ? 'EUR' : 'USD',
        calculatedAmount,
        calculatedCurrency: isEuroInput ? 'USD' : 'EUR'
      });

      prevRateRef.current = rateInfo.conversionRate;
      prevInputRef.current = inputValue;
    }
  }, [rateInfo.conversionRate, inputValue, isEuroInput, onAddToHistory]);

  // Placeholder function to simulate the switch and continuity (Functionality 5)
  const handleSwitch = () => {
    setIsEuroInput(prev => !prev);
    // Continuity implementation: the new input becomes the old output
    setInputValue(outputValue);
    // The previous output value is now the input, so we clear the new output for recalculation
    // calculate
    if (isEuroInput) {
        const newOutput = (parseFloat(outputValue) / rateInfo.conversionRate).toFixed(2);
        setOutputValue(newOutput);
    } else {
        const newOutput = (parseFloat(outputValue) * rateInfo.conversionRate).toFixed(2);
        setOutputValue(newOutput);
    }
  };
  

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 md:p-8 border border-gray-100">
      <h2 className="text-xl font-semibold mb-6 text-gray-700">
        Conversion de devises (Taux: {rateInfo.conversionRate.toFixed(4)})
      </h2>

      <div className="flex flex-col md:flex-row items-center gap-6">
        
        <CurrencyInput 
          label={inputLabel} 
          value={inputValue} 
          currencySymbol={inputCurrency}
          readOnly={false} 
          onChange={handleInputChange}
        />

        {/* Switch Component  */}
        <CurrencySwitchButton onSwitch={handleSwitch} />

        <CurrencyInput 
          label={outputLabel} 
          value={outputValue}
          currencySymbol={outputCurrency}
          readOnly={true} 
        />
      </div>
    </div>
  );
};

export default ConverterBlock;
