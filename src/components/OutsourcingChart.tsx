'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function OutsourcingChart() {
  // TODO: Replace with real API data - mock data for demo purposes
  const outsourcingData = [
    { date: '2024-01-15', inmates: 22, facility: 'County A: 12, County B: 10' },
    { date: '2024-01-16', inmates: 28, facility: 'County A: 15, County B: 13' },
    { date: '2024-01-17', inmates: 25, facility: 'County A: 14, County B: 11' },
    { date: '2024-01-18', inmates: 30, facility: 'County A: 18, County B: 12' },
    { date: '2024-01-19', inmates: 27, facility: 'County A: 16, County B: 11' },
    { date: '2024-01-20', inmates: 24, facility: 'County A: 13, County B: 11' },
    { date: '2024-01-21', inmates: 26, facility: 'County A: 15, County B: 11' },
    { date: '2024-01-22', inmates: 29, facility: 'County A: 17, County B: 12' },
    { date: '2024-01-23', inmates: 23, facility: 'County A: 12, County B: 11' },
    { date: '2024-01-24', inmates: 31, facility: 'County A: 19, County B: 12' },
    { date: '2024-01-25', inmates: 26, facility: 'County A: 14, County B: 12' },
    { date: '2024-01-26', inmates: 28, facility: 'County A: 16, County B: 12' },
    { date: '2024-01-27', inmates: 25, facility: 'County A: 14, County B: 11' },
    { date: '2024-01-28', inmates: 27, facility: 'County A: 15, County B: 12' }
  ];

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const avgOutsourced = Math.round(outsourcingData.reduce((sum, item) => sum + item.inmates, 0) / outsourcingData.length);
  const maxOutsourced = Math.max(...outsourcingData.map(item => item.inmates));
  const minOutsourced = Math.min(...outsourcingData.map(item => item.inmates));

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Daily Jail Outsourcing Numbers
        </h3>
        <p className="text-sm text-gray-600">
          Inmates housed at external facilities due to capacity constraints
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{avgOutsourced}</div>
          <div className="text-xs text-blue-700">Daily Average</div>
        </div>
        <div className="text-center p-3 bg-red-50 rounded-lg">
          <div className="text-2xl font-bold text-red-600">{maxOutsourced}</div>
          <div className="text-xs text-red-700">Highest Day</div>
        </div>
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{minOutsourced}</div>
          <div className="text-xs text-green-700">Lowest Day</div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={outsourcingData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date"
            tickFormatter={formatDate}
            fontSize={11}
          />
          <YAxis 
            label={{ value: 'Outsourced Inmates', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip 
            labelFormatter={(label: string) => `Date: ${formatDate(label)}`}
            formatter={(value: number, name: string, props: any) => [
              `${value} inmates`,
              'Outsourced'
            ]}
            contentStyle={{
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '6px'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="inmates" 
            stroke="#3b82f6" 
            strokeWidth={2}
            dot={{ r: 4, fill: '#3b82f6' }}
            activeDot={{ r: 6, fill: '#1d4ed8' }}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-800 mb-2">Outsourcing Partner Facilities</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-600">
          <div>
            <div className="font-medium text-gray-700 mb-1">County A Detention</div>
            <div>Capacity: 50 inmates</div>
            <div>Distance: 25 miles</div>
            <div>Avg Daily: ~15 inmates</div>
          </div>
          <div>
            <div className="font-medium text-gray-700 mb-1">County B Facility</div>
            <div>Capacity: 30 inmates</div>
            <div>Distance: 18 miles</div>
            <div>Avg Daily: ~12 inmates</div>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
        <p className="text-xs text-yellow-700">
          <strong>Demo Data:</strong> This chart uses synthetic outsourcing data for demonstration. 
          In production, this would integrate with your capacity management and transfer tracking systems.
        </p>
      </div>
    </div>
  );
}