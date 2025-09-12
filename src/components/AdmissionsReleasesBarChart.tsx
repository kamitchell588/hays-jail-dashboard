'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { JailData } from '@/app/api/data/route';

interface AdmissionsReleasesBarChartProps {
  data: JailData[];
}

export default function AdmissionsReleasesBarChart({ data }: AdmissionsReleasesBarChartProps) {
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
        <BarChart data={formattedData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
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
            formatter={(value: number, name: string) => [value, name === 'admissions' ? 'Admissions' : 'Releases']}
          />
          <Legend />
          <Bar 
            dataKey="admissions" 
            fill="#10b981" 
            name="Admissions"
          />
          <Bar 
            dataKey="releases" 
            fill="#f59e0b" 
            name="Releases"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}