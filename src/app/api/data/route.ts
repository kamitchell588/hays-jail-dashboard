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
  admissions: number;
  releases: number;
}

export async function GET() {
  try {
    console.log('API called - attempting to read CSV file');
    const csvPath = path.join(process.cwd(), 'public', 'data', 'jail_daily.csv');
    console.log('CSV path:', csvPath);
    
    // Check if file exists
    try {
      await fs.access(csvPath);
      console.log('CSV file exists');
    } catch (accessError) {
      console.error('CSV file does not exist:', accessError);
      return NextResponse.json(
        { 
          error: 'CSV file not found',
          path: csvPath,
          details: process.env.NODE_ENV === 'development' ? String(accessError) : undefined
        }, 
        { status: 404 }
      );
    }
    
    const csvContent = await fs.readFile(csvPath, 'utf-8');
    console.log('CSV file read, length:', csvContent.length);
    
    if (!csvContent || csvContent.trim().length === 0) {
      console.error('CSV file is empty');
      return NextResponse.json(
        { error: 'CSV file is empty' }, 
        { status: 500 }
      );
    }
    
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
        { 
          error: 'Error parsing CSV file',
          errors: process.env.NODE_ENV === 'development' ? parseResult.errors : undefined
        }, 
        { status: 500 }
      );
    }

    if (!parseResult.data || parseResult.data.length === 0) {
      console.error('No data parsed from CSV');
      return NextResponse.json(
        { error: 'No data found in CSV file' }, 
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
      other: Number(row.other),
      admissions: Number(row.admissions),
      releases: Number(row.releases)
    }));

    console.log('Successfully parsed', data.length, 'rows');
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json(
      { 
        error: 'Failed to read CSV file',
        details: process.env.NODE_ENV === 'development' ? String(error) : undefined
      }, 
      { status: 500 }
    );
  }
}