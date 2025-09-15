'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function HighestChargeChart() {
  // TODO: Replace with real API data - mock data for demo purposes
  const highestChargesData = [
    { charge: 'Burglary (2nd degree)', count: 45 },
    { charge: 'Possession (Class B)', count: 38 },
    { charge: 'Assault (3rd degree)', count: 32 },
    { charge: 'DWI (Class B)', count: 28 },
    { charge: 'Theft (Class A)', count: 24 }
  ];

  const formatChargeName = (charge: string) => {
    return charge.split(' (')[0]; // Remove degree/class for cleaner display
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Highest Charge Distribution
        </h3>
        <p className="text-sm text-gray-600">
          Top 5 most common charges in custody
        </p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart 
          data={highestChargesData} 
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="charge"
            tickFormatter={formatChargeName}
            angle={-45}
            textAnchor="end"
            height={80}
            fontSize={11}
          />
          <YAxis />
          <Tooltip 
            formatter={(value: number, name: string) => [value, 'Count']}
            labelFormatter={(label: string) => `Charge: ${label}`}
          />
          <Bar 
            dataKey="count" 
            fill="#22c55e"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-gray-800 mb-2">Summary</h4>
            <div className="text-xs text-gray-600 space-y-1">
              <div>Total inmates with charges: {highestChargesData.reduce((sum, item) => sum + item.count, 0)}</div>
              <div>Most common: {highestChargesData[0].charge}</div>
              <div>Average per charge type: {Math.round(highestChargesData.reduce((sum, item) => sum + item.count, 0) / highestChargesData.length)}</div>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-800 mb-2">Top Charge Details</h4>
            <div className="text-xs text-gray-600 space-y-1">
              <div>Burglary cases: {highestChargesData[0].count} inmates</div>
              <div>Represents: {Math.round((highestChargesData[0].count / highestChargesData.reduce((sum, item) => sum + item.count, 0)) * 100)}% of top 5</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
        <p className="text-xs text-yellow-700">
          <strong>Demo Data:</strong> This chart displays synthetic charge distribution data. 
          In production, this would show real-time data from your records management system.
        </p>
      </div>
    </div>
  );
}