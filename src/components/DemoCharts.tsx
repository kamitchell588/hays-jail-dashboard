'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { JailData } from '@/app/api/data/route';

interface DemoChartsProps {
  data: JailData[];
}

export default function DemoCharts({ data }: DemoChartsProps) {
  if (!data.length) return null;

  const latest = data[data.length - 1];
  const totalPopulation = latest.total_population;

  // Generate demo race distribution
  const raceData = [
    { name: 'Hispanic', value: Math.round(totalPopulation * 0.40), percentage: 40 },
    { name: 'White', value: Math.round(totalPopulation * 0.35), percentage: 35 },
    { name: 'Black', value: Math.round(totalPopulation * 0.20), percentage: 20 },
    { name: 'Other', value: Math.round(totalPopulation * 0.05), percentage: 5 },
  ];

  // Generate demo gender distribution
  const genderData = [
    { name: 'Male', value: Math.round(totalPopulation * 0.78), percentage: 78 },
    { name: 'Female', value: Math.round(totalPopulation * 0.22), percentage: 22 },
  ];

  // Generate demo age distribution
  const ageData = [
    { name: '18-24', value: Math.round(totalPopulation * 0.18), percentage: 18 },
    { name: '25-34', value: Math.round(totalPopulation * 0.34), percentage: 34 },
    { name: '35-44', value: Math.round(totalPopulation * 0.28), percentage: 28 },
    { name: '45+', value: Math.round(totalPopulation * 0.20), percentage: 20 },
  ];

  const raceColors = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444'];
  const genderColors = ['#3b82f6', '#ec4899'];
  const ageColors = ['#22c55e', '#3b82f6', '#f59e0b', '#8b5cf6'];

  const renderCustomLabel = (entry: any) => {
    return `${entry.percentage}%`;
  };

  return (
    <div className="mb-8">
      <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
        <h3 className="font-medium text-yellow-800 mb-2">Demo Mode: Synthetic Demographics</h3>
        <p className="text-yellow-700 text-sm">
          The following charts show simulated demographic breakdowns based on total population. 
          In production, these would display real demographic data from your jail management system.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Race Distribution
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={raceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {raceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={raceColors[index % raceColors.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number, name: string) => [value, name]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Gender Distribution
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={genderData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {genderData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={genderColors[index % genderColors.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number, name: string) => [value, name]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Age Distribution
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={ageData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {ageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={ageColors[index % ageColors.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number, name: string) => [value, name]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}