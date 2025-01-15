import { AllowedProviders, Networks } from '@/enums';
import { checkArguments, getFormattedPrice } from '@/utils';
import { SubgraphClient } from '../subgraph';
import { ListingMetadata, MarketplaceListings, SubgraphListingData } from '@/interfaces';
import { NftMetadataClient } from './metadata-client';
import { NFTStandardOutput } from '@/contracts/marketplace';

const SEARCH_MARKETPLACE_QUERY = `
  query SearchMarketplace($searchString: String!, $limit: Int = 100) {
    Listing(
      where: {
        status: { _eq: "ACTIVE" }
        _or: [
          { nftAddress: { _ilike: $searchString } }
          { tokenId: { _ilike: $searchString } }
          { asset_id: { _ilike: $searchString } }
          { seller: { _ilike: $searchString } }
        ]
      }
      order_by: { db_write_timestamp: desc }
      limit: $limit
    ) {
      id
      status
      nftAddress
      nftType
      tokenId
      asset_id
      quantity
      pricePerItem
      seller
      }
  }
`;

export const searchMarketplace = async (network: Networks, searchString: string, limit: number = 100) => {
  checkArguments([network, searchString], 'arguments');

  const subgraphClient = new SubgraphClient(network);
  const response = await subgraphClient
    .setQueryString(SEARCH_MARKETPLACE_QUERY)
    .setVariables({
      searchString: `%${searchString}%`,
      limit,
    })
    .query<SubgraphListingData[]>('Listing');

  if (!response.success || !response.data) return response;

  const searchData = response.data;

  const meteDataClient = new NftMetadataClient(network);
  const metaDataClientWithProvider = await meteDataClient.useProvider(AllowedProviders.FuelProvider);

  const formattedData = searchData.map(
    (d) =>
      ({
        listingId: Number(d.id),
        isActive: d.status === 'ACTIVE',
        nftAddress: d.nftAddress,
        tokenStandard: d.nftType,
        tokenId: d.tokenId,
        assetId: d.asset_id,
        tokenQuantity: parseInt(d.quantity),
        pricePerItem: getFormattedPrice(d.pricePerItem),
        sellerAddress: d.seller,
        tokenName: '',
        tokenImage: '',
        tokenAssetMedia: '',
      }) as MarketplaceListings
  );

  const fetchMetadata = (d: MarketplaceListings) => {
    return metaDataClientWithProvider
      .setContract(d.nftAddress, d.tokenStandard as NFTStandardOutput)
      .getMetadata<ListingMetadata>(d.assetId);
  };

  const searchMetadataPromises = await Promise.allSettled<{
    success: boolean;
    data?: ListingMetadata;
    error?: unknown;
  }>(formattedData.map(fetchMetadata));

  const searchResultsWithMetadata = searchMetadataPromises.map((p, i) => {
    const result = formattedData[i];

    if (p.status === 'fulfilled') {
      const metadata = p.value;

      if (metadata.success) {
        result.tokenName = metadata.data?.name ?? '';
        result.tokenImage = metadata.data?.image ?? '';
        result.tokenAssetMedia = metadata.data?.assetMedia ?? '';
      }
    }

    return result;
  });

  return { success: true, data: searchResultsWithMetadata };
};
