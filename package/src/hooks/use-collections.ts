import { useCallback, useEffect, useState } from 'react';
import { HooksReturn, MarketplaceCollections, HooksArgs } from '@/interfaces';
import { getCollections } from '@/ssr';

export const useCollections = ({ network, limit }: HooksArgs): Readonly<HooksReturn<MarketplaceCollections[]>> => {
  const [fetching, setFetching] = useState<boolean>(true);
  const [data, setData] = useState<MarketplaceCollections[]>([]);
  const [error, setError] = useState<unknown>(null);

  const fetchData = useCallback(async () => {
    setFetching(true);
    setError(null);

    try {
      const collections = await getCollections({
        network,
        limit,
      });

      if (collections.success) {
        setError(null);
        setData(collections.data);
      } else {
        setError(collections.error);
        setData([]);
      }
    } catch (error: unknown) {
      setError(error);
      setData([]);
    } finally {
      setFetching(false);
    }
  }, [network, limit]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { fetching, data, error } as const satisfies HooksReturn<MarketplaceCollections[]>;
};
