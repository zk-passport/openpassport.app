import MapChart from '@/components/map/home-map';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Coverage map',
  description: 'World map of proof of passport coverage',
};

export default function GlobalMap() {
  return (
    <>
      <main className={`main -mt-3 relative`}>
        <MapChart />
      </main>
    </>
  );
}
