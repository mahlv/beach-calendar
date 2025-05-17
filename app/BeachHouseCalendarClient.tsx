'use client';

import dynamic from 'next/dynamic';

const BeachHouseCalendar = dynamic(
  () => import('@/components/beach-house-calendar'),
  { ssr: false }
);

export default function BeachHouseCalendarClient() {
  return <BeachHouseCalendar />;
}
