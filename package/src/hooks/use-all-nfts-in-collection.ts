import { useCallback, useEffect, useState } from 'react';
import { HooksReturn, AllNftsInCollectionArgs, TokensInCollection } from '@/interfaces';
import { getAllNftsInCollection } from '@/ssr';

export const useAllNftsInCollection = ({
  network,
  nftStandard,
  contractAddress,
}: AllNftsInCollectionArgs): Readonly<HooksReturn<TokensInCollection[]>> => {
  const [fetching, setFetching] = useState<boolean>(true);
  const [data, setData] = useState<TokensInCollection[]>([]);
  const [error, setError] = useState<unknown>(null);

  const fetchData = useCallback(async () => {
    setFetching(true);
    setError(null);

    try {
      const assetsInCollection = await getAllNftsInCollection({
        network,
        nftStandard,
        contractAddress,
      });

      if (assetsInCollection.success) {
        setError(null);
        setData(assetsInCollection.data);
      } else {
        setError(assetsInCollection.error);
        setData([]);
      }
    } catch (error: unknown) {
      setError(error);
      setData([]);
    } finally {
      setFetching(false);
    }
  }, [network, nftStandard, contractAddress]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { fetching, data, error } as const satisfies HooksReturn<TokensInCollection[]>;
};
