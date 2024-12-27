import { Networks } from '@/enums';

export const publicRpcs = {
  testnet: 'https://testnet.fuel.network/v1/graphql',
} as const satisfies Record<Networks, string>;

export const graphQLEndpoints = {
  testnet: 'https://indexer.dev.hyperindex.xyz/57541e1/v1/graphql',
} as const satisfies Record<Networks, string>;
