'use client';

import { useState, useMemo } from 'react';
import { useJailData } from '@/hooks/useJailData';
import KPICard from '@/components/KPICard';
import PopulationChart from '@/components/PopulationChart';
import ChargeTypesChart from '@/components/ChargeTypesChart';
import AdmissionsReleasesBarChart from '@/components/AdmissionsReleasesBarChart';
import DateRangeFilter from '@/components/DateRangeFilter';

export default function Home() {
  const { data, loading, error } = useJailData();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const { minDate, maxDate } = useMemo(() => {
    if (data.length === 0) return { minDate: '', maxDate: '' };
    const dates = data.map(d => d.date).sort();
    return { minDate: dates[0], maxDate: dates[dates.length - 1] };
  }, [data]);

  const filteredData = useMemo(() => {
    if (!startDate && !endDate) return data;
    
    return data.filter(item => {
      const itemDate = item.date;
      const afterStart = !startDate || itemDate >= startDate;
      const beforeEnd = !endDate || itemDate <= endDate;
      return afterStart && beforeEnd;
    });
  }, [data, startDate, endDate]);

  const kpis = useMemo(() => {
    if (filteredData.length === 0) return { 
      totalPopulation: 0, 
      pretrialPercent: 0, 
      avgLengthOfStay: 0, 
      totalAdmissions: 0, 
      totalReleases: 0, 
      avgDailyAdmissions: 0, 
      avgDailyReleases: 0 
    };
    
    const latest = filteredData[filteredData.length - 1];
    const totalPopulation = latest.total_population;
    const pretrialPercent = ((latest.pretrial_population / latest.total_population) * 100);
    const avgLengthOfStay = filteredData.reduce((sum, item) => sum + item.avg_length_of_stay_days, 0) / filteredData.length;
    
    const totalAdmissions = filteredData.reduce((sum, item) => sum + item.admissions, 0);
    const totalReleases = filteredData.reduce((sum, item) => sum + item.releases, 0);
    const avgDailyAdmissions = totalAdmissions / filteredData.length;
    const avgDailyReleases = totalReleases / filteredData.length;
    
    return { 
      totalPopulation, 
      pretrialPercent, 
      avgLengthOfStay, 
      totalAdmissions, 
      totalReleases, 
      avgDailyAdmissions, 
      avgDailyReleases 
    };
  }, [filteredData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading jail data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Jail Population Dashboard
          </h1>
          <p className="text-gray-600">
            Daily jail population and charge type analytics
          </p>
        </header>

        <DateRangeFilter
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          minDate={minDate}
          maxDate={maxDate}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <KPICard
            title="Total Population"
            value={kpis.totalPopulation}
            subtitle="Current inmates"
          />
          <KPICard
            title="Pretrial %"
            value={`${kpis.pretrialPercent.toFixed(1)}%`}
            subtitle="Awaiting trial"
          />
          <KPICard
            title="Avg Length of Stay"
            value={`${kpis.avgLengthOfStay.toFixed(1)} days`}
            subtitle="Average stay duration"
          />
          <KPICard
            title="Avg Daily Bookings"
            value={kpis.avgDailyAdmissions.toFixed(1)}
            subtitle="Per day"
          />
          <KPICard
            title="Avg Daily Releases"
            value={kpis.avgDailyReleases.toFixed(1)}
            subtitle="Per day"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <PopulationChart data={filteredData} />
          <AdmissionsReleasesBarChart data={filteredData} />
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <ChargeTypesChart data={filteredData} />
        </div>
      </div>
    </div>
  );
}