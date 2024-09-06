---
authors: ["Florent"]
title: "Introducing OpenPassport"
image: "/introducing-op.jpg"
date: "2024-07-25"
---

Trust underpins civilization. It allows us to coordinate and shoot for more ambitious goals than any individual can ever reach alone.

The internet extended the surface area of possible trust by multiplying opportunities for connection. But in doing so, it dissolved the web of trust we were used to. It opened the way for sophisticated actors to run millions of bots passing for humans. They are now able to lead public opinion on social medias and capture voting power of protocols trying to decentralize their governance.

Our success as a civilization depends on our ability to recreate trust infrastructures at scale. If we can't get groups larger than Dunbar's number to coordinate, we are doomed to see the tragedy of the commons play out again and again, or to see opaque entities take control of public space and open protocols.

In the coming years, AI is going to make any simple humanity check irrelevant. **How can we make sure the internet of the future is run by humans, not bots?**

### Tools for provable expressivity

If we want to restore trust online, we need new tools. They should allow us to prove information about ourselves reliably, without having to disclose what we want to keep private. If this is not done, permissioned systems regulated by large actors will take the lead and require everyone to give up ownership of their data. If the dream of a free and chaotic cryptoanarchist internet doesn't make sense anymore with bots and agents, a closed and centralized system is no better.

Our work is based on three premises.

**People do care about privacy, though only for what matters:** Most users don't care about privacy for social media or messaging because they don't feel like their data is sensitive enough. Financial transaction and personal identification information feel more urgent and can help bootstrap a better system.

**Relying on deployed infrastructure rather than starting a new network:** Too many projects are trying to tackle proof of humanity by deploying their own infrastructure or creating new webs of trust, and end up failing to generate network effects. We should strive to piggyback on existing networks for as long as necessary.

**Proof of personhood matters, now:** Every month, a new token distribution loses most of its supply to bot farmers, and our favorite social media become more bot-ridden. Sybil resistance is achievable today and can solve both those problems.

### Introducing OpenPassport

Today, we're releasing OpenPassport. Our app and circuits let users scan the NFC chip in their passport with any NFC-enabled phone and prove the correctness of the government attestation in a zk-SNARK. This allows anybody to prove their nationality, age or simply humanity while only disclosing the exact information they want public.

We are also releasing implementations for the verification of the 3 most common signature algorithms used by countries to issue passports. Together, they allow support for around 50% of the world's passports. Along with that, we're open sourcing our [registry](https://openpassport.app/search) and [global map](https://map.openpassport.app/) showing the usage of signature algorithms by country.

All our code is open-source and MIT licensed.

### Looking Ahead

In the coming month, we will release a new verification architecture that taps onto CSCAs, the root source of trust for all passports worldwide. This will allow the verification of 95%+ of the world's passports.

We will also announce our first integrations and the results we've gathered.

If you want to start building with OpenPassport, please [reach out](https://t.me/FlorentTavernier) to get access to our beta sdk.
