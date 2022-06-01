## Welcome to Lightning Terminal!

`Lightning Terminal` is a powerful web all-in-one interface that integrates Lightning Pool, Lightning Loop and Faraday.

>
> **Lightning Loop:** Make a Lightning transaction to an on-chain bitcoin address (Loop Out) or send on-chain bitcoin directly into a Lightning channel (Loop In). 
>
> **Lightning Pool:** Marketplace for buying and selling channel liquidity. Lightning Terminal allows users to place their own asks and bids through the web browser.
>
> **Faraday(SSH Required):** Data Reporting tool developed by Lightning Labs to help you extract valuable analytics and insights from your LND node. Please note that Faraday is command line only, and not supported by EmbassyOS.

**To use the Faraday command line interface (frcli) you will need to ssh into your Embassy:**

Usage: 
- `docker exec lightning-terminal.embassy frcli --rpcserver=localhost:8443 "command"`

For help finding more Faraday commands, type 
- `docker exec lightning-terminal.embassy frcli --rpcserver=localhost:8443 -help`


### You may also reference the [Walkthrough](https://docs.lightning.engineering/lightning-network-tools/lightning-terminal/get-lit) document for additional guidance on how to use the product.
