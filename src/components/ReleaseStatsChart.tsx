'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ReleaseStatsChart() {
  // TODO: Replace with real API data - mock data for demo purposes
  const releaseStatsData = [
    {
      month: 'Jan',
      pretrialProgram: 18,
      mentalHealthProgram: 6,
      timeServed: 45,
      other: 12
    },
    {
      month: 'Feb',
      pretrialProgram: 22,
      mentalHealthProgram: 8,
      timeServed: 52,
      other: 14
    },
    {
      month: 'Mar',
      pretrialProgram: 20,
      mentalHealthProgram: 7,
      timeServed: 48,
      other: 11
    },
    {
      month: 'Apr',
      pretrialProgram: 25,
      mentalHealthProgram: 9,
      timeServed: 55,
      other: 16
    },
    {
      month: 'May',
      pretrialProgram: 23,
      mentalHealthProgram: 8,
      timeServed: 51,
      other: 13
    },
    {
      month: 'Jun',
      pretrialProgram: 27,
      mentalHealthProgram: 11,
      timeServed: 58,
      other: 15
    },
    {
      month: 'Jul',
      pretrialProgram: 24,
      mentalHealthProgram: 9,
      timeServed: 53,
      other: 14
    },
    {
      month: 'Aug',
      pretrialProgram: 21,
      mentalHealthProgram: 10,
      timeServed: 49,
      other: 12
    },
    {
      month: 'Sep',
      pretrialProgram: 26,
      mentalHealthProgram: 8,
      timeServed: 56,
      other: 15
    },
    {
      month: 'Oct',
      pretrialProgram: 28,
      mentalHealthProgram: 12,
      timeServed: 61,
      other: 17
    },
    {
      month: 'Nov',
      pretrialProgram: 25,
      mentalHealthProgram: 10,
      timeServed: 54,
      other: 14
    },
    {
      month: 'Dec',
      pretrialProgram: 29,
      mentalHealthProgram: 11,
      timeServed: 59,
      other: 16
    }
  ];

  // Calculate totals for summary
  const totalReleases = releaseStatsData.reduce((sum, month) => 
    sum + month.pretrialProgram + month.mentalHealthProgram + month.timeServed + month.other, 0
  );

  const categoryTotals = releaseStatsData.reduce((acc, month) => ({
    pretrialProgram: acc.pretrialProgram + month.pretrialProgram,
    mentalHealthProgram: acc.mentalHealthProgram + month.mentalHealthProgram,
    timeServed: acc.timeServed + month.timeServed,
    other: acc.other + month.other
  }), { pretrialProgram: 0, mentalHealthProgram: 0, timeServed: 0, other: 0 });

  const categoryPercentages = {
    pretrialProgram: Math.round((categoryTotals.pretrialProgram / totalReleases) * 100),
    mentalHealthProgram: Math.round((categoryTotals.mentalHealthProgram / totalReleases) * 100),
    timeServed: Math.round((categoryTotals.timeServed / totalReleases) * 100),
    other: Math.round((categoryTotals.other / totalReleases) * 100)
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Release Statistics (Program-Based)
        </h3>
        <p className="text-sm text-gray-600">
          Monthly release breakdown by program type and reason
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-xl font-bold text-blue-600">{categoryTotals.pretrialProgram}</div>
          <div className="text-xs text-blue-700">Pretrial Program</div>
          <div className="text-xs text-blue-600">{categoryPercentages.pretrialProgram}% of releases</div>
        </div>
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="text-xl font-bold text-green-600">{categoryTotals.mentalHealthProgram}</div>
          <div className="text-xs text-green-700">Mental Health</div>
          <div className="text-xs text-green-600">{categoryPercentages.mentalHealthProgram}% of releases</div>
        </div>
        <div className="text-center p-3 bg-yellow-50 rounded-lg">
          <div className="text-xl font-bold text-yellow-600">{categoryTotals.timeServed}</div>
          <div className="text-xs text-yellow-700">Time Served</div>
          <div className="text-xs text-yellow-600">{categoryPercentages.timeServed}% of releases</div>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-xl font-bold text-gray-600">{categoryTotals.other}</div>
          <div className="text-xs text-gray-700">Other</div>
          <div className="text-xs text-gray-600">{categoryPercentages.other}% of releases</div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={releaseStatsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis label={{ value: 'Releases', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="pretrialProgram" stackId="releases" name="Pretrial Program" fill="#3b82f6" />
          <Bar dataKey="mentalHealthProgram" stackId="releases" name="Mental Health Program" fill="#22c55e" />
          <Bar dataKey="timeServed" stackId="releases" name="Time Served" fill="#f59e0b" />
          <Bar dataKey="other" stackId="releases" name="Other" fill="#6b7280" />
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-6">
        <h4 className="text-sm font-medium text-gray-800 mb-3">Release Categories</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                <span className="font-medium text-blue-800">Pretrial Program</span>
                <span className="text-blue-600">{categoryPercentages.pretrialProgram}%</span>
              </div>
              <div className="text-xs text-blue-700 ml-2">
                Released to pretrial supervision, electronic monitoring, or community programs
              </div>
            </div>
            <div className="space-y-2 mt-4">
              <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                <span className="font-medium text-green-800">Mental Health Program</span>
                <span className="text-green-600">{categoryPercentages.mentalHealthProgram}%</span>
              </div>
              <div className="text-xs text-green-700 ml-2">
                Released to mental health treatment facilities or community programs
              </div>
            </div>
          </div>
          <div>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                <span className="font-medium text-yellow-800">Time Served</span>
                <span className="text-yellow-600">{categoryPercentages.timeServed}%</span>
              </div>
              <div className="text-xs text-yellow-700 ml-2">
                Completed sentence, charges dismissed, or bond posted
              </div>
            </div>
            <div className="space-y-2 mt-4">
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="font-medium text-gray-800">Other</span>
                <span className="text-gray-600">{categoryPercentages.other}%</span>
              </div>
              <div className="text-xs text-gray-700 ml-2">
                Transfer to other facilities, court orders, or administrative releases
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
        <p className="text-xs text-yellow-700">
          <strong>Demo Data:</strong> This chart displays synthetic release statistics data. 
          In production, this would track actual release reasons and program outcomes from your jail management system.
        </p>
      </div>
    </div>
  );
}