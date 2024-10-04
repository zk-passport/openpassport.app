---
authors: ["Florent"]
title: "Reflecting on the New Democratic Primary"
image: "/nap.jpg"
date: "2024-09-05"
---

After the first US Presidential debate, it became obvious Democrats needed a new primary. Along with our friends Nate and David, we pulled together a verifiable election in two weeks. The interactive results are public and live on [newdemocraticprimary.org/results](https://newdemocraticprimary.org/results).

Our goal was threefold.

**Provide a novel way for citizens to voice their opinion.** Democracy is often limited to occasional majority voting for a single leader. We wanted to show that ranked choice voting systems like *Ranked Robin* can be used to select politicians that match citizen's expectations better.

**Show that auditable, citizen-gated elections are possible now.** Using OpenPassport, we ensured that only US citizen could vote in a cryptographically secure and privacy-preserving way. The alternative would have involved collecting ID card or passport photos, which can be forged by generative models and do not protect privacy or provide auditability.

**Stress test OpenPassport.** Because passports contain sensitive info, their data shouldn't be shared online, which makes it hard for us to test our app. Only by deploying an application at scale can we make sure it works for most people.

### How it worked

The New Democratic Primary used two main protocols.

OpenPassport was used to check the nationality of users. Upon voting, they were prompted to download the mobile app and scan their passport. Then, they could generate a proof that their passport is valid and commit to a user identifier. When done, the proof was sent to a server along with the intermediate certificate that signed their passport. This certificate only reveals the nationality of the person — which is expected here — and the period of ~3 months in which is was issued.

SIV was used to encrypt and tally the votes. Using SIV, users could decide on an ordering of candidates. Their votes are then encrypted and can be shuffled multiple times to guarantee anonymity. SIV uses multiple cryptographic primitives, including zero-knowledge proofs to make sure the results are auditable. For more information on how SIV works, see [here](https://siv.org/protocol).

We also provided options to verify via phone number or opt out of verification entirely, and tallied votes separately.

### The results

A few days after we launched, Joe Biden stepped down and demand for a new primary evaporated. Still, we had 230 votes total, with around 11% (25) completing passport verification.

For interactive results on which candidates scored best, see the [result page on newdemocraticprimary.org](https://newdemocraticprimary.org/results).

### What we learned

This experience was instructive for us:
- NFC chip reading was sometimes challenging, and we still have to improve it to make the user flow seamless.
- Because around half of the US population does not hold a passport, zk verification should be used in tandem with other means for universality. There can be a threshold of conditions to be met for someone to be considered a valid user, or a scoring system can be used.
- Auditability matters: by [letting anyone verify proofs locally](https://newdemocraticprimary.org/results), we can assure the highest standard of transparency.
- Shipping a custom frontend with a QR code system was super instructive for the rest of our work.

Overall, we see a potential in anonymous verification of passports and ID cards for alternative elections, online spam resistance and privacy-preserving compliance checks.

If you want to use OpenPassport, try out the [playground](https://www.openpassport.app/playground) now or check out the [docs](https://docs.openpassport.app/).