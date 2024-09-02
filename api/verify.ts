import { NextApiRequest, NextApiResponse } from 'next';
import { OpenPassportVerifierReport, OpenPassport1StepInputs, OpenPassport1StepVerifier } from '@openpassport/sdk';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { proof } = req.body.proof;
        const { verifierArgs } = req.body.verifierArgs;
        const openPassport1StepVerifier = new OpenPassport1StepVerifier(verifierArgs);
        const isValid = await openPassport1StepVerifier.verify(proof as OpenPassport1StepInputs);
        if (isValid) {
            res.status(200).json({ message: 'Proof is valid' });
        } else {
            res.status(400).json({ message: 'Invalid proof' });
        }

    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }

}