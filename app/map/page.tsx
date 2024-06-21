import MapChart from '@/components/map/home-map';
import { Grid } from '@mui/material';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Coverage map',
  description: 'World map of proof of passport coverage',
};

export default function GlobalMap() {
  let infoEls;
  return (
    <>
      <main className={`main -mt-3 relative`}>
        <div className={`mapRow`}>
          <div className={`mapSection`}>
            <MapChart />
          </div>
        </div>

        <Grid container spacing={2} className="sm:mt-3 mt-0 countryDetailsRow">
          <Grid
            sm={6}
            xs={12}
            id="countryDetails"
            className="md:hidden text-gray-900 sm:border-0"
          >
            &nbsp;
          </Grid>
          <Grid
            sm={6}
            xs={12}
            className="legend-info lg:right-3 text-black relative bottom-2 lg:bottom-7 lg:absolute"
          >
            <h2 className={`homeTitle`}>Proof of Passport country coverage</h2>
            <div className="legend-info-item flex items-center">
              <p className="w-8 h-4 bg-[#548233] me-2"></p> Supported countries
            </div>
            <div className="legend-info-item flex items-center">
              <p className="w-8 h-4 bg-[#70ac48] me-2"></p> Work in progress
            </div>
            <div className="legend-info-item flex items-center">
              <p className="w-8 h-4 bg-[#b0bfa7] me-2"></p> Not issuing
              e-passport
            </div>
          </Grid>
        </Grid>
      </main>
      {/* <Footer /> */}
    </>
  );
}
