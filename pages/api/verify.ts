import { NextApiRequest, NextApiResponse } from 'next';
import { SelfBackendVerifier } from '@openpassport/core';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { proof, publicSignals } = req.body;

        if (!proof || !publicSignals) {
            return res.status(400).json({ message: 'Proof and publicSignals are required' });
        }

        try {
            const selfBackendVerifier = new SelfBackendVerifier(
                'https://forno.celo.org',
                "test-scope"
            );

            // Example setup - customize based on your needs
            selfBackendVerifier.setMinimumAge(20);
            selfBackendVerifier.setNationality('France');
            selfBackendVerifier.enableNameAndDobOfacCheck();

            const result = await selfBackendVerifier.verify(proof, publicSignals);

            console.log(result);

            if (result.isValid) {
                res.status(200).json({ 
                    message: 'Proof is valid',
                    details: result
                });
            } else {
                res.status(400).json({ 
                    message: 'Invalid proof',
                    details: result.isValidDetails
                });
            }
        } catch (error) {
            console.error('Error verifying proof:', error);
            return res.status(500).json({ message: 'Error verifying proof' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}