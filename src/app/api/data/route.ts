import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import Papa from 'papaparse';

export interface JailData {
  date: string;
  total_population: number;
  pretrial_population: number;
  sentenced_population: number;
  avg_length_of_stay_days: number;
  felonies: number;
  misdemeanors: number;
  holds: number;
  other: number;
}

export async function GET() {
  try {
    const csvPath = path.join(process.cwd(), 'public', 'data', 'jail_daily.csv');
    const csvContent = await fs.readFile(csvPath, 'utf-8');
    
    const parseResult = Papa.parse<JailData>(csvContent, {
      header: true,
      skipEmptyLines: true,
      transform: (value, field) => {
        if (field === 'date') return value;
        return parseFloat(value) || 0;
      }
    });

    if (parseResult.errors.length > 0) {
      console.error('CSV parsing errors:', parseResult.errors);
      return NextResponse.json(
        { error: 'Error parsing CSV file' }, 
        { status: 500 }
      );
    }

    const data = parseResult.data.map(row => ({
      date: row.date,
      total_population: Number(row.total_population),
      pretrial_population: Number(row.pretrial_population),
      sentenced_population: Number(row.sentenced_population),
      avg_length_of_stay_days: Number(row.avg_length_of_stay_days),
      felonies: Number(row.felonies),
      misdemeanors: Number(row.misdemeanors),
      holds: Number(row.holds),
      other: Number(row.other)
    }));

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading CSV file:', error);
    return NextResponse.json(
      { error: 'Failed to read CSV file' }, 
      { status: 500 }
    );
  }
}