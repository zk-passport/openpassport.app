// type Certificate = {
//     id: string;
//     issuer: string;
//     hashAlgorithm: string;
//     signatureAlgorithm: string;
//     publicKeyDetails: {
//       modulus?: string;
//       exponent?: string;
//       curve?: string;
//       params?: {
//         p: string;
//         a: string;
//         b: string;
//         G: string;
//         n: string;
//         h: string;
//       };
//     };
//     validity: {
//       notBefore: string;
//       notAfter: string;
//     };
//     subjectKeyIdentifier: string;
//     rawPem: string;
//     rawTxt: string;
//   };
  
//   type CertificateData = {
//     [key: string]: Certificate;
//   };