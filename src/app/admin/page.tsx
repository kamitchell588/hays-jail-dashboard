'use client';

import { useState } from 'react';
import BrandHeader from '@/components/BrandHeader';
import BrandFooter from '@/components/BrandFooter';

export default function AdminPage() {
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setUploadStatus('✅ Demo: CSV received. In production, this writes to secure storage and reindexes.');
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setUploadStatus('✅ Demo: CSV received. In production, this writes to secure storage and reindexes.');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <BrandHeader />
      
      <main className="flex-1 bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 mb-8">
              Upload new jail data CSV files (Demo Mode)
            </p>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">CSV File Upload</h2>
              
              <form onSubmit={handleFileUpload}>
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    isDragging 
                      ? 'border-brand-500 bg-brand-50' 
                      : 'border-gray-300 hover:border-brand-400'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div className="text-gray-500 mb-4">
                    <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <p className="text-lg font-medium text-gray-700 mb-2">
                    Drop your CSV file here or click to browse
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    Supports .csv files with jail population data
                  </p>
                  <input
                    type="file"
                    accept=".csv"
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="inline-block bg-brand-500 text-white px-4 py-2 rounded-md hover:bg-brand-600 cursor-pointer transition-colors"
                  >
                    Choose File
                  </label>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="submit"
                    className="bg-accent-500 text-white px-6 py-2 rounded-md hover:bg-accent-600 transition-colors"
                  >
                    Upload CSV
                  </button>
                </div>
              </form>

              {uploadStatus && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-green-800 font-medium">
                    {uploadStatus}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <h3 className="font-medium text-yellow-800 mb-2">Demo Mode Notice</h3>
              <p className="text-yellow-700 text-sm">
                This is a demonstration interface. In production, uploaded files would be validated, 
                processed securely, and trigger automatic dashboard updates.
              </p>
            </div>
          </div>
        </div>
      </main>

      <BrandFooter />
    </div>
  );
}