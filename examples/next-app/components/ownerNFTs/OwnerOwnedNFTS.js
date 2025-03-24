import React, { useEffect, useMemo, useState } from "react";
import { Network, Alchemy } from "alchemy-sdk";
import OwnedNFTCard from "../cards/OwnedNFTCard";
import { CommonCardSkeleton } from "@/skeletons/CommonCardSkeleton";
import { NoEvents } from "../shared/NoEvents";
import { getFilteredData, getSkeletonList } from "@/helpers";

export function OwnerOwnedNFTS({ show, walletAddress, filterQuery }) {
  const [isLoading, setLoading] = useState(true);
  const [ownerOwnedNFTs, setOwnerOwnedNFTs] = useState([]);

  const filteredOwnerOwnedNFTs = useMemo(() => {
    return getFilteredData(ownerOwnedNFTs, filterQuery);
  }, [ownerOwnedNFTs, filterQuery]);

  let skeletonList = getSkeletonList(10, <CommonCardSkeleton />) || [];
  async function fetchAllNFTs() {
    setLoading(true);

    const settings = {
      apiKey: process.env.ALCHEMY_KEY,
      network: Network.MATIC_MUMBAI,
    };

    const alchemy = new Alchemy(settings);

    const response = await alchemy.nft.getNftsForOwner(walletAddress);
    if (response) setOwnerOwnedNFTs(response?.ownedNfts);
    setLoading(false);
  }

  useEffect(() => {
    //if (walletAddress) fetchAllNFTs();
  }, [walletAddress]);

  return (
    <>
      <div className="display-grid w-full">
        {isLoading ? (
          <>
            {skeletonList.map((skeleton, i) => {
              return <React.Fragment key={i}>{skeleton}</React.Fragment>;
            })}
          </>
        ) : filteredOwnerOwnedNFTs.length > 0 ? (
          filteredOwnerOwnedNFTs.map((item, index) => {
            return <OwnedNFTCard key={index} data={item} />;
          })
        ) : (
          <NoEvents />
        )}
      </div>
    </>
  );
}
