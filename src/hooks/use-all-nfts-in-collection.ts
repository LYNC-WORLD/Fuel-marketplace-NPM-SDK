import { useCallback, useEffect, useState } from 'react';
import { Address } from 'fuels';
import { HooksReturn, AllNftsInCollectionArgs, TokenDetails } from '@/interfaces';
import { fetchAllNftOfContract, getContractBalances } from '@/utils';

export const useAllNftsInCollection = ({
  network,
  nftStandard,
  contractAddress,
}: AllNftsInCollectionArgs): Readonly<HooksReturn<TokenDetails[]>> => {
  const [fetching, setFetching] = useState<boolean>(true);
  const [data, setData] = useState<TokenDetails[]>([]);
  const [error, setError] = useState<unknown>(null);

  const fetchData = useCallback(async () => {
    const isAddress = Address.fromB256(contractAddress);
    if (!isAddress) {
      setData([]);
      setError([{ message: 'Invalid contract address' }]);
      return;
    }

    setFetching(true);
    const contractBalances = await getContractBalances(network, contractAddress);

    if (!contractBalances.success) {
      setData([]);
      setError(contractBalances.error);

      setFetching(false);
      return;
    }

    const assetIds: string[] = [];
    contractBalances.data?.forEach((d) => {
      if (d.assetId !== '0x0000000000000000000000000000000000000000000000000000000000000000') {
        assetIds.push(d.assetId);
      }
    });

    const allNftsOfContract = await fetchAllNftOfContract(network, contractAddress, nftStandard, assetIds);

    setData(allNftsOfContract);
    setError(null);
    setFetching(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { fetching, data, error } as const satisfies HooksReturn<TokenDetails[]>;
};
