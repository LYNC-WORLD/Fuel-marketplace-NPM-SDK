import Head from "next/head";
import React, { useMemo, useState } from "react";
import ContractDetailsCard from "@/components/cards/ContractDetailsCard";
import { getFilteredData, getSkeletonList } from "@/helpers";
import { NFTStandardOutput } from "@/artifacts/marketplace/typegen/NftMarketplace";
import { Networks, useCollections } from "@lyncworld/fuel-marketplace";
import { NoEvents } from "@/components/shared/NoEvents";
import { ContractDetailsCardSkeleton } from "@/skeletons/ContractDetailsCardSkeleton";

export default function AllCollection() {
  const [filterQuery, setFilterQuery] = useState("");
  const [sortQuery, setSortQuery] = useState("default");

  const { data, fetching } = useCollections({
    network: Networks.Testnet,
  });

  const filteredData = useMemo(() => {
    return getFilteredData(data, filterQuery);
  }, [data, filterQuery]);

  const sortedData = useMemo(() => {
    if (sortQuery === "") {
      return filteredData;
    }

    switch (String(sortQuery)) {
      case "ascending": {
        return [...filteredData].sort((a, b) => a.floorPrice - b.floorPrice);
      }

      case "descending": {
        return [...filteredData].sort(
          (a, b) => -1 * (a.floorPrice - b.floorPrice)
        );
      }

      case "supply_asc": {
        return [...filteredData].sort(
          (a, b) => a.totalItemsListed - b.totalItemsListed
        );
      }

      case "supply_desc": {
        return [...filteredData].sort(
          (a, b) => -1 * (a.totalItemsListed - b.totalItemsListed)
        );
      }

      case "default": {
        return filteredData;
      }
    }
  }, [filteredData, sortQuery]);

  const skeletons = getSkeletonList(10, ContractDetailsCardSkeleton);

  return (
    <React.Fragment>
      <Head>
        <title>Explore Collections | LYNC</title>
      </Head>
      <main className="listed-collection">
        <div className="container column-start-start">
          <div className="w-max row-center-center ml-auto">
            <div className="sorting-options-container inline-box gradient-border">
              <select
                name="sortBy"
                id="sortBy"
                value={sortQuery}
                onChange={(e) => setSortQuery(e.target.value)}
                className="sorting-options blur-bg"
              >
                <option value="default">Default</option>
                <option value="ascending">Lowest Floor Price</option>
                <option value="descending">Highest Floor Price</option>
                <option value="supply_asc">Lowest Total Supply</option>
                <option value="supply_desc">Highest Total Supply</option>
              </select>
            </div>
            <div className="sorting-options-container inline-box gradient-border">
              <select
                name="filterBy"
                id="filterBy"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                className="sorting-options blur-bg"
              >
                <option value="">All Assets</option>
                <option value={NFTStandardOutput.NFT}>NFT</option>
                <option value={NFTStandardOutput.SEMI_FT}>SFT</option>
              </select>
            </div>
          </div>
          <div className="collection-table-container">
            <table className="collection-table w-full">
              <thead className="table-heading">
                <tr className="table-row">
                  <th
                    style={{
                      color: "hsl(var(--color-fuel-green))",
                      fontWeight: 500,
                    }}
                    className="table-data uppercase font-light"
                  >
                    Collection
                  </th>
                  <th
                    style={{
                      color: "hsl(var(--color-fuel-green))",
                      fontWeight: 500,
                    }}
                    className="table-data uppercase font-light"
                  >
                    contract Address
                  </th>
                  <th
                    style={{
                      color: "hsl(var(--color-fuel-green))",
                      fontWeight: 500,
                    }}
                    className="table-data uppercase font-light"
                  >
                    Floor Price
                  </th>
                  <th
                    style={{
                      color: "hsl(var(--color-fuel-green))",
                      fontWeight: 500,
                    }}
                    className="table-data uppercase font-light"
                  >
                    Total Supply
                  </th>
                  <th
                    style={{
                      color: "hsl(var(--color-fuel-green))",
                      fontWeight: 500,
                    }}
                    className="table-data uppercase font-light"
                  >
                    Type
                  </th>
                </tr>
              </thead>
              <tbody className="table-body">
                {fetching && skeletons.map((Skeleton) => Skeleton)}
                {!fetching && sortedData.length === 0 && <NoEvents />}
                {!fetching &&
                  sortedData.length > 0 &&
                  sortedData.map((d) => {
                    return (
                      <ContractDetailsCard item={d} key={d.contractAddress} />
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
}
