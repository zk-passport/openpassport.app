'use client';
import React, { useEffect, useState } from 'react';
import { TextField, Autocomplete, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CertificateCard from '../../components/search/CertCard';
import CertificateDetails from '../../components/search/CertDetail';
import CircularProgress from '@mui/material/CircularProgress';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';

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

type KeywordOption = { category: string; keyword: string } | string;

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px', // Increase the border radius
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#212121', // Change the outline color when focused
    },
  },
}));

const CertificateSearch: React.FC = () => {
  const [certificates, setCertificates] = useState<CertificateData>({});
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [certificateType, setCertificateType] = useState<'csca' | 'dsc'>('csca');
  const [certificateCount, setCertificateCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedKeywords, setSelectedKeywords] = useState<KeywordOption[]>([]);
  const [hasMore, setHasMore] = useState(false);

  const keywordCategories = {
    sha: ['sha256', 'sha1', 'sha512', 'sha384'],
    exponent: ['3', '65537'],
    algorithm: ['rsa', 'ecdsa', 'rsa-pss'],
    curve: ['secp256r1', 'secp384r1', 'secp521r1', 'brainpoolP256r1', 'brainpoolP384r1', 'brainpoolP512r1'],
    bits: ['256', '384', '512', '1024', '2048', '4096', '6144'],
  };

  const allKeywords = Object.entries(keywordCategories).flatMap(([category, keywords]) =>
    keywords.map(keyword => ({ category, keyword }))
  );

  const filterOptions = (options: KeywordOption[], { inputValue }: { inputValue: string }) => {
    if (!inputValue || inputValue.length === 0) {
      return []; // Return an empty array if no input
    }
    const filterValue = inputValue.toLowerCase();
    return allKeywords.filter(({ keyword }) =>
      keyword.toLowerCase().includes(filterValue) && !selectedKeywords.some(selected =>
        typeof selected === 'string' ? selected === keyword : selected.keyword === keyword
      )
    );
  };

  const handleKeywordSelect = (event: any, newValue: KeywordOption[]) => {
    setSelectedKeywords(newValue);
  };

  const getOptionLabel = (option: KeywordOption) => {
    if (typeof option === 'string') {
      return option;
    }
    return option.keyword;
  };

  useEffect(() => {
    const fetchCertificates = async () => {
      if (selectedKeywords.length === 0 && !searchTerm.trim()) {
        setCertificates({});
        setCertificateCount(0);
        setHasMore(false);
        return;
      }

      setIsLoading(true);
      try {
        const queryParams = new URLSearchParams();
        queryParams.append('type', certificateType);
        queryParams.append('limit', '101'); // Request 101 to check if there are more than 100

        selectedKeywords.forEach(keyword => {
          if (typeof keyword === 'string') {
            queryParams.append('search', keyword);
          } else {
            const category = Object.entries(keywordCategories).find(([_, values]) => values.includes(keyword.keyword))?.[0];
            if (category) {
              queryParams.append(category, keyword.keyword);
            }
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
        const hasMoreResults = data.length > 100;
        const limitedData = data.slice(0, 100);
        const certificatesObj = limitedData.reduce((acc: CertificateData, cert: Certificate) => {
          acc[cert.id] = cert;
          return acc;
        }, {});
        setCertificates(certificatesObj);
        setCertificateCount(limitedData.length);
        setHasMore(hasMoreResults);
      } catch (error) {
        console.error('Error:', error);
        setCertificates({});
        setCertificateCount(0);
        setHasMore(false);
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
    newType: 'csca' | 'dsc' | null,
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
        <div className="flex flex-col mb-4">
          <div className="flex items-center mb-2">
            <ToggleButtonGroup
              value={certificateType}
              exclusive
              onChange={handleTypeChange}
              aria-label="certificate type"
              className="rounded-full overflow-hidden"
              sx={{
                gap: '8px',
                '& .MuiToggleButton-root': {
                  border: 'none',
                  borderRadius: '9999px',
                  transition: 'all 0.3s ease',
                  color: 'rgba(0, 0, 0, 0.6)',
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  padding: '4px 16px',
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
              <ToggleButton value="csca" aria-label="CSCA">
                CSCA
              </ToggleButton>
              <ToggleButton value="dsc" aria-label="DSC">
                DSC
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
        </div>

        <StyledAutocomplete
          multiple
          freeSolo
          id="tags-outlined"
          options={allKeywords}
          groupBy={(option) => typeof option === 'string' ? 'Custom' : (option as any).category}
          getOptionLabel={getOptionLabel as any}
          filterSelectedOptions
          value={selectedKeywords}
          onChange={handleKeywordSelect as any}
          filterOptions={filterOptions as any}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              placeholder="Enter a search term..."
            />
          )}
        />

        <p className="mt-4 text-black">
          {isLoading ? (
            <span className="flex items-center">
              Searching... <CircularProgress size={20} className="ml-2" sx={{ color: 'black' }} />
            </span>
          ) : certificateCount > 0 ? (
            `Found ${hasMore ? '100+' : certificateCount} certificate${certificateCount !== 1 ? 's' : ''}`
          ) : searchTerm || selectedKeywords.length > 0 ? (
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
