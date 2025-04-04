import { useCallback, useEffect, useState } from 'react';
import { HooksReturn, MarketplaceListings, HooksArgs } from '@/interfaces';
import { getListings } from '@/ssr';

export const useListings = ({ network, limit }: HooksArgs): Readonly<HooksReturn<MarketplaceListings[]>> => {
  const [fetching, setFetching] = useState<boolean>(true);
  const [data, setData] = useState<MarketplaceListings[]>([]);
  const [error, setError] = useState<unknown>(null);

  const fetchData = useCallback(async () => {
    setFetching(true);
    setError(null);

    try {
      const listings = await getListings({
        network,
        limit,
      });

      if (listings.success) {
        setError(null);
        setData(listings.data);
      } else {
        setError(listings.error);
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

  return { fetching, data, error } as const satisfies HooksReturn<MarketplaceListings[]>;
};
