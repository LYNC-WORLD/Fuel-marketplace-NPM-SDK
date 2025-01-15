export interface SubgraphListingData {
  id: string;
  status: 'ACTIVE' | 'INACTIVE';
  nftAddress: `0x${string}`;
  nftType: 'NFT' | 'SEMI_FT';
  tokenId: `0x${string}`;
  asset_id: `0x${string}`;
  quantity: string;
  pricePerItem: string;
  seller: `0x${string}`;
}

export interface MarketplaceListings {
  listingId: number;
  isActive: boolean;
  nftAddress: `0x${string}`;
  tokenStandard: 'NFT' | 'SEMI_FT';
  tokenId: `0x${string}`;
  assetId: `0x${string}`;
  tokenQuantity: number;
  pricePerItem: string;
  sellerAddress: `0x${string}`;
  tokenName: string;
  tokenImage: string;
  tokenAssetMedia: string;
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
  contractAddress: `0x${string}`;
  tokenStandard: 'NFT' | 'SEMI_FT';
  collectionName: string;
  collectionSymbol: string;
  floorPrice: string;
  totalItemsListed: number;
  bannerImage: string;
}

export interface TokensInCollection {
  tokenName: string;
  tokenImage: string;
  tokenAssetMedia: string;
  description: string;
  contractAddress: `0x${string}`;
  tokenId: `0x${string}`;
  assetId: `0x${string}`;
  tokenStandard: 'NFT' | 'SEMI_FT';
  contractName: string;
  contractSymbol: string;
}

export interface OmittedMarketplaceListings
  extends Omit<MarketplaceListings, 'tokenName' | 'tokenImage' | 'tokenAssetMedia'> {}
export interface NftMetadata {
  tokenName: string;
  tokenImage: string;
  tokenAssetMedia: string;
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

export interface NftDetails {
  listingData: OmittedMarketplaceListings[];
  nftMetadata: NftMetadata;
}
