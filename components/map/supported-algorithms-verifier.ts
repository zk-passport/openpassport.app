type CertDetail = {
  signature_algorithm: string;
  hash_algorithm: string;
  curve_exponent: string;
  bit_length: number;
  amount: number;
};

/**
 * verify the incoming alg, hash, bits are supported or not.
 */
const supportIndicator = (countryCert: CertDetail, type: string = 'dsc') => {

  if (type === 'dsc') {
    const supportedListDsc: any = {
      rsa: {
        sha1: {
          curves: [ '3', '33225', '33579', '33769', '34389', '34779', '35033', '35221', '36291', '36515', '37121', '37399', '38105', '41817', '42239', '42743', '44459', '44591', '44681', '45279', '45347', '47415', '48081', '49371', '49729', '49861', '51925', '52355', '53037', '53741', '53873', '54007', '55443', '58127', '58333', '59575', '59793', '60353', '61181', '61735', '61957', '62391', '62765', '62785', '63289', '63701', '64113', '64721', '64999', '65123', '65223', '65427', '65537', 'NOT RSA' ],
          bits: [ 256, 1024, 2048, 3072, 4096],
        },
        sha256: {
          curves: ['3', '33225', '33579', '33769', '34389', '34779', '35033', '35221', '36291', '36515', '37121', '37399', '38105', '41817', '42239', '42743', '44459', '44591', '44681', '45279', '45347', '47415', '48081', '49371', '49729', '49861', '51925', '52355', '53037', '53741', '53873', '54007', '55443', '58127', '58333', '59575', '59793', '60353', '61181', '61735', '61957', '62391', '62765', '62785', '63289', '63701', '64113', '64721', '64999', '65123', '65223', '65427', '65537', 'NOT RSA' ],
          bits: [ 256, 1024, 2048, 3072, 4096],
        },
        sha384: false,
        sha512: false,
      },
      rsapss: {
        sha1: false,
        sha256: {
          curves: [ '3', '65537'],
          bits: [ 2048, 3072]
        },
        sha384: false,
        sha512: false,
      },
      ecdsa: false,
    }
    
    let signatureSupport = false;
    let hashSupport = false;
    let curveSupport = false;
    let bitsSupport = false;
    const signature_algorithm = countryCert.signature_algorithm;
    if (supportedListDsc[signature_algorithm]) {
      signatureSupport = true;
      const hash_algorithm = countryCert.hash_algorithm;
      if (supportedListDsc[signature_algorithm][hash_algorithm]) {
        hashSupport = true;
        const supportedAlgs =
          supportedListDsc[signature_algorithm][hash_algorithm];
        if (supportedAlgs.curves.includes(countryCert.curve_exponent)) {
          curveSupport = true;
        }
        if (supportedAlgs.bits.includes(countryCert.bit_length)) {
          bitsSupport = true;
        }
      }
    }

    return signatureSupport && hashSupport && curveSupport && bitsSupport;
  }

  if (type = 'csca') {
    const supportedListCsca: any = {
      rsa: {
        sha1: false,
        sha256: {
          curves: ['3', '38129', '43459', '50633', '56611', '58097', '65537', '107903', '109729', '127485', 'NOT RSA'],
          bits: [ 2048, 4096, 3072]
        },
        sha384: false,
        sha512: false,
      },
      rsapss: false,
      ecdsa: false,
    }

    let signatureSupport = false;
    let hashSupport = false;
    let curveSupport = false;
    let bitsSupport = false;
    const signature_algorithm = countryCert.signature_algorithm;
    if (supportedListCsca[signature_algorithm]) {
      signatureSupport = true;
      const hash_algorithm = countryCert.hash_algorithm;
      if (supportedListCsca[signature_algorithm][hash_algorithm]) {
        hashSupport = true;
        const supportedAlgs =
          supportedListCsca[signature_algorithm][hash_algorithm];
        if (supportedAlgs.curves.includes(countryCert.curve_exponent)) {
          curveSupport = true;
        }
        if (supportedAlgs.bits.includes(countryCert.bit_length)) {
          bitsSupport = true;
        }
      }
    }

    return signatureSupport && hashSupport && curveSupport && bitsSupport;
  }
};

export { supportIndicator };