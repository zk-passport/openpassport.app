'use client';
import React, { useEffect, useState } from 'react';
import { TextField, Autocomplete, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CertificateCard from '../../components/search/CertCard';
import CertificateDetails from '../../components/search/CertDetail';
import CircularProgress from '@mui/material/CircularProgress';

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
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [certificateType, setCertificateType] = useState<'dsc' | 'csca'>('dsc');
  const [certificateCount, setCertificateCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const algorithmOptions = [
    'RSA',
    'RSA SHA-1',
    'RSA SHA-256',
    'RSA SHA-384',
    'RSA SHA-512',
    'RSA-PSS',
    'ECDSA',
    'ECDSA SHA-1',
    'ECDSA SHA-224',
    'ECDSA SHA-384',
    'ECDSA SHA-512'
  ];

  const isAlgorithmSearch = (term: string) => 
    ['rsa', 'ecdsa', 'sha', 'ecd','pss'].some(algo => term.toLowerCase().includes(algo));

  useEffect(() => {
    const fetchCertificates = async () => {
      if (!searchTerm.trim()) {
        // Don't search if the search term is empty or just whitespace
        setCertificates({});
        setCertificateCount(0);
        return;
      }

      if (isAlgorithmSearch(searchTerm) && !selectedOption) {
        // Don't search if it's an algorithm search without a selection
        return;
      }

      setIsLoading(true);
      try {
        const searchQuery = selectedOption || searchTerm;
        const response = await fetch(`/api/certificates?type=${certificateType}&search=${encodeURIComponent(searchQuery)}`);
        if (!response.ok) {
          throw new Error('Error al cargar los datos');
        }
        const data: Certificate[] = await response.json();
        const certificatesObj = data.reduce((acc: CertificateData, cert: Certificate) => {
          acc[cert.id] = cert;
          return acc;
        }, {});
        setCertificates(certificatesObj);
        setCertificateCount(data.length); // Set the count of certificates
      } catch (error) {
        console.error('Error:', error);
        setCertificates({});
        setCertificateCount(0); // Reset count on error
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchCertificates, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm, selectedOption, certificateType]);

  const filterOptions = (options: string[], { inputValue }: { inputValue: string }) => {
    const filterValue = inputValue.toLowerCase();
    return isAlgorithmSearch(filterValue)
      ? options.filter(option => option.toLowerCase().includes(filterValue))
      : [];
  };

  // Handle the search term debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 400); // Delay of 200ms

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const handleAdornmentClick = () => {
    setSelectedCertificate(null);
    setSearchTerm('');
    setCertificates({});
    setCertificateCount(0);
  };

  const handleTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newType: 'dsc' | 'csca' | null,
  ) => {
    if (newType !== null) {
      setCertificateType(newType);
    }
  };

  const handleOptionChange = (
    event: React.ChangeEvent<unknown>,
    newValue: string | null,
  ) => {
    setSelectedOption(newValue);
    setSearchTerm(newValue || '');
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/4 p-4 z-0">
        <h2 className="text-brand-black tracking-[-0.77px] text-2xl leading-6l md:tracking-[-1.44px] md:text-3xl md:leading-[46px] mb-4">
          Search <span className="opacity-50">certificates</span>
        </h2>
        <ToggleButtonGroup
          value={certificateType}
          exclusive
          onChange={handleTypeChange}
          aria-label="certificate type"
          className="mb-4 rounded-full overflow-hidden"
          sx={{
            '& .MuiToggleButton-root': {
              border: 'none',
              borderRadius: '9999px',
              transition: 'all 0.3s ease',
              color: 'rgba(0, 0, 0, 0.6)', // Default text color
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
              '&.Mui-selected': {
                backgroundColor: 'black',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                },
              },
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
            },
          }}
        >
          <ToggleButton value="dsc" aria-label="DSC">
            DSC
          </ToggleButton>
          <ToggleButton value="csca" aria-label="CSCA">
            CSCA
          </ToggleButton>
        </ToggleButtonGroup>
        <Autocomplete
          freeSolo
          value={searchTerm}
          onChange={(event, newValue) => {
            setSearchTerm(newValue || '');
            setSelectedOption(newValue);
          }}
          onInputChange={(event, newInputValue) => {
            setSearchTerm(newInputValue);
            if (!isAlgorithmSearch(newInputValue)) {
              setSelectedOption(null);
            }
          }}
          options={algorithmOptions}
          filterOptions={filterOptions}
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
        <p className="mt-4 text-black">
          {isLoading ? (
            <span className="flex items-center">
              Searching... <CircularProgress size={20} className="ml-2" sx={{ color: 'black' }} />
            </span>
          ) : certificateCount > 0 ? (
            `Found ${certificateCount} certificate${certificateCount !== 1 ? 's' : ''}`
          ) : searchTerm ? (
            'No certificates found'
          ) : (
            ''
          )}
        </p>
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
            searchTerm && <p className="text-black text-center text-gray-500"></p>
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
