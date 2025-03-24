import React from "react";
import Image from "next/image";
import { svgIcons } from "@/collections/svg";
import { CompressAddress, typeOFContract } from "@/helpers";
import { avatars } from "@/collections/avatars";
import { useRouter } from "next/router";
import { useWallet } from "@fuels/react";

function ListingCard({ data, iKey }) {
  const router = useRouter();
  const { wallet } = useWallet();

  return (
    <div
      className="nft-card blur-bg gradient-border"
      onClick={(e) => {
        router.push(
          `/nft/${data.nftAddress}/${data.tokenStandard}/${data.tokenId}`
        );
      }}
      style={{ cursor: "pointer" }}
    >
      <span className="nft-img relative box">
        {["flv", "mp4", "m3u8", "ts", "3gp", "mov", "avi", "wmv"].includes(
          data.tokenAssetMedia
        ) ? (
          <video poster={data.tokenImage} muted loop autoPlay>
            <source
              src={data.tokenImage}
              type={`video/${data.tokenAssetMedia}`}
            />
          </video>
        ) : (
          <img
            src={
              data.tokenImage ||
              "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80"
            }
            alt={data.tokenName}
            // width="100%"
            // height="100%"
          />
        )}
        <span className="heart-icon box circle absolute">
          {svgIcons.heartOutline}
        </span>
        <span className="nft-type font-light absolute inline-box">
          {data.tokenStandard === "NFT" ? "NFT" : "SFT"}
        </span>
      </span>
      <div className="nft-details column-center-stretch">
        <div className="name-price-data row-between-end">
          <p className="name">{data.tokenName || `#${data.listingId}`}</p>
          <span className="price w-max column-center-end">
            <span className="price-label uppercase font-light">Price</span>
            <span className="price-amount">{data.pricePerItem} ETH</span>
          </span>
        </div>
        <div className="creator-details row-start-center">
          <span className="creator-avatar square circle box">
            <Image
              src={avatars[iKey]}
              alt="avatar"
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </span>
          <div className="creator-name column-center-start">
            <span className="label uppercase font-light">Listed By</span>
            <span className="name">
              {data.sellerAddress === wallet?.address?.toB256()
                ? "You"
                : CompressAddress(data.sellerAddress).compressedAddress}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListingCard;
