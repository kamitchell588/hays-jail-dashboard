'use client';

interface DateRangeFilterProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  minDate?: string;
  maxDate?: string;
  onDownloadCSV?: () => void;
  hasData?: boolean;
}

export default function DateRangeFilter({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  minDate,
  maxDate,
  onDownloadCSV,
  hasData = false
}: DateRangeFilterProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
          Date Range Filter
        </h3>
        {onDownloadCSV && (
          <button
            onClick={onDownloadCSV}
            disabled={!hasData}
            className="px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm font-medium"
          >
            Download CSV
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-4">
        <div className="flex flex-col">
          <label htmlFor="start-date" className="text-sm text-gray-600 mb-1">
            Start Date
          </label>
          <input
            id="start-date"
            type="date"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
            min={minDate}
            max={maxDate}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="end-date" className="text-sm text-gray-600 mb-1">
            End Date
          </label>
          <input
            id="end-date"
            type="date"
            value={endDate}
            onChange={(e) => onEndDateChange(e.target.value)}
            min={minDate}
            max={maxDate}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}