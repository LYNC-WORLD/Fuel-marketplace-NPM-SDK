# NFT Marketplace on Fuel Blockchain

Frontend for NFT Marketplace on Fuel Blockchain.

- Production URL: [https://fuel-marketplace.lync.world/](https://fuel-marketplace.lync.world/)

## Blockchain Configs -

- Marketplace Contract Address: `0xb05032967c123dc561f7cef1ed9c079a4833d658ce9d74885e3ec3ec94cdcde7`
- Subgraph URL: `https://indexer.dev.hyperindex.xyz/57541e1/v1/graphql`

## Environment Variables -

```bash
.env.local

NEXT_PUBLIC_WC_PROJECT_ID = "<wallet-connect-project-id>"
```

## Run Locally -

- Clone the project: `git clone git@github.com:LYNC-WORLD/Marketplace-Frontend.git`
- Go to the project directory: `cd Marketplace-Frontend`
- Checkout to the branch: `git checkout fuel-marketplace`
- Install dependencies: `yarn` (recommended) or `npm install`
- Start the server: `yarn dev` (recommended) or `npm run dev`
- Build command: `yarn build` (recommended) or `npm run build`
