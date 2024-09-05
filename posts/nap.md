---
authors: ["Florent"]
title: "Reflecting on the New Democratic Primary"
image: "/nap.jpg"
date: "2024-09-05"
---

After the first US Presidential debate, it became obvious democrats needed a new primary. Along with our friends Nate and David, we pulled together a verifiable election in two weeks. The interactive results are public and live on [newdemocraticprimary.org/results](https://newdemocraticprimary.org/results).

Our goal was twofold.

**Provide a novel way for citizen to voice their opinion.** Democracy is often limited to occasional majority voting for a single leader. We wanted to show that ranked choice voting systems like *Ranked Robin* can be used to select politicians that match citizen's expectations better.

**Show that auditable, citizen-gated elections are possible now**. Using OpenPassport, we could make sure only US citizen could vote.

### How it worked

The New Democratic Primary used two main protocols.

OpenPassport was used to check the nationality of users. Upon voting, they were prompted to download the mobile app and scan their passport. Then, they could generate a proof that their passport is valid and commit to a user identifier. When done, the proof was sent to a server along with the intermediate certificate that signed their passport. This certificate only reveals the nationality of the person — which is expected here — and the period of ~3 month in which is was issued.

SIV was used to encrypt and tally the votes. Using SIV, users could decide on an ordering of candidates. Their votes are then encrypted and can be shuffled multiple times to guarantee anonymity. SIV uses multiple cryptographic primitives, including zero-knowledge proofs to make sure the results are auditable. For more information on how SIV works, see [here](https://siv.org/protocol).

Because around half of the US population does not hold a passport, we also provided options to verify with a phone number or not verify at all, and tallied separately.

### The results

A few days after we launched, Joe Biden stepped down and demand for a new primary evaporated. Still, we had 230 votes total, with around 11% (25) completing passport verification.

For interactive results on which candidates scored best, see the [result page on newdemocraticprimary.org](https://newdemocraticprimary.org/results).

### What we learned

Shipping a custom frontend for the new democratic primary was very instructive. We got to learn about how the user experience of scanning could be improved and how we could communicate better with users regarding privacy and security. Overall, we are optimistic on alternative elections and their potential with attestations like passports and ID cards.

If you want to use OpenPassport, try out the [playground](https://www.openpassport.app/playground) now or check out the [docs](https://docs.openpassport.app/).