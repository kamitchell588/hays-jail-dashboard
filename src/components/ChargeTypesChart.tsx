'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { JailData } from '@/app/api/data/route';

interface ChargeTypesChartProps {
  data: JailData[];
}

export default function ChargeTypesChart({ data }: ChargeTypesChartProps) {
  const formattedData = data.map(item => ({
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    felonies: item.felonies,
    misdemeanors: item.misdemeanors,
    holds: item.holds,
    other: item.other
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Charge Types Over Time
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={formattedData}>
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
          />
          <Legend />
          <Bar dataKey="felonies" stackId="charges" fill="#dc2626" name="Felonies" />
          <Bar dataKey="misdemeanors" stackId="charges" fill="#ea580c" name="Misdemeanors" />
          <Bar dataKey="holds" stackId="charges" fill="#d97706" name="Holds" />
          <Bar dataKey="other" stackId="charges" fill="#65a30d" name="Other" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}