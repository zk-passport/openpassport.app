'use client'; 

import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer'; 
import { supportIndicator } from '../map/supported-algorithms-verifier';
import { Icons } from "@/components/elements/Icons";

// Define the structure of a data item
interface DataItem {
  region: string;
  signature_algorithm: string;
  hash_algorithm: string;
  curve_exponent: number;
  bit_length: number;
  amount: number;
  is_supported: boolean; 
}

// Define the structure of the data response
interface DataResponse {
  [region: string]: DataItem[];
}

// Define the props for the SearchResults component
interface SearchResultsProps {
  searchQuery: string;
}

// SearchResults component to display filtered search results
export const SearchResults: React.FC<SearchResultsProps> = ({ searchQuery }) => {
  // State to hold all records and filtered records
  const [records, setRecords] = useState<DataItem[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<DataItem[]>([]);
  const { ref: inViewElement, inView } = useInView(); 

  // useEffect to fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from DSC source
        const dscResponse = await fetch(
          'https://raw.githubusercontent.com/zk-passport/proof-of-passport/dev/registry/outputs/dsc_formatted.json'
        );
        const dscData: DataResponse = await dscResponse.json();

        // Fetch data from CSCA source
        const cscaResponse = await fetch(
          'https://raw.githubusercontent.com/zk-passport/proof-of-passport/dev/registry/outputs/csca_formatted.json'
        );
        const cscaData: DataResponse = await cscaResponse.json();

        // Combine data 
        const combinedData = { ...dscData };

        // Merge CSCA data into the combined data
        Object.entries(cscaData).forEach(([region, items]) => {
          if (combinedData[region]) {
            
            combinedData[region] = [...combinedData[region], ...items];
          } else {
            
            combinedData[region] = items;
          }
        });

        // Flatten all records and add the is_supported field
        const mergedData: DataItem[] = Object.entries(combinedData).flatMap(
          ([region, items]) => items.map((item) => ({
            ...item,
            region,
            is_supported: (supportIndicator({
              ...item,
              curve_exponent: item.curve_exponent.toString()
            }, 'dsc') || supportIndicator({
              ...item,
              curve_exponent: item.curve_exponent.toString(), 
            }, 'csca')) || false 
          }))
        );

        setRecords(mergedData); 
        console.log(mergedData);
      } catch (error) {
        console.error('Error fetching data:', error); 
      }
    };

    fetchData(); 
  }, []);

  // useEffect to filter records based on the search query
  useEffect(() => {
    const filterRecords = () => {
      if (!searchQuery) return records; 

      // Split the search query into individual terms
      const terms = searchQuery.toLowerCase().split(/\s+/);

      return records.filter((record) => 
        terms.every(term => 
          record.region.toLowerCase().includes(term) ||
          record.signature_algorithm.toLowerCase().includes(term) ||
          record.hash_algorithm.toLowerCase().includes(term) ||
          record.curve_exponent.toString().includes(term) ||
          record.bit_length.toString().includes(term)
        )
      );
    };

    setFilteredRecords(filterRecords()); 
  }, [searchQuery, records]);

  // Render messages based on the search query and filtered records
  if (!searchQuery) {
    return <div className="font-alliance text-black text-center">Enter a search term</div>;
  }
  if (!filteredRecords.length) {
    return <div className="font-alliance text-black text-center">No records found for &quot;{searchQuery}&quot;</div>;
  }
  return (
    <div className="text-black items-center">
      <p className="font-alliance text-center">
        Search results for <b>{searchQuery}</b>
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 m-4">
        {filteredRecords.map((record, index) => (
          <div key={index} className="font-alliance bg-white p-4 rounded-lg shadow-md">
            <p>
              <b>Country:</b> {record.region}
              <br />
              <b>Signature Algorithm:</b> {record.signature_algorithm}
              <br />
              <b>Hash Algorithm:</b> {record.hash_algorithm}
              <br />
              <b>Curve Exponent:</b> {record.curve_exponent}
              <br />
              <b>Bit Length:</b> {record.bit_length}
              <br />
              <b>Supported:</b> <span>{record.is_supported ? <Icons.CheckedCircle className="inline text-black/80" /> : "Unsupported"}</span>
              <br />
            </p>
          </div>
        ))}
      </div>

      <div ref={inViewElement} />
    </div>
  );
}; 
