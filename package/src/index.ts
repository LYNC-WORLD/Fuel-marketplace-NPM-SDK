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
import { getAllNftsInCollection, getCollections, getListings, getNftDetails } from '@/ssr';

export {
  /* -- Hooks -- */
  useAllNftsInCollection,
  useCollections,
  useListings,
  useNft,

  /* -- SSR Functions -- */
  getAllNftsInCollection,
  getCollections,
  getListings,
  getNftDetails,

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
