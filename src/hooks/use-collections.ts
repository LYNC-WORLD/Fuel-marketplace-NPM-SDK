import { useCallback, useEffect, useState } from 'react';
import { HooksReturn, MarketplaceCollections, HooksArgs, CollectionMetadata } from '@/interfaces';
import { fetchCollections, NftMetadataClient } from '@/services/orders';
import { getFormattedPrice } from '@/utils';
import { AllowedProviders } from '@/enums';
import { getMintedAssetId } from 'fuels';
import { NFTStandardOutput } from '@/contracts/marketplace';

export const useCollections = ({ network, limit }: HooksArgs): Readonly<HooksReturn<MarketplaceCollections[]>> => {
  const [fetching, setFetching] = useState<boolean>(true);
  const [data, setData] = useState<MarketplaceCollections[]>([]);
  const [error, setError] = useState<unknown>(null);

  const fetchData = useCallback(async () => {
    setFetching(true);
    const response = await fetchCollections(network, limit ?? 100);

    if (response.success) {
      const collectionData = response.data;

      const meteDataClient = new NftMetadataClient(network);
      const metaDataClientWithProvider = await meteDataClient.useProvider(AllowedProviders.FuelProvider);

      const formattedData = collectionData!.map(
        (d) =>
          ({
            contractAddress: d.id,
            tokenStandard: d.nftType,
            collectionName: d.name,
            collectionSymbol: d.symbol,
            floorPrice: getFormattedPrice(d.floorPrice),
            totalItemsListed: parseInt(d.listed),
            bannerImage: '',
          }) as MarketplaceCollections
      );

      const fetchMetadata = (d: MarketplaceCollections) => {
        const assetId = getMintedAssetId(
          d.contractAddress,
          '0x0000000000000000000000000000000000000000000000000000000000000000'
        );

        const metadataPromise = metaDataClientWithProvider
          .setContract(d.contractAddress, d.tokenStandard as NFTStandardOutput)
          .getMetadata<CollectionMetadata>(assetId);

        return metadataPromise;
      };

      const collectionMetadataPromises = await Promise.allSettled<{
        success: boolean;
        data?: CollectionMetadata;
        error?: unknown;
      }>(formattedData.map(fetchMetadata));

      const collectionsWithBannerImages = collectionMetadataPromises.map((p, i) => {
        const collection = formattedData[i];

        if (p.status === 'fulfilled') {
          const metadata = p.value;
          if (metadata.success) collection.bannerImage = metadata.data?.image ?? '';
        }

        return collection;
      });

      setData(collectionsWithBannerImages);
      setError(null);
    } else {
      setError(response.error);
      setData([]);
    }

    setFetching(false);
  }, [network, limit]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { fetching, data, error } as const satisfies HooksReturn<MarketplaceCollections[]>;
};
