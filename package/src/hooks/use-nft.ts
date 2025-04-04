import { useCallback, useEffect, useState } from 'react';
import { HooksReturn, NftDetailsArgs, NftDetails, NftMetadata } from '@/interfaces';
import { getNftDetails } from '@/ssr';

const placeholderMetadata = {
  tokenName: '',
  tokenImage: '',
  tokenAssetMedia: '',
  description: '',
} as const satisfies NftMetadata;

export const useNft = ({
  network,
  limit,
  contractAddress,
  nftStandard,
  tokenId,
}: NftDetailsArgs): Readonly<HooksReturn<NftDetails>> => {
  const [fetching, setFetching] = useState<boolean>(true);
  const [data, setData] = useState<NftDetails>({
    listingData: [],
    nftMetadata: placeholderMetadata,
  });
  const [error, setError] = useState<unknown>(null);

  const fetchData = useCallback(async () => {
    setFetching(true);
    setError(null);

    try {
      const nftDetails = await getNftDetails({
        network,
        limit,
        contractAddress,
        nftStandard,
        tokenId,
      });

      if (nftDetails.success) {
        setError(null);
        setData(nftDetails.data);
      } else {
        setError(nftDetails.error);
        setData({
          listingData: [],
          nftMetadata: placeholderMetadata,
        });
      }
    } catch (error: unknown) {
      setError(error);
      setData({
        listingData: [],
        nftMetadata: placeholderMetadata,
      });
    } finally {
      setFetching(false);
    }
  }, [network, contractAddress, nftStandard, tokenId, limit]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { fetching, data, error } as const satisfies HooksReturn<NftDetails>;
};
