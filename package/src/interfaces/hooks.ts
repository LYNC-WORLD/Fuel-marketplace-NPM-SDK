import { Networks } from '@/enums';

export interface HooksReturn<TReturnData = unknown> {
  fetching: boolean;
  data: TReturnData;
  error: unknown;
}

export interface HooksArgs {
  network: Networks;
  limit?: number;
}

export interface AllNftsInCollectionArgs {
  network: Networks;
  nftStandard: 'NFT' | 'SEMI_FT';
  contractAddress: `0x${string}`;
}

export interface NftDetailsArgs extends HooksArgs {
  contractAddress: `0x${string}`;
  tokenId: string;
  nftStandard: 'NFT' | 'SEMI_FT';
}
