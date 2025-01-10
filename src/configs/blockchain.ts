import { Networks } from '@/enums';

export const publicRpcs = {
  testnet: 'https://testnet.fuel.network/v1/graphql',
} as const satisfies Record<Networks, string>;
