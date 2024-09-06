'use client';
import React from 'react';

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

type CertificateDetailsProps = {
  certificate: Certificate;
  onClose: () => void;
};

// Format PEM
const formatPem = (pem: string) => {
// Replace the end of the certificate to be in a new line
  return pem.replace(/-----END CERTIFICATE-----/, '-----END CERTIFICATE-----\n');
};

const CertificateDetails: React.FC<CertificateDetailsProps> = ({ certificate, onClose }) => {
  return (
    <div className="fixed inset-0 text-black bg-white z-40 p-4 md:relative md:max-w-screen-lg md:mt-0 overflow-y-auto">
      <div
        className="text-black py-2 rounded-full mb-4 mt-10 md:mt-0 cursor-pointer hover:text-gray-800"
        onClick={onClose}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-black cursor-pointer hover:text-gray-800"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          style={{ transform: 'rotate(180deg)' }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
      <h2 className="text-xl font-bold mt-4 md:text-2xl">Certificate Details</h2>
      <p className="mt-2 text-xs md:text-sm"><b>ID:</b> {certificate.id}</p>
      <p className="mt-1 text-xs md:text-sm"><b>Issuer:</b> {certificate.issuer}</p>
      <p className="mt-1 text-xs md:text-sm"><b>Valid From:</b> {certificate.validity.notBefore}</p>
      <p className="mt-1 text-xs md:text-sm"><b>Valid Until:</b> {certificate.validity.notAfter}</p>
      <p className="mt-1 text-xs md:text-sm break-words"><b>Subject Key Identifier:</b> {certificate.subjectKeyIdentifier}</p>
      <h3 className="text-lg font-semibold mt-4 md:text-xl">Public Key Details</h3>
      {certificate.publicKeyDetails?.modulus && (
        <>
          <p className="mt-2 text-xs md:text-sm break-words"><b>Modulus:</b>&nbsp;{certificate.publicKeyDetails.modulus}</p>
          <p className="mt-1 text-xs md:text-sm break-words"><b>Exponent:</b>&nbsp;{certificate.publicKeyDetails.exponent}</p>
        </>
      )}
      {certificate.publicKeyDetails?.curve && (
        <>
          <p className="mt-2 text-xs md:text-sm break-words"><b>Curve:</b> {certificate.publicKeyDetails.curve}</p>
          {certificate.publicKeyDetails?.params && (
            <>
              <p className="mt-2 text-xs md:text-sm"><b>Parameters:</b></p>
              <div className="mt-2 grid grid-cols-[auto,1fr] gap-1 pl-3">
                {Object.entries(certificate.publicKeyDetails.params).map(([key, value]) => (
                  <React.Fragment key={key}>
                    <div className="text-xs md:text-sm font-semibold pr-2">{key}:</div>
                    <div className="text-xs md:text-sm break-words overflow-hidden text-ellipsis">{value}</div>
                  </React.Fragment>
                ))}
              </div>
            </>
          )}
        </>
      )}
      <h3 className="text-lg font-semibold mt-4 md:text-xl">TXT Raw</h3>
      <pre className="border border-dashed p-4 rounded mt-2 overflow-x-auto text-xs md:text-sm" style={{ backgroundColor: '#f6f6f6' }}>{certificate.rawTxt}</pre>
      <h3 className="text-lg font-semibold mt-4 md:text-xl">PEM Raw</h3>
      <pre className="border border-dashed p-4 rounded mt-2 break-words text-xs md:text-sm whitespace-pre-wrap" style={{ backgroundColor: '#f6f6f6' }}>
        {formatPem(certificate.rawPem)}
      </pre>
    </div>
  );
};

export default CertificateDetails;
