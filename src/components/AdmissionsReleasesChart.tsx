'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { JailData } from '@/app/api/data/route';

interface AdmissionsReleasesChartProps {
  data: JailData[];
}

export default function AdmissionsReleasesChart({ data }: AdmissionsReleasesChartProps) {
  const formattedData = data.map(item => ({
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    admissions: item.admissions,
    releases: item.releases
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Daily Admissions & Releases
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
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="admissions" 
            stroke="#10b981" 
            strokeWidth={2}
            name="Admissions"
          />
          <Line 
            type="monotone" 
            dataKey="releases" 
            stroke="#f59e0b" 
            strokeWidth={2}
            name="Releases"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}