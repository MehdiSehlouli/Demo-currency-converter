import React from 'react'

const CurrencyInput = ({ label, value, readOnly = false, currencySymbol, onChange }) => {
  return (
    <div className="flex flex-col space-y-2 grow">
        <label className="text-sm font-medium text-gray-600">{label}</label>
        <div className="relative">
        <input
            type="text"
            value={value}
            readOnly={readOnly}
            placeholder="0.00"
            className={`w-full p-4 text-3xl font-mono border-2 rounded-lg 
            ${readOnly 
                ? 'bg-gray-100 text-gray-600 border-gray-200' 
                : 'bg-white text-gray-900 border-blue-400 focus:border-blue-600 focus:ring-blue-600'} 
            transition duration-150 ease-in-out`}
            onChange={readOnly ? undefined : onChange} 
        />
        {/* Currency designation inside the field */}
        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-lg font-bold text-gray-400">
            {currencySymbol}
        </span>
        </div>
    </div>
  )
}

export default CurrencyInput