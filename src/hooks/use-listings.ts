import { useCallback, useEffect, useState } from 'react';
import { HooksReturn, MarketplaceListings, HooksArgs, ListingMetadata } from '@/interfaces';
import { fetchListings, NftMetadataClient } from '@/services/orders';
import { AllowedProviders } from '@/enums';
import { getFormattedPrice } from '@/utils';
import { NFTStandardOutput } from '@/contracts/marketplace';

export const useListings = ({
  network,
  subgraphURL,
  limit,
}: HooksArgs): Readonly<HooksReturn<MarketplaceListings[]>> => {
  const [fetching, setFetching] = useState<boolean>(true);
  const [data, setData] = useState<MarketplaceListings[]>([]);
  const [error, setError] = useState<unknown>(null);

  const fetchData = useCallback(async () => {
    setFetching(true);
    const response = await fetchListings(network, subgraphURL, limit ?? 100);

    if (!response.success) {
      setError(response.error);
      setData([]);
      setFetching(false);
      return;
    }

    const listingData = response.data;

    const meteDataClient = new NftMetadataClient(network);
    const metaDataClientWithProvider = await meteDataClient.useProvider(AllowedProviders.FuelProvider);

    const formattedData = listingData!.map(
      (d) =>
        ({
          itemId: Number(d.id),
          isActive: d.status === 'ACTIVE',
          nftAddress: d.nftAddress,
          itemStandard: d.nftType === 'NFT' ? 'NFT' : 'SFT',
          tokenId: d.tokenId,
          assetId: d.asset_id,
          itemQuantity: parseInt(d.quantity),
          pricePerItem: getFormattedPrice(d.pricePerItem),
          sellerAddress: d.seller,
          itemName: '',
          itemImage: '',
          itemMedia: '',
        }) as MarketplaceListings
    );

    const fetchMetadata = (d: MarketplaceListings) => {
      return metaDataClientWithProvider
        .setContract(d.nftAddress, d.itemStandard === 'NFT' ? NFTStandardOutput.NFT : NFTStandardOutput.SEMI_FT)
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
          listing.itemName = metadata.data?.name ?? '';
          listing.itemImage = metadata.data?.image ?? '';
          listing.itemMedia = metadata.data?.assetMedia ?? '';
        }
      }

      return listing;
    });

    setData(listingsWithMetadata);
    setError(null);

    setFetching(false);
  }, [network, subgraphURL, limit]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { fetching, data, error } as const satisfies HooksReturn<MarketplaceListings[]>;
};
