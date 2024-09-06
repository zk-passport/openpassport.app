import { NextApiRequest, NextApiResponse } from 'next';
import { OpenPassportVerifierReport, OpenPassport1StepInputs, OpenPassport1StepVerifier } from '@openpassport/sdk';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { proof, verifierArgs } = req.body;

        if (!proof || !verifierArgs) {
            return res.status(400).json({ message: 'Proof and verifierArgs are required' });
        }

        let isValid = false;
        try {
            const openPassport1StepVerifier = new OpenPassport1StepVerifier(verifierArgs);
            isValid = (await openPassport1StepVerifier.verify(proof as OpenPassport1StepInputs)).valid;
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