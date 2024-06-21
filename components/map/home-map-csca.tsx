'use client';

import { Tooltip, Zoom } from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  Sphere,
} from 'react-simple-maps';

const geoUrl = 'data/countries-110m.json';

export default function MapChartCSCA({ }) {
  enum issuePassTypes {
    DO_NOT_ISSUE = 1000,
    ISSUE_WITHOUT_SUPPORT = 1001,
    ISSUE_WITH_SUPPORT = 1002,
  }
  const encryptionNames = {
    'sha1WithRSAEncryption': 'RSA with SHA-1',
    'sha256WithRSAEncryption': 'RSA with SHA-256',
    'sha512WithRSAEncryption': 'RSA with SHA-512',
    'rsassaPss        ': 'RSA-PSS with SHA-256',
    'ecdsa-with-SHA1': 'ECDSA with SHA-1',
    'ecdsa-with-SHA256': 'ECDSA with SHA-256',
    'ecdsa-with-SHA384': 'ECDSA with SHA-384',
    'ecdsa-with-SHA512': 'ECDSA with SHA-512',
  };
  const [selectedCountryInfo, setSelectedCountryInfo] = useState([]);
  const [allCountriesData, setAllCountriesData] = useState({});
  const [selectedCountryName, setSelectedCountryName] = useState('');
  const [allIssuesCountry, setAllIssuesCountry] = useState({});

  const handleToolTip = (countryName: string) => {
    setSelectedCountryName(countryName);
    if (countryName) {
      const selectedCountryInfo = allCountriesData[countryName];
      setSelectedCountryInfo([]);
      if (selectedCountryInfo) {
        setSelectedCountryInfo(selectedCountryInfo);
      }
    }
  };

  // parse details from the json key field
  const parseDistinguishedName = (dn) => {
    const parts = dn.split(', ');
    const obj = {};

    parts.forEach((part) => {
      const [key, value] = part.split('=');
      obj[key] = value;
    });

    return obj;
  };

  const formatJsonData = (input: any = {}, countryNames: any = {}): any => {
    delete input?.default;
    const signedInfo: any = [];

    for (const inputData of Object.entries(input)) {
      const encCode = inputData[0]
      const encryptionData = input[encCode];
      for (const [dn, count] of Object.entries(encryptionData)) {
        const parsedDN = parseDistinguishedName(dn);
        parsedDN['COUNT'] = count;
        parsedDN['ENCRYPTION'] = encryptionNames[encCode] || encCode;
        parsedDN['ENCRYPTION_CODE'] = encCode;
        parsedDN['SUPPORTED'] = encCode === 'SHA256WITHRSA';
        parsedDN['COUNTRY_NAME'] =
          countryNames[parsedDN['C'].toUpperCase()] || parsedDN['C'];
        signedInfo.push(parsedDN);
      }
    }

    if (signedInfo.length == 0) {
      return {};
    }

    // remove duplicated encryption count of a country
    const validatedRecord = {};
    const eliminatingIndexes: number[] = [];
    for (let i = 0; i < signedInfo.length; i++) {
      const validateKey =
        signedInfo[i].C.toLowerCase() + signedInfo[i].ENCRYPTION_CODE;
      if (validatedRecord[validateKey] === undefined) {
        validatedRecord[validateKey] = i;
        continue;
      }

      const currentRecord = signedInfo[i];
      const existRecord = signedInfo[validatedRecord[validateKey]];
      const countSum = (existRecord.COUNT || 0) + (currentRecord.COUNT || 0);
      signedInfo[validatedRecord[validateKey]].COUNT = countSum;
      eliminatingIndexes.push(i);
    }
    if (eliminatingIndexes.length > 0) {
      for (const ind of eliminatingIndexes) {
        delete signedInfo[ind];
      }
    }

    const countryData = {};
    for (const signedData of signedInfo) {
      //skip the iteration if the passport records not having a valid details/country
      if (!signedData?.C) {
        continue;
      }
      let countryKey = countryNames[signedData.C.toUpperCase()] || signedData.C;
      if (countryData[countryKey]) {
        countryData[countryKey].push(signedData);
        continue;
      }
      countryData[countryKey] = [signedData];
    }

    return countryData;
  };

  const fetchJsonInfo = async () => {
    try {
      // Intermediate certificates data (DSCs) issued by each country
      const jsonResData = await import('../../public/data/csca.json');

      const jsonData = jsonResData.default;
      const countryNames = await import('../../public/data/all-countries.json');

      if (!jsonData) {
        return;
      }

      const allCountriesData = formatJsonData({ ...jsonData }, countryNames);
      setAllCountriesData(allCountriesData);

      // e-passport supported countries
      let ePassSupportCountries: any = await import('../../public/data/supported-countries.json');
      if (ePassSupportCountries?.default?.length) {
        ePassSupportCountries = ePassSupportCountries.default;
      }

      setIssuesSupportsVisuals(allCountriesData, ePassSupportCountries, countryNames);
    } catch (err) {
      console.log('err :>> ', err);
    }
  };

  const setIssuesSupportsVisuals = (countryCertsData, ePassCountries, countryNames) => {
    if (!countryCertsData || !ePassCountries) {
      return;
    }
    const countryRes = {};
    for (const country of ePassCountries) {
      const countryName = countryNames[country];
      const supportedAlgs = countryCertsData[countryName];

      countryRes[countryName] = {
        name: countryName,
        issueType: issuePassTypes.ISSUE_WITHOUT_SUPPORT,
        defaultColor: '#70ac48',
      };

      if (supportedAlgs?.length) {
        for (const alg of supportedAlgs) {
          if (
            // alg?.ENCRYPTION_CODE === 'sha1WithRSAEncryption' ||
            alg?.ENCRYPTION_CODE === 'SHA256WITHRSA' ||
            alg?.ENCRYPTION_CODE === 'SHA384WITHRSA' ||
            alg?.ENCRYPTION_CODE === 'SHA256WITHECDSA' ||
            alg?.ENCRYPTION_CODE === 'SHA256WITHRSAANDMGF1' ||
            alg?.ENCRYPTION_CODE === 'SHA384WITHECDSA' ||
            alg?.ENCRYPTION_CODE === 'SHA1WITHRSA' ||
            alg?.ENCRYPTION_CODE === 'ECDSA' ||
            alg?.ENCRYPTION_CODE === 'SHA512WITHECDSA' ||
            alg?.ENCRYPTION_CODE === 'SHA512WITHRSA' ||
            alg?.ENCRYPTION_CODE === 'SHA512WITHRSAANDMGF1' ||
            alg?.ENCRYPTION_CODE === 'SHA384WITHRSAANDMGF1'
          ) {
            countryRes[countryName].issueType =
              issuePassTypes.ISSUE_WITH_SUPPORT;
            countryRes[countryName].defaultColor = '#548233';
          }
        }
      }
    }

    setAllIssuesCountry(countryRes);
  };

  useEffect(() => {
    fetchJsonInfo();

    // apply custom styles to map page
    document.body.classList.add('globalMap');
    // Clean up: Remove classes from body
    return () => {
      document.body.classList.remove('globalMap');
    };
  }, []);

  const highLightInfo = (countryDscs: any = []) => {
    if (countryDscs?.length > 0) {
      return (
        <div className="bg-gray">
          <h3 className="flex items-center">
            <b>{selectedCountryName || ''}</b>
          </h3>{' '}
          <div className="issued-dscs">
            {countryDscs.map((dsc) => {
              return (
                <p key={dsc.ENCRYPTION_CODE} className='flex items-center text-nowrap'>
                  <span className='me-1'>
                    {new Intl.NumberFormat().format(
                      dsc.COUNT ? dsc.COUNT * 1 : dsc.COUNT
                    )}
                  </span>
                  CSCA issued with <span className='ms-1'>{dsc.ENCRYPTION}</span>
                  <span>
                    &nbsp;{dsc.SUPPORTED ? "✅" : "🚧"}
                  </span>
                </p>
              );
            })}
          </div>
        </div>
      );
    }

    return (
      <div>
        <h3 className="flex items-center">
          <b>{selectedCountryName || ''}</b>
          &nbsp;
          {
            allIssuesCountry[`${selectedCountryName}`]
              ? "🚧"
              : null
          }
        </h3>
      </div>
    );
  };

  return (
    <div data-tip="" className="globalMap">
      <div
        id="tooltip-default"
        role="tooltip"
        className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
      >
        Tooltip content
        <div className="tooltip-arrow" data-popper-arrow></div>
      </div>
      <ComposableMap width={980} height={560}>
        <Graticule stroke="#999" strokeWidth={0.2} />
        <Sphere
          stroke="#fff"
          strokeWidth={0.1}
          id={'sphereline'}
          fill={'#ffffff00'}
        />
        <Geographies
          geography={geoUrl}
          fill="#e1e1e1"
          stroke="#fff"
          strokeWidth={0.3}
        >
          {({ geographies }) =>
            geographies.map((geo) => (
              <Tooltip
                classes={{ tooltip: 'country-tooltip' }}
                title={highLightInfo(selectedCountryInfo)}
                placement="right"
                arrow
                key={geo.rsmKey}
                TransitionComponent={Zoom}
                TransitionProps={{ timeout: 50 }}
              >
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  data-tooltip-target="tooltip-default"
                  onMouseEnter={() => {
                    handleToolTip(`${geo.properties.name}`);
                  }}
                  style={{
                    default: {
                      fill: allIssuesCountry[`${geo.properties.name}`]
                        ? allIssuesCountry[`${geo.properties.name}`]
                          .defaultColor
                        : '#b0bfa7',
                    },
                    hover: {
                      fill: allIssuesCountry[`${geo.properties.name}`]
                        ? '#4d7332'
                        : '#b0bfa7',
                    },
                    pressed: {
                      fill: allIssuesCountry[`${geo.properties.name}`]
                        ? '#507f3a'
                        : '#b0bfa7',
                    },
                  }}
                />
              </Tooltip>
            ))
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
}
