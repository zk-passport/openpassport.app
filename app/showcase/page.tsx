'use client';

import { QRCodeGenerator, countryCodes, ProofOfPassportWeb2Verifier } from '@proofofpassport/sdk';
import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { BounceLoader } from 'react-spinners';
import { CircleCheck, XCircle } from 'lucide-react';
import { Autocomplete, TextField } from '@mui/material';

// Define the enum for different steps
const ProofSteps = {
    WAITING_FOR_MOBILE: 'WAITING_FOR_MOBILE',
    MOBILE_CONNECTED: 'MOBILE_CONNECTED',
    PROOF_GENERATION_STARTED: 'PROOF_GENERATION_STARTED',
    PROOF_GENERATED: 'PROOF_GENERATED',
    PROOF_VERIFIED: 'PROOF_VERIFIED',
};

const countryOptions = Object.values(countryCodes);

function Showcase() {
    const qrcodeRef = useRef(null);
    const [proofStep, setProofStep] = useState(ProofSteps.WAITING_FOR_MOBILE);
    const [socket, setSocket] = useState(null);
    const [proofVerified, setProofVerified] = useState(null);
    const [olderThan, setOlderThan] = useState('');
    const [nationality, setNationality] = useState('');
    const [appName, setAppName] = useState('Whatever airdrop 🪂');
    const sessionId = '1'; // In a real app, this should be dynamically generated
    const scope = '1';

    const [age, setAge] = useState('');
    const [error, setError] = useState(false);
    const [helperText, setHelperText] = useState('');

    const handleOlderThanFieldChange = (event) => {
        const value = event.target.value;

        // Check if value is a valid number and within the range
        if (value === '' || /^[0-9]+$/.test(value)) {
            const ageValue = Number(value);
            if (ageValue < 0 || ageValue > 98) {
                setError(true);
                setHelperText('Age must be between 0 and 98');
            } else {
                setError(false);
                setHelperText('');
                setOlderThan(value);
            }
        } else {
            setError(true);
            setHelperText('Please enter a valid number');
        }

        setAge(value);
    };

    useEffect(() => {
        const generateQR = async () => {
            const disclosureOptions = {};
            if (olderThan !== '') {
                disclosureOptions['older_than'] = olderThan;
            }
            if (nationality !== '') {
                disclosureOptions['nationality'] = nationality;
            }

            const appData = {
                name: appName,
                scope: scope,
                userId: sessionId,
                disclosureOptions,
                circuit: "disclose"
            };

            const qrcode = await QRCodeGenerator.generateQRCode(appData);

            if (qrcodeRef.current) {
                qrcodeRef.current.innerHTML = '';
                qrcodeRef.current.appendChild(qrcode._el);
            }
        };

        generateQR();
    }, [olderThan, nationality, appName]);

    useEffect(() => {
        const newSocket = io('https://proofofpassport-merkle-tree.xyz', {
            path: '/websocket',
            query: { sessionId, clientType: 'web' }
        });

        newSocket.on('connect', () => {
            console.log('Web browser connected to WebSocket server');
        });

        newSocket.on('mobile_status', async (data) => {
            console.log('Received mobile status:', data.status);
            switch (data.status) {
                case 'mobile_connected':
                    setProofStep(ProofSteps.MOBILE_CONNECTED);
                    break;
                case 'proof_generation_started':
                    setProofStep(ProofSteps.PROOF_GENERATION_STARTED);
                    break;
                case 'proof_generated':
                    setProofStep(ProofSteps.PROOF_GENERATED);
                    break;
                // default:
                //   setProofStep(ProofSteps.WAITING_FOR_MOBILE);
            }

            if (data.proof) {
                const requirements = [];
                if (olderThan !== '') {
                    requirements.push(["older_than", olderThan]);
                }
                if (nationality !== '') {
                    requirements.push(["nationality", nationality]);
                }

                const popWeb2Verifier = new ProofOfPassportWeb2Verifier({
                    scope: scope,
                    requirements
                });
                try {
                    const local_proofVerified = await popWeb2Verifier.verify(data.proof);
                    console.log('proofVerified', local_proofVerified.toJson());
                    setProofVerified(local_proofVerified.toJson());
                    setProofStep(ProofSteps.PROOF_VERIFIED);

                    // Send proof_verified status back to the server
                    newSocket.emit('proof_verified', { sessionId, proofVerified: local_proofVerified.toJson() });
                } catch (error) {
                    console.error('Error verifying proof:', error);
                    setProofStep(ProofSteps.PROOF_VERIFIED);
                    setProofVerified({ valid: false, error: error.message });
                    newSocket.emit('proof_verified', { sessionId, proofVerified: { valid: false, error: error.message } });
                }
            }
            console.log(data);
        });

        newSocket.on('disconnect', () => {
            console.log('Web browser disconnected from WebSocket server');
            setProofStep(ProofSteps.WAITING_FOR_MOBILE);
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [olderThan, nationality]);

    const renderProofStatus = () => {
        switch (proofStep) {
            case ProofSteps.WAITING_FOR_MOBILE:
            case ProofSteps.MOBILE_CONNECTED:
                return <div ref={qrcodeRef}></div>;
            case ProofSteps.PROOF_GENERATION_STARTED:
            case ProofSteps.PROOF_GENERATED:
                return <BounceLoader loading={true} size={300} color='#94FBAB' />;
            case ProofSteps.PROOF_VERIFIED:
                return JSON.parse(proofVerified).valid === true ? <CircleCheck size={300} color='#A9E190' /> : <XCircle size={300} color='#EF3E36' />;
            default:
                return null;
        }
    };

    return (
        <div className="App flex flex-col items-center my-16">
            <div className="p-8 flex flex-col items-center">
                <h1 className="text-4xl font-bold mb-8 text-black">Proof of Passport playground</h1>

                <div className="mb-16">
                    {renderProofStatus()}
                </div>
                <div className="mb-6">
                    <TextField
                        label="Name of the app"
                        variant="outlined"
                        defaultValue="ZKSync Airdrop"
                        value={appName}
                        onChange={(event) => setAppName(event.target.value)}
                        error={error}
                        sx={{ width: '300px' }}
                    />
                </div>

                <div className="mb-6">
                    <TextField
                        label="Older than"
                        variant="outlined"
                        value={age}
                        onChange={handleOlderThanFieldChange}
                        error={error}
                        helperText={helperText}
                        sx={{ width: '300px' }}
                    />
                </div>

                <div className="mb-6">
                    <Autocomplete
                        disablePortal
                        id="nationality-select"
                        options={countryOptions}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Nationality" />}
                        value={nationality}
                        onChange={(event, newValue) => {
                            setNationality(newValue || '');
                        }}
                    />
                </div>

                <div>
                    <p>Proof Status: {proofStep}</p>
                </div>
            </div>
        </div>
    );
}

export default Showcase;