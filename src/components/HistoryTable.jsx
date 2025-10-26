import React from 'react';

const HistoryTable = ({ historyData = [] }) => {
  // Show message when no history is available
  if (historyData.length === 0) {
    return (
      <div className="bg-white shadow-lg rounded-xl p-6 md:p-8 border border-gray-100">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Historique des 5 dernières conversions
        </h2>
        <div className="text-center py-8 text-gray-500">
          <p>Aucun historique de conversion pour le moment. Commencez à convertir pour voir votre historique ici !</p>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 md:p-8 border border-gray-100">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        Historique des 5 dernières conversions
      </h2>

      {/* Overflow wrapper ensures table responsiveness on small screens */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          
          <thead className="bg-gray-50">
            <tr>
              {/*Taux Réel */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Taux réel
              </th>
              {/* taux saisi (Fixed Rate) */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Taux Saisi
              </th>
              {/* Valeur Initiale & Devise */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Valeur initiale
              </th>
              {/* Valeur Calculée & Devise */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Valeur calculée
              </th>
            </tr>
          </thead>
          
          <tbody className="bg-white divide-y divide-gray-200">
            {historyData.map((item) => (
              <tr key={item.id} className="hover:bg-blue-50">
                
                {/* Real Rate */}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.realRate.toFixed(4)}
                </td>

                {/* Fixed Rate (taux saisi) */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.fixedRate}
                </td>
                
                {/* Initial Value */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.initial}
                </td>
                
                {/* Calculated Value */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.calculated}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryTable;
