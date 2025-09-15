'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function TopChargesChart() {
  // TODO: Replace with real API data - mock data for demo purposes
  const topChargesData = [
    {
      charge: 'Burglary (2nd degree)',
      total: 45,
      white: 18,
      hispanic: 16,
      black: 9,
      other: 2,
      male: 35,
      female: 10,
      age18_24: 8,
      age25_34: 18,
      age35_44: 12,
      age45plus: 7
    },
    {
      charge: 'Possession (Class B)',
      total: 38,
      white: 15,
      hispanic: 14,
      black: 7,
      other: 2,
      male: 28,
      female: 10,
      age18_24: 12,
      age25_34: 15,
      age35_44: 8,
      age45plus: 3
    },
    {
      charge: 'Assault (3rd degree)',
      total: 32,
      white: 13,
      hispanic: 11,
      black: 6,
      other: 2,
      male: 24,
      female: 8,
      age18_24: 6,
      age25_34: 13,
      age35_44: 9,
      age45plus: 4
    },
    {
      charge: 'DWI (Class B)',
      total: 28,
      white: 12,
      hispanic: 10,
      black: 4,
      other: 2,
      male: 20,
      female: 8,
      age18_24: 3,
      age25_34: 11,
      age35_44: 10,
      age45plus: 4
    },
    {
      charge: 'Theft (Class A)',
      total: 24,
      white: 10,
      hispanic: 8,
      black: 4,
      other: 2,
      male: 16,
      female: 8,
      age18_24: 7,
      age25_34: 9,
      age35_44: 6,
      age45plus: 2
    }
  ];

  // Data formatted for race breakdown stacked bars
  const raceData = topChargesData.map(item => ({
    charge: item.charge.split(' (')[0], // Shorter labels
    White: item.white,
    Hispanic: item.hispanic,
    Black: item.black,
    Other: item.other
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Top Charges by Degree of Charge
        </h3>
        <p className="text-sm text-gray-600">
          Most common charges with demographic breakdown
        </p>
      </div>

      <div className="mb-6">
        <h4 className="text-md font-medium text-gray-800 mb-3">Total Counts</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 font-medium text-gray-900">Charge</th>
                <th className="text-right py-2 font-medium text-gray-900">Total</th>
                <th className="text-right py-2 font-medium text-gray-600">Male</th>
                <th className="text-right py-2 font-medium text-gray-600">Female</th>
              </tr>
            </thead>
            <tbody>
              {topChargesData.map((item, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-2 text-gray-900">{item.charge}</td>
                  <td className="py-2 text-right font-medium text-gray-900">{item.total}</td>
                  <td className="py-2 text-right text-gray-600">{item.male}</td>
                  <td className="py-2 text-right text-gray-600">{item.female}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium text-gray-800 mb-3">Breakdown by Race</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={raceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="charge" 
              angle={-45}
              textAnchor="end"
              height={60}
              fontSize={12}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="White" stackId="race" fill="#3b82f6" />
            <Bar dataKey="Hispanic" stackId="race" fill="#22c55e" />
            <Bar dataKey="Black" stackId="race" fill="#f59e0b" />
            <Bar dataKey="Other" stackId="race" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
        <p className="text-xs text-yellow-700">
          <strong>Demo Data:</strong> This chart uses synthetic data for demonstration. 
          In production, this would display actual charge data from your jail management system.
        </p>
      </div>
    </div>
  );
}