import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import allCountries from './../../public/data/all-countries.json';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check if the request is not GET or if it's from a browser
  if (req.method !== 'GET' || req.headers.accept?.includes('text/html')) {
    return res.status(405).end('Method Not Allowed');
  }

  const { search } = req.query;
  
  try {
    let whereClause = {};
    
    if (search) {
      const searchTerms = (search as string).split(/\s+/);
      
      whereClause = {
        AND: searchTerms.map(term => {
          const matchedCountryCodes = Object.entries(allCountries)
            .filter(([code, name]) => name.toLowerCase().includes(term.toLowerCase()))
            .map(([code]) => code.toLowerCase());

          return {
            OR: [
              { issuer: { contains: term, mode: 'insensitive' } },
              { hashAlgorithm: { contains: term, mode: 'insensitive' } },
              { signatureAlgorithm: { contains: term, mode: 'insensitive' } },
              { subjectKeyIdentifier: { contains: term, mode: 'insensitive' } },
              { rawPem: { contains: term, mode: 'insensitive' } },
              { rawTxt: { contains: term, mode: 'insensitive' } },
              ...matchedCountryCodes.map(code => ({ issuer: { contains: code, mode: 'insensitive' } })),
            ],
          };
        }),
      };
    }

    const certificates = await prisma.certificatesjs.findMany({
      where: whereClause,
    });

    res.status(200).json(certificates);
  } catch (error) {
    console.error('Error querying the database:', error);
    res.status(500).json({ error: 'Error querying the database' });
  } finally {
    await prisma.$disconnect();
  }
}