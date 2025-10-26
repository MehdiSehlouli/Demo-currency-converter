import { useState } from 'react'

import RateDisplay from './components/RateDisplay';
import ConverterBlock from './components/ConverterBlock';
import HistoryTable from './components/HistoryTable';

function App() {
  // State to store the rate data received from RateDisplay
  const [rateInfo, setRateInfo] = useState({ conversionRate: 1.1, liveRate: 1.1, isFixed: false });
  
  // State to store conversion history
  const [conversionHistory, setConversionHistory] = useState([]);

  // Callback function to update rateInfo when called by RateDisplay
  const handleRateUpdate = (newRateInfo) => {
    setRateInfo(newRateInfo);
  };

  // Function to add a new conversion to the history
  const addToHistory = (conversionData) => {
    const newEntry = {
      id: Date.now(),
      realRate: conversionData.realRate,
      fixedRate: conversionData.fixedRate?.toFixed(4) || 'N/A',
      initial: `${conversionData.initialAmount} ${conversionData.initialCurrency}`,
      calculated: `${conversionData.calculatedAmount} ${conversionData.calculatedCurrency}`
    };

    setConversionHistory(prevHistory => {
      const newHistory = [newEntry, ...prevHistory];
      return newHistory.slice(0, 5);
    });
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">

        {/* Header to separate into new component */}
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800">
            Convertisseur EUR/USD
          </h1>
        </header>

        <main className="max-w-4xl mx-auto space-y-8">
          
          {/* Live Rate Display */}
          <RateDisplay onRateUpdate={handleRateUpdate} />

          {/* Main Conversion Block */}
          <ConverterBlock rateInfo={rateInfo} onAddToHistory={addToHistory} />

          {/* History Table */}
          <HistoryTable historyData={conversionHistory} />
          
        </main>
      </div>
    </>
  )
}

export default App
