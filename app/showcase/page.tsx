'use client';

import React, { useEffect, useRef, useState } from 'react';
import { QRCodeGenerator, countryCodes, OpenPassport1StepVerifier, AppType, OpenPassport1StepInputs, OpenPassport2StepVerifier, OpenPassportVerifierReport } from '@proofofpassport/sdk';
import io, { Socket } from 'socket.io-client';
import { BounceLoader } from 'react-spinners';
import { Autocomplete, TextField } from '@mui/material';
import Lottie from 'lottie-react';
import CHECK_ANIMATION from '../../public/animations/check_animation.json';
import X_ANIMATION from '../../public/animations/x_animation.json';
import LED from '../../components/showcase/Led';

const ProofSteps = {
    WAITING_FOR_MOBILE: 'WAITING_FOR_MOBILE',
    MOBILE_CONNECTED: 'MOBILE_CONNECTED',
    PROOF_GENERATION_STARTED: 'PROOF_GENERATION_STARTED',
    PROOF_GENERATED: 'PROOF_GENERATED',
    PROOF_VERIFIED: 'PROOF_VERIFIED',
};

const countryOptions = Object.values(countryCodes);
type ProofVerificationResult = { valid: boolean; error?: string };

function Showcase() {
    // State declarations
    const [proofStep, setProofStep] = useState(ProofSteps.WAITING_FOR_MOBILE);
    const [proofVerified, setProofVerified] = useState<ProofVerificationResult | null>(null);
    const [olderThan, setOlderThan] = useState('');
    const [nationality, setNationality] = useState('');
    const [appName, setAppName] = useState('Whatever airdrop 🪂');
    const [sessionId, setSessionId] = useState(crypto.randomUUID());
    const [age, setAge] = useState('');
    const [error, setError] = useState(false);
    const [helperText, setHelperText] = useState('');
    const [showAnimation, setShowAnimation] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState('disconnected');
    const [qrElement, setQrElement] = useState<Element | null>(null);

    const qrcodeRef = useRef<HTMLDivElement>(null);
    const scope = '123';
    const userID = '123';

    // Handlers
    const handleOlderThanFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value === '' || /^[0-9]+$/.test(value)) {
            if (value === '') {
                // Empty input is valid
                setError(false);
                setHelperText('');
                setOlderThan('');
            } else {
                const ageValue = Number(value);
                if (ageValue < 10 || ageValue > 98) {
                    setError(true);
                    setHelperText('Age must be between 10 and 98');
                } else {
                    setError(false);
                    setHelperText('');
                    setOlderThan(value);
                }
            }
        } else {
            setError(true);
            setHelperText('Please enter a valid number');
        }
        setAge(value);
    };

    const handleAnimationComplete = () => {
        console.log('Animation completed');
        setShowAnimation(false);
        setProofStep(ProofSteps.WAITING_FOR_MOBILE);
        const newSessionId = crypto.randomUUID();
        setSessionId(newSessionId);
    };

    // Effects
    useEffect(() => {
        const generateQR = async () => {
            const showCaseApp: AppType = {
                name: appName,
                scope,
                userId: userID,
                sessionId,
                circuit: "prove",
                arguments: {
                    disclosureOptions: {
                        ...(olderThan !== '' && { older_than: olderThan }),
                        ...(nationality !== '' && { nationality }),
                    },
                }
            };
            const qr = await QRCodeGenerator.generateQRCode(showCaseApp);
            setQrElement(qr);
        };
        generateQR();
    }, [olderThan, nationality, appName, sessionId]);

    useEffect(() => {
        const newSocket = io('https://proofofpassport-merkle-tree.xyz', {
            path: '/websocket',
            query: { sessionId, clientType: 'web' }
        });

        const handleMobileStatus = async (data: any) => {
            console.log('Received mobile status:', data.status);
            switch (data.status) {
                case 'mobile_connected':
                    setConnectionStatus('mobile_connected');
                    setProofStep(ProofSteps.MOBILE_CONNECTED);
                    break;
                case 'mobile_disconnected':
                    setConnectionStatus('web_connected');
                    // setProofStep(ProofSteps.WAITING_FOR_MOBILE);
                    break;
                case 'proof_generation_started':
                    setProofStep(ProofSteps.PROOF_GENERATION_STARTED);
                    break;
                case 'proof_generated':
                    setProofStep(ProofSteps.PROOF_GENERATED);
                    break;
            }

            if (data.proof) {
                const requirements = [
                    ...(olderThan !== '' ? [["older_than", olderThan]] : []),
                    ...(nationality !== '' ? [["nationality", nationality]] : [])
                ];

                const openPassport1StepVerifier = new OpenPassport1StepVerifier({
                    scope,
                    requirements,
                    dev_mode: true
                });

                try {
                    const local_proofVerified = await openPassport1StepVerifier.verify(data.proof);
                    setProofVerified({ valid: local_proofVerified.valid });
                    setProofStep(ProofSteps.PROOF_VERIFIED);
                    newSocket.emit('proof_verified', { sessionId, proofVerified: local_proofVerified.toJson() });
                } catch (error) {
                    console.error('Error verifying proof:', error);
                    setProofVerified({ valid: false, error: (error as Error).message });
                    newSocket.emit('proof_verified', { sessionId, proofVerified: { valid: false, error: (error as Error).message } });
                }
            }
        };
        newSocket.on('connect', () => setConnectionStatus('web_connected'));
        newSocket.on('disconnect', () => {
            setConnectionStatus('disconnected');
            setProofStep(ProofSteps.WAITING_FOR_MOBILE);
        });
        newSocket.on('mobile_status', handleMobileStatus);

        return () => {
            newSocket.disconnect();
        };
    }, [olderThan, nationality, sessionId]);

    useEffect(() => {
        if (qrElement && qrcodeRef.current) {
            qrcodeRef.current.innerHTML = '';
            qrcodeRef.current.appendChild(qrElement);
        }
    }, [qrElement]);

    useEffect(() => {
        if (proofStep === ProofSteps.PROOF_VERIFIED && proofVerified?.valid === true) {
            setShowAnimation(true);
        }
    }, [proofStep, proofVerified]);

    // Render functions
    const renderProofStatus = () => (
        <div className="flex flex-col items-center">
            <LED connectionStatus={connectionStatus} />
            <div className="w-[300px] h-[300px] flex items-center justify-center">
                {(() => {
                    switch (proofStep) {
                        case ProofSteps.WAITING_FOR_MOBILE:
                        case ProofSteps.MOBILE_CONNECTED:
                            return qrElement ? <div ref={qrcodeRef}></div> : null;
                        case ProofSteps.PROOF_GENERATION_STARTED:
                        case ProofSteps.PROOF_GENERATED:
                            return <BounceLoader loading={true} size={200} color='#94FBAB' />;
                        case ProofSteps.PROOF_VERIFIED:
                            if (proofVerified?.valid === true) {
                                return showAnimation ? (
                                    <Lottie
                                        animationData={CHECK_ANIMATION}
                                        style={{ width: 200, height: 200 }}
                                        // loop={false}
                                        onComplete={handleAnimationComplete}
                                        onLoopComplete={handleAnimationComplete}
                                    // onDestroy={handleAnimationComplete}
                                    />
                                ) : (
                                    qrElement ? <div ref={qrcodeRef}></div> : null
                                );
                            } else {
                                return (
                                    <Lottie
                                        animationData={X_ANIMATION}
                                        style={{ width: 200, height: 200 }}
                                        // loop={false}
                                        onComplete={handleAnimationComplete}
                                        onLoopComplete={handleAnimationComplete}
                                    // onDestroy={handleAnimationComplete}
                                    />
                                );
                            }
                        default:
                            return null;
                    }
                })()}
            </div>
        </div>
    );

    return (
        <div className="App flex flex-col items-center my-16">
            <div className="p-8 flex flex-col items-center">
                <h1 className="text-4xl font-bold mb-8 text-black">OpenPassport playground</h1>
                <div className="mb-16">{renderProofStatus()}</div>
                <TextField
                    label="Name of the app"
                    variant="outlined"
                    value={appName}
                    onChange={(event) => setAppName(event.target.value)}
                    error={error}
                    sx={{ width: '300px', marginBottom: '24px' }}
                />
                <TextField
                    label="Older than"
                    variant="outlined"
                    value={age}
                    onChange={handleOlderThanFieldChange}
                    error={error}
                    helperText={helperText}
                    sx={{ width: '300px', marginBottom: '24px' }}
                />
                <Autocomplete
                    disablePortal
                    id="nationality-select"
                    options={countryOptions}
                    sx={{ width: 300, marginBottom: '24px' }}
                    renderInput={(params) => <TextField {...params} label="Nationality" />}
                    value={nationality}
                    onChange={(event, newValue) => setNationality(newValue || '')}
                />
                <div>proofVerified?.valid: {String(proofVerified?.valid)}</div>
                <div>
                    <p>Proof Status: {proofStep}</p>
                </div>
            </div>
        </div>
    );
}

export default Showcase;