import { useAllNftsInCollection, useCollections, useListings, useNft } from '@/hooks';
import { AllowedProviders, MarketplaceErrorCodes, Networks } from '@/enums';
import {
  MarketplaceError,
  MarketplaceListings,
  MarketplaceCollections,
  NftDetails,
  NftMetadata,
  OmittedMarketplaceListings,
  TokensInCollection,
} from '@/interfaces';
import { MarketplaceClient } from '@/services/marketplace';
import { searchMarketplace } from '@/services/orders';
import { checkNftOwnership } from '@/utils';

export {
  /* -- Hooks -- */
  useAllNftsInCollection,
  useCollections,
  useListings,
  useNft,

  /* -- Enums -- */
  AllowedProviders,
  MarketplaceErrorCodes,
  Networks,

  /* -- Interfaces -- */
  type MarketplaceError,
  type MarketplaceListings,
  type MarketplaceCollections,
  type NftDetails,
  type NftMetadata,
  type OmittedMarketplaceListings,
  type TokensInCollection,

  /* -- Services -- */
  MarketplaceClient,
  searchMarketplace,

  /* -- Utils -- */
  checkNftOwnership,
};
