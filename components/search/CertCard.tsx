import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import { SvgIcon, Typography } from '@mui/material';
import ReactCountryFlag from 'react-country-flag';
import allCountries from './../../public/data/all-countries.json';
type Certificate = {
  id: string;
  issuer: string;
  hashAlgorithm: string;
  signatureAlgorithm: string;
  validity: {
    notAfter: string;
    notBefore: string;
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

type CertificateCardProps = {
  certificate: Certificate;
  onClick: () => void;
  isSelected: boolean;
};

const CertificateCard: React.FC<CertificateCardProps> = ({ certificate, onClick, isSelected }) => {
  const countryName = allCountries[certificate.issuer as keyof typeof allCountries];
  const getBits = (cert: Certificate): number | string => {
    const { publicKeyDetails } = cert;

      if (publicKeyDetails?.modulus) {
        return publicKeyDetails?.modulus.length * 4; // Aproximación para RSA
      } else if (publicKeyDetails?.curve) {
        return publicKeyDetails?.curve.includes('256') ? 256 : 384; // Aproximación para curvas elípticas
      }
    
    return 'N/A'; // Asegúrate de que el retorno sea del tipo esperado
  };

  return (
    <Card
      variant="outlined"
      sx={{
        position: 'relative',
        border: '1px solid',
        borderColor: 'gray.300',
        borderRadius: 2,
        padding: 0,
        backgroundColor: 'white',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
          transform: 'scale(1.05)',
        },
        ...(isSelected && {
          boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
          transform: 'scale(1.05)',
        }),
      }}
    >
      <CardActionArea onClick={onClick}>
        <CardContent>
          <Typography variant="body2" color="textPrimary">
            <b>Issuer:</b> {certificate.issuer} - {countryName || 'Country not found'}
            <ReactCountryFlag
                countryCode={certificate.issuer}
                svg
                style={{
                  width: '2em',
                  height: '1em',
                }}
                title={countryName}
              />
          </Typography>
          <Typography variant="body2" color="textPrimary">
            <b>Hash Algorithm:</b> {certificate.hashAlgorithm}
          </Typography>
          <Typography variant="body2" color="textPrimary">
            <b>Signature Algorithm:</b> {certificate.signatureAlgorithm}
          </Typography>
          {certificate.publicKeyDetails?.curve && (
            <Typography variant="body2" color="textPrimary">
              <b>Curve:</b> {certificate.publicKeyDetails.curve}
            </Typography>
          )}
          {certificate.publicKeyDetails?.exponent && (
            <Typography variant="body2" color="textPrimary">
              <b>Exponent:</b> {certificate.publicKeyDetails.exponent}
            </Typography>
          )}
          <Typography variant="body2" color="textPrimary">
            <b>Bits:</b> {getBits(certificate)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <SvgIcon
        sx={{ position: 'absolute', right: 4, top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
        color="action"
        onClick={onClick}
      >
        <path d="M9 5l7 7-7 7" />
      </SvgIcon>
    </Card>
  );
};

export default CertificateCard;