import Head from "next/head";
import CommonCard from "@/components/cards/CommonCard";
import { NoEvents } from "@/components/shared/NoEvents";
import React, { useMemo, useState } from "react";
import { getFilteredData, getSkeletonList } from "@/helpers";
import { CommonCardSkeleton } from "@/skeletons/CommonCardSkeleton";
import { Networks, useListings } from "@lyncworld/fuel-marketplace";

export default function AllBuyingNft(props) {
  const [filterQuery, setFilterQuery] = useState("");

  const { data, fetching } = useListings({
    network: Networks.Testnet,
  });

  const filteredData = useMemo(() => {
    if (!filterQuery) return data;
    return getFilteredData(data, filterQuery);
  }, [data, filterQuery]);

  const skeletons = getSkeletonList(10, CommonCardSkeleton);

  return (
    <React.Fragment>
      <Head>
        <title>Buy NFT | LYNC</title>
      </Head>
      <main className="owned-nfts">
        <div className="container column-start-start">
          <div
            style={{ margin: "2rem 0" }}
            className="row-between-center w-full"
          >
            <h1
              style={{ color: "hsl(var(--color-fuel-green))" }}
              className="header-btns uppercase font-bold active"
            >
              Listed Items
            </h1>
            <div className="sorting-options-container inline-box gradient-border ml-auto">
              <select
                name="filterBy"
                id="filterBy"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                className="sorting-options blur-bg"
              >
                <option value="">All Assets</option>
                <option value="NFT">NFT</option>
                <option value="SFT">SFT</option>
              </select>
            </div>
          </div>

          <div className="display-grid-container w-full">
            <div className="display-grid w-full">
              {fetching && skeletons.map((Skeleton) => Skeleton)}
              {!fetching && filteredData.length === 0 && <NoEvents />}
              {!fetching &&
                filteredData.length > 0 &&
                filteredData.map((d, i) => (
                  <CommonCard key={d.listingId} data={d} iKey={i} />
                ))}
            </div>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
}
