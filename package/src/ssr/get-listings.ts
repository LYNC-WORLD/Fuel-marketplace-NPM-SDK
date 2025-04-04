import { NFTStandardOutput } from '@/contracts/marketplace';
import { AllowedProviders } from '@/enums';
import { HooksArgs, ListingMetadata, MarketplaceListings } from '@/interfaces';
import { fetchListings, NftMetadataClient } from '@/services/orders';
import { getFormattedPrice } from '@/utils';

export const getListings = async ({
  network,
  limit,
}: HooksArgs): Promise<
  | {
      success: true;
      data: MarketplaceListings[];
    }
  | {
      success: false;
      error: unknown;
    }
> => {
  if (!network) throw new Error('Missing argument: Network.');

  const response = await fetchListings(network, limit ?? 100);

  if (!response.success) {
    return response as {
      success: false;
      error: unknown;
    };
  }

  const listingData = response.data;

  const meteDataClient = new NftMetadataClient(network);
  const metaDataClientWithProvider = await meteDataClient.useProvider(AllowedProviders.FuelProvider);

  const formattedData = listingData!.map(
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

  const listingMetadataPromises = await Promise.allSettled<{
    success: boolean;
    data?: ListingMetadata;
    error?: unknown;
  }>(formattedData.map(fetchMetadata));

  const listingsWithMetadata = listingMetadataPromises.map((p, i) => {
    const listing = formattedData[i];

    if (p.status === 'fulfilled') {
      const metadata = p.value;

      if (metadata.success) {
        listing.tokenName = metadata.data?.name ?? '';
        listing.tokenImage = metadata.data?.image ?? '';
        listing.tokenAssetMedia = metadata.data?.assetMedia ?? '';
      }
    }

    return listing;
  });

  return {
    success: true,
    data: listingsWithMetadata,
  };
};
