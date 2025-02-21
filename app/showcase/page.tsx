'use client';

import React from 'react';
import OpenPassportQRcodeWrapper, { SelfAppBuilder } from '@openpassport/qrcode2';
import { v4 as uuidv4 } from 'uuid';
import { logo } from '../../content/playgroundAppLogo';


function Showcase() {
    const userId = uuidv4();

    const selfApp = new SelfAppBuilder({
        appName: "Self Playground",
        scope: "my-scope",
        endpoint: "https://staging.openpassport.app/api/verify",
        logoBase64: logo,
        userId,
        disclosures: {
            name: true,
            nationality: true,
            date_of_birth: true,
            passport_number: true,
            minimumAge: 18,
            excludedCountries: ["IRN", "IRQ"],
            ofac: true,
        }
    }).build();

    return (
        <div className="App flex flex-col items-center justify-center  px-4  h-screen" suppressHydrationWarning>
            <h1 className="text-3xl md:text-4xl font-bold text-black text-center md:py-16 md:-mt-32">OpenPassport playground v2</h1>
            <OpenPassportQRcodeWrapper
                selfApp={selfApp}
                onSuccess={() => {
                    console.log('success');
                }}
            />
        </div >
    );
}

export default Showcase;