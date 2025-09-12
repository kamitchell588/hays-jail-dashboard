'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { JailData } from '@/app/api/data/route';

interface PopulationChartProps {
  data: JailData[];
}

export default function PopulationChart({ data }: PopulationChartProps) {
  const formattedData = data.map(item => ({
    ...item,
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Total Population Over Time
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            fontSize={12}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis fontSize={12} />
          <Tooltip 
            labelFormatter={(value) => `Date: ${value}`}
            formatter={(value: number) => [value, 'Total Population']}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="total_population" 
            stroke="#2563eb" 
            strokeWidth={2}
            name="Total Population"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}