import { AbstractAddress, Account } from 'fuels';

declare enum AllowedProviders {
    FuelProvider = "FuelProvider",
    WalletProvider = "WalletProvider"
}
declare enum Networks {
    Testnet = "testnet"
}
declare enum MarketplaceErrorCodes {
    InsufficientBalance = "InsufficientBalance",
    NetworkError = "NetworkError",
    ServerError = "ServerError",
    ValidationError = "ValidationError"
}

declare class MarketplaceError<TErrorData = unknown> extends Error {
    code: MarketplaceErrorCodes;
    errorData?: TErrorData | undefined;
    constructor(message: string, code: MarketplaceErrorCodes, errorData?: TErrorData | undefined);
}

interface HooksReturn<TReturnData = unknown> {
    fetching: boolean;
    data: TReturnData;
    error: unknown;
}
interface HooksArgs {
    network: Networks;
    subgraphURL: string;
    limit?: number;
}
interface AllNftsInCollectionArgs extends Pick<HooksArgs, 'network'> {
    nftStandard: 'NFT' | 'SFT';
    contractAddress: `0x${string}`;
}
interface NftDetailsArgs extends HooksArgs {
    contractAddress: `0x${string}`;
    tokenId: string;
    nftStandard: 'NFT' | 'SFT';
}

interface MarketplaceListings {
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
interface MarketplaceCollections {
    collectionId: `0x${string}`;
    collectionStandard: 'NFT' | 'SFT';
    collectionName: string;
    collectionSymbol: string;
    floorPrice: string;
    totalItemsListed: number;
    bannerImage: string;
}
interface TokenDetails {
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
interface NftDetails extends MarketplaceListings {
    description: string;
}

declare const useAllNftsInCollection: ({ network, nftStandard, contractAddress, }: AllNftsInCollectionArgs) => Readonly<HooksReturn<TokenDetails[]>>;

declare const useCollections: ({ network, subgraphURL, limit, }: HooksArgs) => Readonly<HooksReturn<MarketplaceCollections[]>>;

declare const useListings: ({ network, subgraphURL, limit, }: HooksArgs) => Readonly<HooksReturn<MarketplaceListings[]>>;

declare const useNft: ({ network, subgraphURL, limit, contractAddress, nftStandard, tokenId, }: NftDetailsArgs) => Readonly<HooksReturn<NftDetails[]>>;

declare class MarketplaceClient {
    private readonly contract;
    private readonly wallet;
    private service;
    constructor(network: Networks, marketplaceAddress: string | AbstractAddress, wallet: Account);
    useService(service: 'buyTokenService' | 'cancelListingService' | 'listTokenService' | 'modifyListingService'): this;
    setProperties(...properties: Array<unknown>): this;
    executeTransaction(): Promise<unknown>;
}

declare const searchMarketplace: (network: Networks, subgraphURL: string, searchString: string, limit?: number) => Promise<{
    success: boolean;
    data: TData;
    error?: undefined;
} | {
    success: boolean;
    error: unknown;
    data?: undefined;
} | {
    success: boolean;
    data: MarketplaceListings[];
}>;

declare const checkNftOwnership: (wallet: Account, contractAddress: `0x${string}`, subId: `0x${string}`, nftStandard: "NFT" | "SFT") => Promise<{
    success: boolean;
    data: {
        contractAddress: `0x${string}`;
        subId: `0x${string}`;
        nftStandard: "NFT" | "SFT";
    };
    errors?: undefined;
} | {
    success: boolean;
    errors: any[];
    data?: undefined;
}>;

export { AllowedProviders, MarketplaceClient, type MarketplaceCollections, MarketplaceError, MarketplaceErrorCodes, type MarketplaceListings, Networks, type NftDetails, type TokenDetails, checkNftOwnership, searchMarketplace, useAllNftsInCollection, useCollections, useListings, useNft };
