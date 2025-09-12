'use client';

import { useState, useEffect } from 'react';

export default function DebugPage() {
  const [testResult, setTestResult] = useState<any>(null);
  const [dataResult, setDataResult] = useState<any>(null);
  const [testLoading, setTestLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);

  const testApi = async () => {
    setTestLoading(true);
    try {
      const response = await fetch('/api/test');
      const result = await response.json();
      setTestResult({
        status: response.status,
        statusText: response.statusText,
        data: result
      });
    } catch (error) {
      setTestResult({
        error: String(error)
      });
    } finally {
      setTestLoading(false);
    }
  };

  const testDataApi = async () => {
    setDataLoading(true);
    try {
      const response = await fetch('/api/data');
      const result = await response.json();
      setDataResult({
        status: response.status,
        statusText: response.statusText,
        data: Array.isArray(result) ? `${result.length} records` : result,
        sample: Array.isArray(result) && result.length > 0 ? result[0] : null
      });
    } catch (error) {
      setDataResult({
        error: String(error)
      });
    } finally {
      setDataLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Debug Dashboard
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Test API</h2>
            <button
              onClick={testApi}
              disabled={testLoading}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
              {testLoading ? 'Testing...' : 'Test /api/test'}
            </button>
            {testResult && (
              <pre className="mt-4 p-4 bg-gray-100 rounded text-sm overflow-auto">
                {JSON.stringify(testResult, null, 2)}
              </pre>
            )}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Data API</h2>
            <button
              onClick={testDataApi}
              disabled={dataLoading}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
            >
              {dataLoading ? 'Testing...' : 'Test /api/data'}
            </button>
            {dataResult && (
              <pre className="mt-4 p-4 bg-gray-100 rounded text-sm overflow-auto max-h-96">
                {JSON.stringify(dataResult, null, 2)}
              </pre>
            )}
          </div>
        </div>

        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Environment Info</h2>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Current URL:</strong> {typeof window !== 'undefined' ? window.location.href : 'Server-side'}</li>
            <li><strong>User Agent:</strong> {typeof navigator !== 'undefined' ? navigator.userAgent : 'N/A'}</li>
            <li><strong>Timestamp:</strong> {new Date().toISOString()}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}