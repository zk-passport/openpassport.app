import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import allCountries from './../../public/data/all-countries.json';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check if the request is not GET or if it's from a browser
  if (req.method !== 'GET' || req.headers.accept?.includes('text/html')) {
    return res.status(405).end('Method Not Allowed');
  }

  const { type, sha, algorithm, exponent, search, limit = '101' } = req.query;

  try {
    let whereClause: any = { AND: [] };

    // Handle keyword-based searches
    if (sha) {
      whereClause.AND.push({ hashAlgorithm: { contains: sha as string, mode: 'insensitive' } });
    }
    if (algorithm) {
      whereClause.AND.push({ signatureAlgorithm: { equals: algorithm as string, mode: 'insensitive' } }); // Changed to exact match
    }
    if (exponent) {
      whereClause.AND.push({
        publicKeyDetails: {
          path: ['exponent'],
          equals: exponent as string
        }
      });
    }

    // Handle free text search
    if (search) {
      const searchTerms = (search as string).split(/\s+/);

      const searchClause = {
        OR: searchTerms.map(term => {
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
      whereClause.AND.push(searchClause);
    }

    let tableName;
    if (type === 'dsc') {
      tableName = 'dsc_masterlist';
    } else if (type === 'csca') {
      tableName = 'csca_masterlist';
    } else {
      return res.status(400).json({ error: 'Invalid type parameter. Use "dsc" or "csca".' });
    }

    const certificates = await (prisma as any)[tableName].findMany({
      where: whereClause.AND.length > 0 ? whereClause : {},
      take: parseInt(limit as string, 10),
    });

    res.status(200).json(certificates);
  } catch (error) {
    console.error('Error querying the database:', error);
    res.status(500).json({ error: 'Error querying the database' });
  } finally {
    await prisma.$disconnect();
  }
}