'use client';
import React, { useEffect, useState } from 'react';
import { TextField, Autocomplete, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CertificateCard from '../../components/search/CertCard';
import CertificateDetails from '../../components/search/CertDetail';
import CircularProgress from '@mui/material/CircularProgress';
import Chip from '@mui/material/Chip';

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
  const [certificateType, setCertificateType] = useState<'dsc' | 'csca'>('dsc');
  const [certificateCount, setCertificateCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);



  const keywordCategories = {
    sha: ['sha-256', 'sha1', 'sha512', 'sha384'],
    exponent: ['3', '65536'],
    algorithm: ['rsa', 'ecdsa'],
  };

  const allKeywords = Object.values(keywordCategories).flat();

  const filterOptions = (options: string[], { inputValue }: { inputValue: string }) => {
    const filterValue = inputValue.toLowerCase();
    return allKeywords.filter(keyword =>
      keyword.toLowerCase().includes(filterValue) && !selectedKeywords.includes(keyword)
    );
  };

  const handleKeywordSelect = (keyword: string) => {
    setSelectedKeywords([...selectedKeywords, keyword]);
    setSearchTerm('');
  };

  const handleKeywordDelete = (keyword: string) => {
    setSelectedKeywords(selectedKeywords.filter(k => k !== keyword));
  };

  useEffect(() => {
    const fetchCertificates = async () => {
      if (selectedKeywords.length === 0 && !searchTerm.trim()) {
        setCertificates({});
        setCertificateCount(0);
        return;
      }

      setIsLoading(true);
      try {
        const queryParams = new URLSearchParams();
        queryParams.append('type', certificateType);

        // Add each keyword as a separate query parameter
        selectedKeywords.forEach(keyword => {
          const category = Object.entries(keywordCategories).find(([_, values]) => values.includes(keyword))?.[0];
          if (category) {
            queryParams.append(category, keyword);
          }
        });

        // Add free text search term if present
        if (searchTerm.trim()) {
          queryParams.append('search', searchTerm.trim());
        }

        const response = await fetch(`/api/certificates?${queryParams.toString()}`);
        if (!response.ok) {
          throw new Error('Error loading data');
        }
        const data: Certificate[] = await response.json();
        const certificatesObj = data.reduce((acc: CertificateData, cert: Certificate) => {
          acc[cert.id] = cert;
          return acc;
        }, {});
        setCertificates(certificatesObj);
        setCertificateCount(data.length);
      } catch (error) {
        console.error('Error:', error);
        setCertificates({});
        setCertificateCount(0);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchCertificates, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm, selectedKeywords, certificateType]);

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
  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/4 p-4 z-0">
        <h2 className="text-brand-black tracking-[-0.77px] text-2xl leading-6l md:tracking-[-1.44px] md:text-3xl md:leading-[46px] mb-4">
          Search <span className="opacity-50">certificates</span>
        </h2>
        <div className="ml-4">
          <ToggleButtonGroup
            value={certificateType}
            exclusive
            onChange={handleTypeChange}
            aria-label="certificate type"
            className="mb-4 rounded-full overflow-hidden"
            sx={{
              gap: '8px', // Add space between buttons
              '& .MuiToggleButton-root': {
                border: 'none',
                borderRadius: '9999px',
                transition: 'all 0.3s ease',
                color: 'rgba(0, 0, 0, 0.6)', // Default text color
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                padding: '4px 16px', // Reduce vertical padding
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
        </div>

        <div className="flex flex-wrap gap-2 mb-2">
          {selectedKeywords.map((keyword) => (
            <Chip
              key={keyword}
              label={keyword}
              onDelete={() => handleKeywordDelete(keyword)}
              color="primary"
              variant="outlined"
            />
          ))}
        </div>

        <Autocomplete
          freeSolo
          value={searchTerm}
          onChange={(event, newValue) => {
            if (newValue && allKeywords.includes(newValue)) {
              handleKeywordSelect(newValue);
            } else {
              setSearchTerm(newValue || '');
            }
          }}
          onInputChange={(event, newInputValue) => {
            setSearchTerm(newInputValue);
          }}
          options={allKeywords}
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
