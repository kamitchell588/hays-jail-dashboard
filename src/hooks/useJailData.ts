'use client';

import { useState, useEffect } from 'react';
import { JailData } from '@/app/api/data/route';

export const useJailData = () => {
  const [data, setData] = useState<JailData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching jail data from /api/data');
        const response = await fetch('/api/data');
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          const errorMessage = errorData?.error || `HTTP ${response.status}: ${response.statusText}`;
          console.error('API Error:', errorMessage, errorData);
          throw new Error(errorMessage);
        }
        
        const result = await response.json();
        console.log('Data fetched successfully:', result.length, 'records');
        
        if (!Array.isArray(result) || result.length === 0) {
          throw new Error('No data received from API');
        }
        
        setData(result);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred loading data';
        console.error('useJailData error:', errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};