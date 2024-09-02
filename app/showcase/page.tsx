'use client';

import React, { useEffect, useRef, useState } from 'react';
import { countryCodes, OpenPassportVerifierReport, OpenPassportQRcode, OpenPassport1StepInputs } from '@openpassport/sdk';
import { Autocomplete, TextField } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { tokyoNightDay } from '@uiw/codemirror-theme-tokyo-night-day';
import { whiteLight } from '@uiw/codemirror-theme-white'

const countryOptions = Object.values(countryCodes);

const fakeAppNames = [
    '🚀 Space Explorer',
    '🧙‍♂️ Wizard\'s Wand',
    '🍕 Pizza Party',
    '🌈 Rainbow Chaser',
    '👩‍🎨 Color Splash'
];

function Showcase() {
    // State declarations
    const [olderThan, setOlderThan] = useState('');
    const [nationality, setNationality] = useState('');
    const [appName, setAppName] = useState('');
    const [age, setAge] = useState('');
    const [error, setError] = useState(false);
    const [helperText, setHelperText] = useState('');
    const [callback, setCallback] = useState(`(appName, toast) => {
  toast(\`Congrats, you have been added to the group \${appName}\`);
} // triggered only if the proof is valid`);

    const scope = '@OpenPassportPlayground';
    const userID = crypto.randomUUID();

    useEffect(() => {
        // Randomly select an app name when the component mounts
        const randomIndex = Math.floor(Math.random() * fakeAppNames.length);
        setAppName(fakeAppNames[randomIndex]);
    }, []);

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

    const handleSuccessfulVerification = async (proof: OpenPassport1StepInputs, verificationResult: OpenPassportVerifierReport) => {
        console.log('Proof verified successfully:', verificationResult);
        try {
            // Call the backend API to verify the proof
            const response = await fetch('/api/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ proof }),
            });

            if (!response.ok) {
                throw new Error('Failed to verify proof');
            }

            const data = await response.json();
            console.log('Backend verification result:', data);

            // Extract the function body without the comment
            const functionBody = callback.replace(/\/\/.*$/, '').trim();
            // Create a new function from the extracted body
            const callbackFunction = new Function('appName', 'toast', `
                return (${functionBody})
            `);

            callbackFunction()(appName, toast);
        } catch (error) {
            console.error('Error executing callback:', error);
            toast.error('Error executing callback');
        }
    };

    const [qrCodeSize, setQrCodeSize] = useState(300);

    useEffect(() => {
        const handleResize = () => {
            setQrCodeSize(window.innerWidth > 1024 ? 400 : 300);
        };

        // Set initial size
        handleResize();

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Clean up
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="App flex flex-col items-center my-8 px-4 md:my-32  md:mb-48 mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-black text-center">OpenPassport playground</h1>
            <div className="flex flex-col md:flex-row w-full max-w-6xl md:mt-12">
                <div className="w-full md:w-1/2 md:pr-4 flex items-center justify-center mb-8 md:mb-0 ">
                    <OpenPassportQRcode
                        appName={appName}
                        scope={scope}
                        userId={userID}
                        requirements={[
                            ...(olderThan !== '' ? [["older_than", olderThan]] : []),
                            ...(nationality !== '' ? [["nationality", nationality]] : [])
                        ]}
                        onSuccess={handleSuccessfulVerification}
                        devMode={true}
                        size={qrCodeSize}
                    />
                </div>
                <div className="w-full md:w-1/2 md:pl-4 flex flex-col justify-between mt-6">
                    <div className="flex flex-col justify-between mb-8">
                        <TextField
                            label="Name of the app"
                            variant="outlined"
                            value={appName}
                            onChange={(event) => setAppName(event.target.value)}
                            error={error}
                            sx={{ width: '100%', marginBottom: '12px' }}
                        />
                        <TextField
                            label="Older than"
                            variant="outlined"
                            value={age}
                            onChange={handleOlderThanFieldChange}
                            error={error}
                            helperText={helperText}
                            sx={{ width: '100%', marginBottom: '12px' }}
                        />
                        <Autocomplete
                            disablePortal
                            id="nationality-select"
                            options={countryOptions}
                            sx={{ width: '100%' }}
                            renderInput={(params) => <TextField {...params} label="Nationality" />}
                            value={nationality}
                            onChange={(event, newValue) => setNationality(newValue || '')}
                        />
                    </div>
                    <div>
                        <h1 className="text-xs text-[#666666] ml-2 mb-1" style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>Callback function</h1>
                        <div className="code-editor-container" style={{
                            width: '100%',
                            borderRadius: '6px',
                            overflow: 'hidden',
                            border: '1px solid var(--border-color, #c4c4c4)',
                            transition: 'border-color 0.2s ease',
                        }}>
                            <CodeMirror
                                value={callback}
                                maxHeight='130px'
                                theme={whiteLight}
                                extensions={[javascript({ jsx: true })]}
                                onChange={(value) => setCallback(value)}
                                basicSetup={{
                                    lineNumbers: false,
                                    foldGutter: false,
                                }}
                                className="custom-codemirror"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Showcase;