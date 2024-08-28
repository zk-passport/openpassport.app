'use client';
import React, { useEffect, useState, useMemo } from 'react';
import { TextField, Autocomplete } from '@mui/material';
import CertificateCard from '../../components/search/CertCard';
import CertificateDetails from '../../components/search/CertDetail';
import allCountries from './../../public/data/all-countries.json';

type CertificateData = {
  [key: string]: Certificate;
};

type Certificate = {
  id: string;
  issuer: string;
  hashAlgorithm: string;
  signatureAlgorithm: string;
  validity: {
    notBefore: string;
    notAfter: string;
  };
  subjectKeyIdentifier: string;
  publicKeyDetails: {
    modulus?: string;
    exponent?: string;
    curve?: string;
    params?: Record<string, string>;
  };
  rawPem: string;
  rawTxt: string;
};

const CertificateSearch: React.FC = () => {
  const [certificates, setCertificates] = useState<CertificateData>({});
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  useEffect(() => {
    // Solo ejecutar si searchTerm no está vacío
    if (searchTerm.trim() === '') {
      setCertificates({});
      setSelectedCertificate(null);
      return;
    }

    const fetchCertificates = async () => {
      try {
        const response = await fetch(`/api/certificates?search=${encodeURIComponent(searchTerm)}`);
        if (!response.ok) {
          throw new Error('Error al cargar los datos');
        }
        const data: Certificate[] = await response.json();
        const certificatesObj = data.reduce((acc: CertificateData, cert: Certificate) => {
          acc[cert.id] = cert;
          return acc;
        }, {});
        setCertificates(certificatesObj);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchCertificates();
  }, [debouncedSearchTerm]); // Solo se ejecuta cuando searchTerm cambia y no es vacío

  // Manejar el debounce del término de búsqueda
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 400); // Retraso de 200ms

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const handleAdornmentClick = () => {
    setSelectedCertificate(null);
  };
  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/4 p-4 z-0">
        <h2 className="text-brand-black tracking-[-0.77px] text-2xl leading-6l md:tracking-[-1.44px] md:text-3xl md:leading-[46px]">
          Search <span className="opacity-50">certificates</span>
        </h2>
        <Autocomplete
          freeSolo
          value={searchTerm}
          onInputChange={(event, newInputValue) => {
            setSearchTerm(newInputValue);
          }}
          options={[]}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Enter a search term..."
              variant="outlined"
              sx={{
                borderRadius: '12px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '50px',
                  '& fieldset': {
                    borderColor: 'black',
                  },
                  '&:hover fieldset': {
                    borderColor: 'black',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'black',
                  },
                },
              }}
              fullWidth
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    <div onClick={handleAdornmentClick}>
                    {params.InputProps.endAdornment}
                    </div>
                  </React.Fragment>
                ),
              }}
            />
          )}
        />
        <div className="space-y-4 mt-4">
          {Object.keys(certificates).length > 0 ? (
            Object.entries(certificates).map(([id, cert]) => (
              <CertificateCard
                key={id}
                certificate={cert}
                onClick={() => setSelectedCertificate(id)}
                isSelected={selectedCertificate === id}
              />
            ))
          ) : (
            searchTerm && <p className="text-black text-center text-gray-500">No certificates found</p>
          )}
        </div>
      </div>
      <div
        className={`fixed inset-0 bg-white z-40 p-4 md:relative md:w-3/4 md:max-w-screen-lg md:m-auto md:mt-0 md:rounded-lg md:shadow-md md:overflow-auto ${selectedCertificate ? 'block mt-30' : 'hidden'}`}
        style={{
          justifyContent: 'flex-start',
        }}
      >
        {selectedCertificate && certificates[selectedCertificate] && (
          <CertificateDetails
            certificate={certificates[selectedCertificate]}
            onClose={() => setSelectedCertificate(null)}
          />
        )}
      </div>
    </div>
  );
};

export default CertificateSearch;
