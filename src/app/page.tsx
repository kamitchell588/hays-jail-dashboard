'use client';

import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import './globals.css';

type JailData = {
  date: string;
  total_population: number;
  pretrial_population: number;
  sentenced_population: number;
  avg_length_of_stay_days: number;
  felonies: number;
  misdemeanors: number;
  holds: number;
  other: number;
  // Optionally extend with booking/release later
};

export default function Dashboard() {
  const [data, setData] = useState<JailData[]>([]);

  useEffect(() => {
    fetch('/jail_daily_with_booking_release.csv')
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (results) => {
            setData(results.data as JailData[]);
          },
        });
      });
  }, []);

  const latest = data[data.length - 1] || {
    total_population: 0,
    pretrial_population: 0,
    avg_length_of_stay_days: 0,
  };

  const pretrialPercent =
    latest.total_population > 0
      ? ((latest.pretrial_population / latest.total_population) * 100).toFixed(1)
      : '0';

  // Demo booking/release: Fake values based on changes in population
  const bookingReleaseData = data.map((d, i) => {
    const prev = data[i - 1] || d;
    const change = d.total_population - prev.total_population;
    return {
      date: d.date,
      bookings: Math.max(0, change + 10), // simulate ~10 releases per day
      releases: Math.max(0, 10 - change), // inverse of above
    };
  });

  return (
    <main className="p-6 space-y-10">
      <h1 className="text-2xl font-bold">Hays County Jail Dashboard</h1>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-sm text-gray-500">Total Population</h2>
          <p className="text-2xl font-bold">{latest.total_population}</p>
        </div>
        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-sm text-gray-500">Pretrial %</h2>
          <p className="text-2xl font-bold">{pretrialPercent}%</p>
        </div>
        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-sm text-gray-500">Avg Length of Stay</h2>
          <p className="text-2xl font-bold">
            {latest.avg_length_of_stay_days} days
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">Daily Jail Population</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 10 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="total_population" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">Charge Breakdown</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 10 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="felonies" stackId="a" fill="#8884d8" />
            <Bar dataKey="misdemeanors" stackId="a" fill="#82ca9d" />
            <Bar dataKey="holds" stackId="a" fill="#ffc658" />
            <Bar dataKey="other" stackId="a" fill="#ff8042" />
          </BarChart>
        </ResponsiveContainer>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">📊 Bookings vs Releases (Demo)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={bookingReleaseData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 10 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="bookings" fill="#2b6cb0" />
            <Bar dataKey="releases" fill="#68d391" />
          </BarChart>
        </ResponsiveContainer>
      </section>
    </main>
  );
}
