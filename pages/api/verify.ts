import { NextApiRequest, NextApiResponse } from 'next';
import { OpenPassportVerifier, OpenPassportAttestation } from '@openpassport/core';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { proof, verifierArgs } = req.body;

        if (!proof || !verifierArgs) {
            return res.status(400).json({ message: 'Proof and verifierArgs are required' });
        }

        let isValid = false;
        try {
            const openPassportVerifier = new OpenPassportVerifier('prove_offchain', 'myExampleApp')
            isValid = (await openPassportVerifier.verify(proof as OpenPassportAttestation)).valid;
        } catch (error) {
            console.error('Error verifying proof:', error);
            return res.status(500).json({ message: 'Error verifying proof' });
        }

        if (isValid) {
            res.status(200).json({ message: 'Proof is valid' });
        } else {
            res.status(400).json({ message: 'Invalid proof' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}