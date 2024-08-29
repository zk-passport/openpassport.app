'use client';

import React, { useEffect, useRef, useState } from 'react';
import { countryCodes, OpenPassportVerifierReport } from '@proofofpassport/sdk';
import { Autocomplete, TextField } from '@mui/material';
import { OpenPassportQRcode } from '@proofofpassport/sdk';

const countryOptions = Object.values(countryCodes);

function Showcase() {
    // State declarations
    const [olderThan, setOlderThan] = useState('');
    const [nationality, setNationality] = useState('');
    const [appName, setAppName] = useState('Whatever airdrop 🪂');
    const [age, setAge] = useState('');
    const [error, setError] = useState(false);
    const [helperText, setHelperText] = useState('');

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

    const handleSuccessfulVerification = (verificationResult: OpenPassportVerifierReport) => {
        console.log('Proof verified successfully:', verificationResult);
    };

    return (
        <div className="App flex flex-col items-center my-16">
            <div className="p-8 flex flex-col items-center">
                <h1 className="text-4xl font-bold mb-8 text-black">OpenPassport playground</h1>
                <div className="mb-16">
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
                    />
                </div>
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
            </div>
        </div>
    );
}

export default Showcase;