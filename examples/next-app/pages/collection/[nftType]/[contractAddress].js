import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import OwnedNFTCard from "@/components/cards/OwnedNFTCard";
import { CommonCardSkeleton } from "@/skeletons/CommonCardSkeleton";
import { NoEvents } from "@/components/shared/NoEvents";
import { appImages } from "@/collections/images";
import Image from "next/image";
import { CompressAddress, getSkeletonList } from "@/helpers";
import { Networks, useAllNftsInCollection } from "@lyncworld/fuel-marketplace";

export default function AllNftOfContract() {
  const router = useRouter();

  const { data, fetching } = useAllNftsInCollection({
    network: Networks.Testnet,
    nftStandard: router.query.nftType,
    contractAddress: router.query.contractAddress,
  });

  let skeletonList = getSkeletonList(5, CommonCardSkeleton);

  return (
    <>
      <Head>
        <title>{data[0]?.contractName || data[0]?.contractSymbol || "Untitled"} | LYNC</title>
      </Head>
      <div className="collection">
        <div className="banner-container relative box">
          <Image src={appImages.collectionBanner} alt="banner" style={{ width: "100%", height: "auto" }} />
        </div>
        <div className="collection-profile-container page-padding-inline">
          <span className="collection-profile-img inline-box relative circle">
            {data[0]?.tokenAssetMedia === "image" ? (
              <img
                src={data[0].tokenImage}
                alt={data[0]?.contractName || data[0]?.contractSymbol || "Untitled"}
                width="100%"
                height="100%"
              />
            ) : null}
          </span>
          {!fetching && (
            <h1 style={{ color: "hsl(var(--color-fuel-green))" }} className="collection-name font-regular uppercase">
              {data[0]?.contractName || data[0]?.contractSymbol || "Untitled"}
            </h1>
          )}
          <div className="collection-address-container font-light row-start-center">
            <a
              className="collection-address"
              href={`https://app-testnet.fuel.network/contract/${router.query.contractAddress}`}
              target="_blank"
            >
              {CompressAddress(router.query.contractAddress ?? "").compressedAddress}
            </a>
          </div>
          <p className="collection-description font-light">
            {data[0]?.contractName
              ? `Welcome to the home of ${String(
                  data[0].contractName
                ).toUpperCase()} on LYNC Marketplace. Discover the best items in this collection.`
              : "Welcome to the collection on LYNC Marketplace. Discover the best items in this collection."}
          </p>
        </div>
        <div className="collection-option-list-container">
          <ul className="collection-options-list row-start-center"></ul>
        </div>
        <div className="display-grid-container no-margin-grid page-padding-inline w-full">
          <div className="display-grid w-full">
            {fetching && skeletonList.map((Skeleton) => Skeleton)}
            {!fetching && data.length === 0 && <NoEvents />}
            {!fetching && data.length > 0 && data.map((d) => <OwnedNFTCard data={d} key={d.assetId} />)}
          </div>
        </div>
      </div>
    </>
  );
}
