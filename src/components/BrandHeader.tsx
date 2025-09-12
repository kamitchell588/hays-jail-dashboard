'use client';

import Image from 'next/image';
import Link from 'next/link';
import { getBrandName, isDemoMode } from '@/utils/env';

export default function BrandHeader() {
  const brandName = getBrandName();
  const showDemoPages = isDemoMode();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Image
              src="/hayscounty.png"
              alt="Hays County Logo"
              width={60}
              height={60}
              className="rounded-md"
            />
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {brandName}
              </h1>
              <p className="text-sm text-gray-600">
                Public Transparency • Updated from Sheriff's RMS
              </p>
            </div>
          </div>
          
          {showDemoPages && (
            <nav className="hidden md:flex space-x-6">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-brand-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Dashboard
              </Link>
              <Link 
                href="/admin" 
                className="text-gray-700 hover:text-brand-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Admin
              </Link>
              <Link 
                href="/training" 
                className="text-gray-700 hover:text-brand-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Training
              </Link>
              <Link 
                href="/compliance" 
                className="text-gray-700 hover:text-brand-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Compliance
              </Link>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}