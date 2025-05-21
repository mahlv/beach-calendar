'use client';

import dynamic from 'next/dynamic';

const BeachHouseCalendar = dynamic(
  () => import('@/components/beach-house-calendar'),
  { ssr: false }
);

interface BeachHouseCalendarClientProps {
  isDarkMode: boolean;
}

export default function BeachHouseCalendarClient({ isDarkMode }: BeachHouseCalendarClientProps) {
  return <BeachHouseCalendar isDarkMode={isDarkMode} />;
}
