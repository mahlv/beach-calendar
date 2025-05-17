'use client';

import dynamic from 'next/dynamic';
import ConvexClientProvider from './ConvexClientProvider';

// Import the client component dynamically
const BeachHouseCalendarClient = dynamic(
  () => import('./BeachHouseCalendarClient'),
  { ssr: false }
);

export default function Home() {
  return (
    <ConvexClientProvider>
      <main className="min-h-screen p-4 md:p-8 bg-gradient-to-b from-sky-50 to-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-[1rem] mt-[1rem]">
            <h1 className="text-3xl font-semilight text-center font-nothing text-[5rem] text-[#6CD4FF]">Praia</h1>
            <img src="/assets/gifs/Summer-sun.gif" alt="Sun" className="w-20 h-20" />
          </div>
          <BeachHouseCalendarClient />
        </div>
      </main>
    </ConvexClientProvider>
  );
}
