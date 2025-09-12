import { NextResponse } from 'next/server';

export async function GET() {
  try {
    return NextResponse.json({
      status: 'OK',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      message: 'API is working correctly'
    });
  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Test API failed',
        details: String(error)
      }, 
      { status: 500 }
    );
  }
}