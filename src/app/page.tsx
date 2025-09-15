'use client';

import { useState, useMemo } from 'react';
import Papa from 'papaparse';
import { useJailData } from '@/hooks/useJailData';
import KPICard from '@/components/KPICard';
import PopulationChart from '@/components/PopulationChart';
import ChargeTypesChart from '@/components/ChargeTypesChart';
import AdmissionsReleasesBarChart from '@/components/AdmissionsReleasesBarChart';
import DateRangeFilter from '@/components/DateRangeFilter';
import BrandHeader from '@/components/BrandHeader';
import BrandFooter from '@/components/BrandFooter';
import DemoCharts from '@/components/DemoCharts';
import TopChargesChart from '@/components/TopChargesChart';
import HighestChargeChart from '@/components/HighestChargeChart';
import OutsourcingChart from '@/components/OutsourcingChart';
import ServicesChart from '@/components/ServicesChart';
import ReleaseStatsChart from '@/components/ReleaseStatsChart';
import { isDemoMode } from '@/utils/env';

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
    if (!data?.length) return [];
    return data.filter(d => {
      const dd = d.date; // YYYY-MM-DD strings
      const okStart = !startDate || dd >= startDate;
      const okEnd   = !endDate   || dd <= endDate;
      return okStart && okEnd;
    });
  }, [data, startDate, endDate]);

  const handleDownload = () => {
    if (!filteredData?.length) return;
    
    // Choose column order explicitly
    const cols = [
      'date','total_population','pretrial_population','sentenced_population',
      'avg_length_of_stay_days','felonies','misdemeanors','holds','other',
      'admissions','releases'
    ];
    
    const rows = filteredData.map(r => {
      const o: any = {};
      cols.forEach(c => { o[c] = (r as any)[c]; });
      return o;
    });
    
    const csv = Papa.unparse(rows, { columns: cols });
    
    // Add UTF-8 BOM so Excel opens cleanly
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const from = startDate || 'all';
    const to   = endDate   || 'dates';
    a.href = url;
    a.download = `hays_jail_data_${from}_${to}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

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

  const showDemoCharts = isDemoMode();

  return (
    <div className="min-h-screen flex flex-col">
      <BrandHeader />
      
      <main className="flex-1 bg-gray-50">
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
          onDownloadCSV={handleDownload}
          hasData={filteredData.length > 0}
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
        
        {showDemoCharts && (
          <>
            <DemoCharts data={filteredData} />
            
            <div className="mb-8">
              <div className="mb-6 p-4 bg-brand-50 border border-brand-200 rounded-md">
                <h2 className="text-xl font-semibold text-brand-800 mb-2">Demo Mode Features</h2>
                <p className="text-brand-700 text-sm">
                  The following charts demonstrate additional RFP requirements using synthetic data. 
                  In production, these would integrate with your jail management system APIs.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <TopChargesChart />
                <HighestChargeChart />
              </div>
              
              <div className="grid grid-cols-1 gap-6 mb-8">
                <OutsourcingChart />
              </div>
              
              <div className="grid grid-cols-1 gap-6 mb-8">
                <ServicesChart />
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                <ReleaseStatsChart />
              </div>
            </div>
          </>
        )}
        </div>
      </main>
      
      <BrandFooter />
    </div>
  );
}