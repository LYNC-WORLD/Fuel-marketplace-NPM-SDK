# Marketplace NPM SDK on Fuel blockchain

Introducing marketplace NPM SDK on Fuel blockchain. Powered by LYNC, it allows anyone to create their own decentralized marketplace which includes listing and buying of Non-fungible tokens (NFTs) and Semi-fungible tokens (SFTs) in a few lines of code. This SDK provides a simple but powerful and organized solution for developers looking to create their own marketplace applications on Fuel, ensuring a smooth, easy and hassle-free development experience.

> Note - The current SDK version supports creating and trading tokens only on **Fuel testnet**.

## Prerequisites

Before you begin integrating Fuel marketplace SDK, make sure you have the following prerequisites:

- `Node.js (version 20 or above)` installed on your system.
- `NPM (version 10 or above)` or `Yarn (latest version)` installed on your system.

## Installing the Package

You can install the package using either `NPM` or `Yarn`. Follow these steps:

1. Open your preferred terminal.
2. Navigate to your project's directory.
3. Run the following command:

```console
npm install --save @lyncworld/fuel-marketplace@latest
```

Or

```console
yarn add @lyncworld/fuel-marketplace
```

Congratulations! You have successfully integrated `@lyncworld/fuel-marketplace` into your project. If you encounter any issues or have any questions, feel free to reach out to our support team for assistance.

## Using the SDK

### Using hooks to get the marketplace data

The SDK provides a set of hooks that you can use to get the marketplace data. Here is the list of hooks provided by the SDK:

1. **useAllNftsInCollection**

   This hook returns all the NFTs in a collection. You can use this hook to get all the NFTs in a collection.

   ```typescript
   const { fetching, data, error } = useAllNftsInCollection({
     network: Networks.Testnet,
     // Select from "NFT" or "SEMI_FT" according to actual token standard
     nftStandard: 'SEMI_FT',
     // Replace this demo contract address with actual contract address
     contractAddress: '0x...',
   });
   ```

   - Returns - `{ fetching: boolean, data: TokensInCollection[], error: unknown }`
   - Types -

   ```typescript
   interface TokensInCollection {
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
   ```

2. **useCollections**

   This hook returns all the collections whose at least one token is listed on the marketplace.

   ```typescript
   const { fetching, data, error } = useCollections({
     network: Networks.Testnet,
     // You can pass the limit to get the top N collections or remove it to get all collections
     limit: 10,
   });
   ```

   - Returns - `{ fetching: boolean, data: MarketplaceCollections[], error: unknown }`
   - Types -

   ```typescript
   interface MarketplaceCollections {
     contractAddress: `0x${string}`;
     tokenStandard: 'NFT' | 'SEMI_FT';
     collectionName: string;
     collectionSymbol: string;
     floorPrice: string;
     totalItemsListed: number;
     bannerImage: string;
   }
   ```

3. **useListings**

   This hook returns all the tokens listed on the marketplace for buying.

   ```typescript
   const { fetching, data, error } = useListings({
     network: Networks.Testnet,
     // You can pass the limit to get the top N listings or remove it to get all listings
     limit: 10,
   });
   ```

   - Returns - `{ fetching: boolean, data: MarketplaceListings[], error: unknown }`
   - Types -

   ```typescript
   interface MarketplaceListings {
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
   ```

4. **useNft**

   This hook return the all the listing details of a specific token by its contract address, token standard and token id.

   ```typescript
   const { fetching, data, error } = useNft({
     network: Networks.Testnet,
     // Select from "NFT" or "SEMI_FT" according to actual token standard
     nftStandard: 'SEMI_FT',
     // Replace this demo contract address with actual contract address of the token
     contractAddress: '0x...',
     // Replace this demo token id with actual token id (or sub id) of the token
     tokenId: '0x...',
     // You can pass the limit to get the top N listing or remove it to get all the listing of the token
     limit: 10,
   });
   ```

   - Returns - `{ fetching: boolean, data: NftDetails, error: unknown }`
   - Types -

   ```typescript
   interface NftDetails {
     listingData: OmittedMarketplaceListings[];
     nftMetadata: NftMetadata;
   }

   interface OmittedMarketplaceListings
     extends Omit<MarketplaceListings, 'tokenName' | 'tokenImage' | 'tokenAssetMedia'> {}

   interface MarketplaceListings {
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

   interface NftMetadata {
     tokenName: string;
     tokenImage: string;
     tokenAssetMedia: string;
     description: string;
   }
   ```

### Using services provided by the SDK to list, buy and manage tokens

The SDK provides a set of services that you can use to list and buy tokens or modify and cancel a listing. In the following section, we will look into the services provided by the SDK.

For performing list token, buy token, modify listing or cancel listing services on marketplace using the SDK, you will need to create an instance of `MarketplaceClient` class provided by the SDK. Here is an example of creating a new instance of `MarketplaceClient` class using the SDK::

```typescript
import { MarketplaceClient, Networks } from '@lyncworld/fuel-marketplace';

const marketplaceClient = new MarketplaceClient(
  Networks.Testnet,
  wallet // Wallet of the user who is performing the action
);
```

After creating an instance of `MarketplaceClient` class, you can utilize various services provided by the `MarketplaceClient` class. Here is the complete list of the services and an examples function for performing listing a token, buying a token, modifying a listing and cancelling a listing:

1. **Listing a token on the marketplace**

   You can call the `useListTokenService` function provided by the `MarketplaceClient` class followed by the `setProperties` and `execute` methods to list a token on the marketplace. Here is an example call of how you can list a token on the marketplace:

   ```typescript
   const response = await marketplaceClient
     .useListTokenService()
     .setProperties(
       '0x...', // asset id of the token to be listed
       '0x...', // contract address of the token to be listed
       '0x...', // token id (or sub id) of the token to be listed
       0.0002, // price per item of the token to be listed
       4, // quantity of the token to be listed (always 1 for NFT)
       'SEMI_FT' // token standard of the token to be listed (choose from NFT or SEMI_FT)
     )
     .execute();

   if (response.success) {
     alert('Token listed successfully.');
     console.log('Transaction data: ', response.data);
   } else {
     alert('Error listing token.');
     console.error('Error listing token: ', { error: response.error });
   }
   ```

2. **Buying a listed token on the marketplace**

   You can call the `useBuyTokenService` function provided by the `MarketplaceClient` class followed by the `setProperties` and `execute` methods to buy a token on the marketplace. Here is an example call of how you can buy a token on the marketplace:

   ```typescript
   const response = await marketplaceClient
     .useBuyTokenService()
     .setProperties(
       '0x...', // listing id of the token to be bought
       2, // quantity of the token to be bought (always 1 for NFT)
       0.0002 // price per item of the token to be bought
     )
     .execute();

   if (response.success) {
     alert('Token bought successfully.');
     console.log('Transaction data: ', response.data);
   } else {
     alert('Error buying token.');
     console.error('Error buying token: ', { error: response.error });
   }
   ```

3. **Modify a listing on the marketplace**

   You can call the `useModifyListingService` function provided by the `MarketplaceClient` class followed by the `setProperties` and `execute` methods to modify an already listed token on the marketplace. Here is an example call of how you can modify a listing on the marketplace:

   ```typescript
   const response = await marketplaceClient
     .useModifyListingService()
     .setProperties(
       '0x...', // listing id of the token to be modified
       0.0001 // new price per item of the listed token to be modified
       2, // number of tokens to be added or removed from the listing (always 0 for NFT)
       "0x..." // asset id of the token to be modified (only required for SFT - send undefined for NFT)
     )
     .execute();

   if (response.success) {
     alert('Listing modified successfully.');
     console.log('Transaction data: ', response.data);
   } else {
     alert('Error modifying listing.');
     console.error('Error modifying listing: ', { error: response.error });
   }
   ```

4. **Cancel a listing on the marketplace**

   You can call the `useCancelListingService` function provided by the `MarketplaceClient` class followed by the `setProperties` and `execute` methods to cancel an already listed token on the marketplace. Here is an example call of how you can cancel a listing on the marketplace:

   ```typescript
   const response = await marketplaceClient
     .useCancelListingService()
     .setProperties(
       '0x...' // listing id of the token to be cancelled
     )
     .execute();

   if (response.success) {
     alert('Listing cancelled successfully.');
     console.log('Transaction data: ', response.data);
   } else {
     alert('Error canceling listing.');
     console.error('Error canceling listing: ', { error: response.error });
   }
   ```

### Some useful functions provided by the SDK

The SDK also provides some useful functions that you can use to implement search functionality and check if a token is owned by a given wallet address or not. Here is the complete list of the functions:

1. **searchMarketplace**

   This function allows you to search for a token on the marketplace by providing a search query. Here is an example call of how you can search for a token on the marketplace:

   ```typescript
   const response = searchMarketplace(
     Networks.Testnet,
     '0x...' // contract address, token id, asset id, or seller address to search
   );
   ```

   - Returns - `{ success: boolean, data: MarketplaceListings[], error: unknown }`
   - Types -

   ```typescript
   interface MarketplaceListings {
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
   ```

2. **checkNftOwnership**

   This function allows you to check if a token is owned by a given wallet address or not. Here is an example call of how you can check if a token is owned by a given wallet address:

   ```typescript
   const response = checkNftOwnership(
     wallet, // wallet of the user to check the ownership
     '0x...' // contract address of the token to check the ownership
     "0x..." // token id (or sub id) of the token to check the ownership
     "SEMI_FT" // token standard of the token to check the ownership (choose from NFT or SEMI_FT)
   );
   ```

   - Returns -

   ```typescript
   {
     success: true;
     data: {
       contractAddress: `0x${string}`;
       subId: `0x${string}`;
       nftStandard: 'NFT' | 'SEMI_FT';
     }
   }
   ```

   Or

   ```typescript
   {
     success: false;
     error: string[];
   }
   ```

## Error codes for the SDK

The various hooks, services and functions provided by the SDK can return different error codes in case of an error. Here is the list of error codes that you can expect from the SDK:

```typescript
enum MarketplaceErrorCodes {
  InsufficientBalance = 'InsufficientBalance',
  InvalidArgumentsError = 'InvalidArgumentsError',
  InvalidNetworkArgument = 'InvalidNetworkArgument',
  NetworkRequestError = 'NetworkRequestError',
  PropertyUndefinedError = 'PropertyUndefinedError',
  ServerError = 'ServerError',
}
```

- `InsufficientBalance` - The wallet does not have enough balance to perform the action.
- `InvalidArgumentsError` - The arguments provided to the a function are invalid or undefined.
- `InvalidNetworkArgument` - The network argument provided to a function is invalid.
- `NetworkRequestError` - There was an error thrown while making an `http` network request.
- `PropertyUndefinedError` - A required property is undefined or not det properly for a class.
- `ServerError` - There was an error thrown by the internal functions call in the SDK.

## Interfaces and Enums provided by the SDK

### Enums

```typescript
enum AllowedProviders {
  FuelProvider = 'FuelProvider',
  WalletProvider = 'WalletProvider',
}

enum Networks {
  Testnet = 'testnet',
}

enum MarketplaceErrorCodes {
  InsufficientBalance = 'InsufficientBalance',
  InvalidArgumentsError = 'InvalidArgumentsError',
  InvalidNetworkArgument = 'InvalidNetworkArgument',
  NetworkRequestError = 'NetworkRequestError',
  PropertyUndefinedError = 'PropertyUndefinedError',
  ServerError = 'ServerError',
}
```

### Interfaces

```typescript
interface MarketplaceListings {
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

interface MarketplaceCollections {
  contractAddress: `0x${string}`;
  tokenStandard: 'NFT' | 'SEMI_FT';
  collectionName: string;
  collectionSymbol: string;
  floorPrice: string;
  totalItemsListed: number;
  bannerImage: string;
}

interface NftDetails {
  listingData: OmittedMarketplaceListings[];
  nftMetadata: NftMetadata;
}

interface OmittedMarketplaceListings
  extends Omit<MarketplaceListings, 'tokenName' | 'tokenImage' | 'tokenAssetMedia'> {}

interface NftMetadata {
  tokenName: string;
  tokenImage: string;
  tokenAssetMedia: string;
  description: string;
}

interface TokensInCollection {
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

class MarketplaceError<TErrorData = unknown> extends Error {
  constructor(
    message: string,
    public code: MarketplaceErrorCodes,
    public errorData?: TErrorData
  ) {
    super(message);
    this.name = 'MarketplaceError';
  }
}
```

## Support

If you encounter any issues or have any questions, feel free to reach out to our support team for assistance. We are always here to help you with any queries or concerns you may have.

- [Telegram](https://t.me/lyncgg)
- [Discord](https://discord.com/invite/lyncworld)
- [Email](mailto:team@lync.world)
