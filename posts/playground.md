---
authors: ["Florent"]
title: "Announcing the OpenPassport playground"
image: "/playground.jpg"
date: "2024-09-04"
---

The OpenPassport playground is live at [openpassport.app/playground](https://www.openpassport.app/playground). You can create a mock application, generate a privacy-preserving proof with your passport or mock data, and verify it.

### How it works

Electronic passports contain a chip that exposes the personal data of the citizen, along with a digital signature by the relevant country authority. Although those signatures are made over the whole of the person's data, OpenPassport makes it possible to generate zero-knowledge proofs disclosing only some attributes such as name, age, nationality or simply the possession of a valid passport. Those proofs make sure the passport is authentic to prevent forgery, but keep the user's details private.

### Our setup for the playground

In the playground, we verify the bottom-level of the passport certificate chain in zero-knowledge, and the upper-level in plaintext. This means the user sends the certificate that signed their passports along with the zero-knowledge proof to the server. The certificate reveals the country that issued it and the ~3 month period in which the passport was issued. This is sufficient for many use cases, given the vast number of passports issued by each country in the same period.

In the future, the playground will support the verification of the whole trust chain in zero-knowledge, revealing essentially nothing to the server.

### The SDK

The playground is a simple page that imports the OpenPassport SDK in the background.

If you want to use it, you can check out the [docs](https://docs.openpassport.app/) now, and [contact us](https://t.me/FlorentTavernier) if you have any questions or need help.

### What's next?

In the coming weeks, we will be supporting more passports, ship verification of the whole trust chain, and announce the results of our first experiments.

Until then, here are a few things you can build:
- A wallet that supports recovery with passports
- A DeFi protocol gated to a specific nationality
- A social network gated to real humans.

To stay up to date, [follow us on twitter](https://x.com/openpassportapp).