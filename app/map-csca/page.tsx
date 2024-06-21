import MapChartCSCA from '@/components/map/home-map-csca';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Coverage map',
  description: 'World map of proof of passport coverage',
};

export default function GlobalMap() {
  return (
    <>
      <main className={`main -mt-3 relative`}>
        <div className={`mapRow`}>
          <div className={`mapSection`}>
            <MapChartCSCA />
          </div>
        </div>
        <div className="legend-info text-black relative bottom-2 lg:bottom-7 right-3 lg:absolute">
          <h2 className={`homeTitle`}>Proof of Passport country coverage</h2>
          <div className="legend-info-item flex items-center">
            <p className="w-8 h-4 bg-[#548233] me-2"></p> Supported countries
          </div>
          <div className="legend-info-item flex items-center">
            <p className="w-8 h-4 bg-[#70ac48] me-2"></p> Work in progress
          </div>
          <div className="legend-info-item flex items-center">
            <p className="w-8 h-4 bg-[#b0bfa7] me-2"></p> Not issuing e-passport
          </div>
        </div>
      </main>
      {/* <Footer /> */}
    </>
  );
}
