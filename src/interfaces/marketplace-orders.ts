import { Networks } from '@/enums';
import { Account } from 'fuels';

export interface SubgraphListingData {
  id: string;
  status: 'ACTIVE' | 'INACTIVE';
  nftAddress: `0x${string}`;
  nftType: 'NFT' | 'SFT';
  tokenId: `0x${string}`;
  asset_id: `0x${string}`;
  quantity: string;
  pricePerItem: string;
  seller: `0x${string}`;
}

export interface MarketplaceListings {
  itemId: number;
  isActive: boolean;
  nftAddress: `0x${string}`;
  itemStandard: 'NFT' | 'SFT';
  tokenId: `0x${string}`;
  assetId: `0x${string}`;
  itemQuantity: number;
  pricePerItem: string;
  sellerAddress: `0x${string}`;
  itemName: string;
  itemImage: string;
  itemMedia: string;
}

export interface SubgraphCollectionData {
  id: `0x${string}`;
  nftType: 'NFT' | 'SEMI_FT';
  name: string;
  symbol: string;
  floorPrice: string;
  listed: string;
}

export interface MarketplaceCollections {
  collectionId: `0x${string}`;
  collectionStandard: 'NFT' | 'SFT';
  collectionName: string;
  collectionSymbol: string;
  floorPrice: string;
  totalItemsListed: number;
  bannerImage: string;
}

export interface TokenDetails {
  name: string;
  image: string;
  assetMedia: string;
  description: string;
  contractAddress: `0x${string}`;
  assetId: `0x${string}`;
  tokenStandard: 'NFT' | 'SFT';
  contractName: string;
  contractSymbol: string;
  tokenId: `0x${string}`;
}

export interface FetchOwnedNftArgs {
  network: Networks;
  subgraphURL: string;
  wallet: Account;
  nftDetails: {
    contractAddress: `0x${string}`;
    subId: `0x${string}`;
    nftStandard: 'NFT' | 'SFT';
  };
}

export interface NftDetails extends MarketplaceListings {
  description: string;
}

export interface ListingMetadata {
  name: string;
  image: string;
  assetMedia: string;
  description: string;
}

export interface CollectionMetadata {
  image: string;
}
