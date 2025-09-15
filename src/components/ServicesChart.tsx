'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import KPICard from '@/components/KPICard';

export default function ServicesChart() {
  // TODO: Replace with real API data - mock data for demo purposes
  const servicesOverTime = [
    { month: 'Jan', pretrialDiversion: 23, mentalHealthProgram: 8 },
    { month: 'Feb', pretrialDiversion: 28, mentalHealthProgram: 12 },
    { month: 'Mar', pretrialDiversion: 25, mentalHealthProgram: 10 },
    { month: 'Apr', pretrialDiversion: 32, mentalHealthProgram: 14 },
    { month: 'May', pretrialDiversion: 29, mentalHealthProgram: 11 },
    { month: 'Jun', pretrialDiversion: 35, mentalHealthProgram: 16 },
    { month: 'Jul', pretrialDiversion: 31, mentalHealthProgram: 13 },
    { month: 'Aug', pretrialDiversion: 27, mentalHealthProgram: 15 },
    { month: 'Sep', pretrialDiversion: 30, mentalHealthProgram: 12 },
    { month: 'Oct', pretrialDiversion: 33, mentalHealthProgram: 18 },
    { month: 'Nov', pretrialDiversion: 26, mentalHealthProgram: 14 },
    { month: 'Dec', pretrialDiversion: 29, mentalHealthProgram: 16 }
  ];

  // Current month values for KPI cards
  const currentPretrialDiversion = servicesOverTime[servicesOverTime.length - 1].pretrialDiversion;
  const currentMentalHealthProgram = servicesOverTime[servicesOverTime.length - 1].mentalHealthProgram;

  // Calculate averages
  const avgPretrial = Math.round(servicesOverTime.reduce((sum, item) => sum + item.pretrialDiversion, 0) / servicesOverTime.length);
  const avgMentalHealth = Math.round(servicesOverTime.reduce((sum, item) => sum + item.mentalHealthProgram, 0) / servicesOverTime.length);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Mental Health & Pretrial Services Statistics
          </h3>
          <p className="text-sm text-gray-600">
            Participation in specialized programs and diversion services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <KPICard
            title="Pretrial Diversion"
            value={currentPretrialDiversion}
            subtitle="Current participants"
          />
          <KPICard
            title="Mental Health Program"
            value={currentMentalHealthProgram}
            subtitle="Active in program"
          />
          <KPICard
            title="Avg Pretrial/Month"
            value={avgPretrial}
            subtitle="12-month average"
          />
          <KPICard
            title="Avg Mental Health/Month"
            value={avgMentalHealth}
            subtitle="12-month average"
          />
        </div>

        <div className="mb-4">
          <h4 className="text-md font-medium text-gray-800 mb-3">Monthly Participation Trends</h4>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={servicesOverTime} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis label={{ value: 'Participants', angle: -90, position: 'insideLeft' }} />
            <Tooltip 
              formatter={(value: number, name: string) => [
                value,
                name === 'pretrialDiversion' ? 'Pretrial Diversion' : 'Mental Health Program'
              ]}
            />
            <Bar dataKey="pretrialDiversion" name="pretrialDiversion" fill="#3b82f6" />
            <Bar dataKey="mentalHealthProgram" name="mentalHealthProgram" fill="#22c55e" />
          </BarChart>
        </ResponsiveContainer>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Pretrial Diversion Program</h4>
            <div className="text-sm text-blue-700 space-y-1">
              <div>• Supervision in lieu of custody</div>
              <div>• Court appearance compliance: 94%</div>
              <div>• Average program length: 45 days</div>
              <div>• Successful completion rate: 87%</div>
            </div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-medium text-green-800 mb-2">Mental Health Services</h4>
            <div className="text-sm text-green-700 space-y-1">
              <div>• Individual counseling sessions</div>
              <div>• Medication management</div>
              <div>• Crisis intervention support</div>
              <div>• Community resource connections</div>
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-xs text-yellow-700">
            <strong>Demo Data:</strong> This chart displays synthetic program participation data. 
            In production, this would integrate with your case management and program tracking systems.
          </p>
        </div>
      </div>
    </div>
  );
}