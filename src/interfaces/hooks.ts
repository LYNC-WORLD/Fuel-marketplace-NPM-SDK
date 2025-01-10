import { Networks } from '@/enums';

export interface HooksReturn<TReturnData = unknown> {
  fetching: boolean;
  data: TReturnData;
  error: unknown;
}

export interface HooksArgs {
  network: Networks;
  subgraphURL: string;
  limit?: number;
}

export interface AllNftsInCollectionArgs extends Pick<HooksArgs, 'network'> {
  nftStandard: 'NFT' | 'SFT';
  contractAddress: `0x${string}`;
}

export interface NftDetailsArgs extends HooksArgs {
  contractAddress: `0x${string}`;
  tokenId: string;
  nftStandard: 'NFT' | 'SFT';
}
