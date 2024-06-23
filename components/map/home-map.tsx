"use client";

import { Tooltip, Zoom } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  Sphere,
} from "react-simple-maps";
import { createRoot } from "react-dom/client";

const geoUrl = "data/countries-110m.json";

export default function MapChart() {
  enum issuePassTypes {
    DO_NOT_ISSUE = 1000,
    ISSUE_WITHOUT_SUPPORT = 1001,
    ISSUE_WITH_SUPPORT = 1002,
  }
  const SUPPORTED_ALGORITHMS = {
    "RSA with SHA256": true,
  };

  const [selectedCountryInfo, setSelectedCountryInfo] = useState([]);
  const [allCountriesData, setAllCountriesData] = useState({});
  const [selectedCountryName, setSelectedCountryName] = useState("");
  const [allIssuesCountry, setAllIssuesCountry] = useState({});
  const size = useWindowSize();
  const [isMobileView, setIsMobileView] = useState(false);

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

  const formatJsonData = (
    dscInput: any = {},
    cscaInput: any = {},
    countryNames: any = {}
  ): any => {
    delete dscInput?.default;
    delete cscaInput?.default;

    const countryData = {};

    for (const countryCode of Object.keys(countryNames)) {
      const name = countryNames[countryCode];
      countryData[name] = false;

      // verify specific country having dsc / csca records
      const dscCountryData = dscInput[countryCode];
      const cscaCountryData = cscaInput[countryCode];
      if (dscCountryData?.length || cscaCountryData?.length) {
        // countryData[name] = {};
        const countryObj = {};

        countryObj["name"] = name;
        countryObj["countryCode"] = countryCode;
        countryObj["dscExist"] = false;
        countryObj["cscaExist"] = false;

        let count = 0;
        if (dscCountryData?.length > 0) {
          countryObj["dscExist"] = true;
          countryObj["dscRecords"] = [...dscCountryData];
          const signatureCountryAlgs = {};
          for (const dscEachAlg of dscCountryData) {
            count += dscEachAlg?.amount;
            const signatureStr = `${dscEachAlg.signature_algorithm.toUpperCase()} with ${dscEachAlg.hash_algorithm.toUpperCase()}`;
            signatureCountryAlgs[signatureStr] = true;
          }
          countryObj["dscAlgs"] = Object.keys(signatureCountryAlgs);
        }

        if (cscaCountryData?.length > 0) {
          countryObj["cscaExist"] = true;
          countryObj["cscaRecords"] = [...cscaCountryData];
          for (const cscaEachAlg of cscaCountryData) {
            count += cscaEachAlg?.amount;
          }
        }
        countryObj["amount"] = count;

        countryData[name] = countryObj;
      }
    }

    return countryData;
  };

  const fetchJsonInfo = async () => {
    try {
      // Intermediate Certificates (DSC) issued by each country
      const dscFetchData = await fetch(
        "https://raw.githubusercontent.com/zk-passport/proof-of-passport/dev/registry/outputs/dsc_formatted.json"
      );
      const dscData = await dscFetchData.json();

      // Top-level Certificates (CSCA) issued by each country
      const cscaFetchData = await fetch(
        "https://raw.githubusercontent.com/zk-passport/proof-of-passport/dev/registry/outputs/csca_formatted.json"
      );
      const cscaData = await cscaFetchData.json();

      const countryNames = await import(
        "./../../public/data/all-countries.json"
      );

      if (!dscData || !cscaData) {
        return;
      }

      const allCountriesData = formatJsonData(
        { ...dscData },
        { ...cscaData },
        countryNames
      );
      console.log("allCountriesData :>> ", allCountriesData);
      setAllCountriesData(allCountriesData);

      // e-passport supported countries
      let ePassSupportCountries: any = await import(
        "./../../public/data/supported-countries.json"
      );
      if (ePassSupportCountries?.default?.length) {
        ePassSupportCountries = ePassSupportCountries.default;
      }

      setIssuesSupportsVisuals(
        allCountriesData,
        ePassSupportCountries,
        countryNames
      );
    } catch (err) {
      console.log("err :>> ", err);
    }
  };

  const setIssuesSupportsVisuals = (
    countryCertsData,
    ePassCountries,
    countryNames
  ) => {
    if (!countryCertsData || !ePassCountries) {
      return;
    }

    // construct obj to find the e-passport supported countries
    const supportedCountriesObj = {};
    ePassCountries.forEach((countryCode: string) => {
      supportedCountriesObj[countryCode] = true;
    });

    const countryRes = {};
    for (const country of Object.keys(countryNames)) {
      const countryName = countryNames[country];
      const countryData = countryCertsData[countryName];

      countryRes[countryName] = {
        name: countryName,
        issueType: issuePassTypes.DO_NOT_ISSUE,
        defaultColor: "#b0bfa7",
      };

      if (supportedCountriesObj[country]) {
        countryRes[countryName].defaultColor = "#70ac48";
        countryRes[countryName].issueType =
          issuePassTypes.ISSUE_WITHOUT_SUPPORT;
      }

      // verified the dsc records are exists in supported algorithms or not
      if (countryData?.dscAlgs?.length) {
        for (const alg of countryData.dscAlgs) {
          if (SUPPORTED_ALGORITHMS[alg]) {
            countryRes[countryName].issueType =
              issuePassTypes.ISSUE_WITH_SUPPORT;
            countryRes[countryName].defaultColor = "#548233";
          }
        }
      }
    }

    setAllIssuesCountry(countryRes);
  };

  useEffect(() => {
    fetchJsonInfo();

    // apply custom styles to map page
    document.body.classList.add("globalMap");
    // Clean up: Remove classes from body
    return () => {
      document.body.classList.remove("globalMap");
    };
  }, []);

  useEffect(() => {
    const isMobile = !!size.width && size.width < 767;
    setIsMobileView(isMobile);
  }, [size]);

  const highLightInfo = (countryDscs: any = []) => {
    let info: React.JSX.Element;
    return "";
    // if (countryDscs?.length > 0) {
    //   info = (
    //     <div className="highlightInfo">
    //       <h3 className="flex items-center">
    //         <b>{selectedCountryName || ''}</b>
    //       </h3>{' '}
    //       <div className="issued-dscs">
    //         {countryDscs.map((dsc) => {
    //           return (
    //             <p
    //               key={dsc.ENCRYPTION_CODE}
    //               className="flex items-center text-nowrap"
    //             >
    //               <span className="me-1">
    //                 {new Intl.NumberFormat().format(
    //                   dsc.COUNT ? dsc.COUNT * 100_000 : dsc.COUNT
    //                 )}
    //               </span>
    //               passports issued with{' '}
    //               <span className="ms-1">{dsc.ENCRYPTION}</span>
    //               <span>&nbsp;{dsc.SUPPORTED ? '✅' : '🚧'}</span>
    //             </p>
    //           );
    //         })}
    //       </div>
    //     </div>
    //   );
    // } else {
    //   info = (
    //     <div className="workInProgress">
    //       <h3 className="flex items-center">
    //         <b>{selectedCountryName || ''}</b>
    //         &nbsp;
    //         {allIssuesCountry[`${selectedCountryName}`] ? '🚧' : null}
    //       </h3>
    //       {allIssuesCountry[`${selectedCountryName}`] && isMobileView ? (
    //         <>
    //           <p>Work in progress</p>
    //         </>
    //       ) : (
    //         isMobileView && (
    //           <>
    //             <p>Not issuing e-passport</p>
    //           </>
    //         )
    //       )}
    //     </div>
    //   );
    // }

    // if (isMobileView && selectedCountryName != '') {
    //   const mobInfoEl = document.getElementById('countryDetails');
    //   if (mobInfoEl) {
    //     const root = createRoot(mobInfoEl);
    //     root.render(info);
    //   }
    // }

    // return info;
  };

  return (
    <div data-tip="" className="globalMap">
      <ComposableMap
        projectionConfig={{ center: isMobileView ? [10, 0] : [25, 10] }}
        width={isMobileView ? 750 : 880}
        height={500}
      >
        <Graticule stroke="#999" strokeWidth={0.2} />
        <Sphere
          stroke="#fff"
          strokeWidth={0.1}
          id={"sphereline"}
          fill={"#ffffff00"}
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
                enterTouchDelay={0}
                leaveTouchDelay={6000}
                classes={{ tooltip: "country-tooltip" }}
                title={highLightInfo(selectedCountryInfo)}
                disableTouchListener={isMobileView}
                disableHoverListener={isMobileView}
                placement={"right"}
                arrow
                key={geo.rsmKey}
                TransitionComponent={Zoom}
                TransitionProps={{ timeout: 50 }}
              >
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => {
                    if (!isMobileView) {
                      return;
                    }
                    handleToolTip(`${geo.properties.name}`);
                    if (isMobileView) {
                      highLightInfo(selectedCountryInfo);
                    }
                  }}
                  onMouseEnter={() => {
                    handleToolTip(`${geo.properties.name}`);
                    if (isMobileView) {
                      highLightInfo(selectedCountryInfo);
                    }
                  }}
                  style={{
                    default: {
                      fill: allIssuesCountry[`${geo.properties.name}`]
                        ? allIssuesCountry[`${geo.properties.name}`]
                            .defaultColor
                        : "#b0bfa7",
                    },
                    hover: {
                      fill: allIssuesCountry[`${geo.properties.name}`]
                        ? "#4d7332"
                        : "#b0bfa7",
                    },
                    pressed: {
                      fill: allIssuesCountry[`${geo.properties.name}`]
                        ? "#507f3a"
                        : "#b0bfa7",
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

// Hook for getting window size
function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  const [windowSize, setWindowSize] = useState<{
    width: number | undefined;
    height: number | undefined;
  }>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Only execute on the client-side
    if (typeof window !== "undefined") {
      // Add event listener
      window.addEventListener("resize", handleResize);

      // Call handler right away so state gets updated with initial window size
      handleResize();

      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}
