import { Networks } from '@/enums';

export const publicRpcs = {
  testnet: 'https://testnet.fuel.network/v1/graphql',
} as const satisfies Record<Networks, string>;

export const marketplaceAddresses = {
  testnet: '0xb05032967c123dc561f7cef1ed9c079a4833d658ce9d74885e3ec3ec94cdcde7',
} as const satisfies Record<Networks, `0x${string}`>;

export const subgraphURLs = {
  testnet: 'https://indexer.dev.hyperindex.xyz/57541e1/v1/graphql',
} as const satisfies Record<Networks, string>;
