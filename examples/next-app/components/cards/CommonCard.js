import React from "react";
import Image from "next/image";
import Link from "next/link";
import { avatars } from "@/collections/avatars";
import { CompressAddress } from "@/helpers";
import { useWallet } from "@fuels/react";

export default function CommonCard({ data, iKey }) {
  const { wallet } = useWallet();

  return (
    <div className="grid-card-container blur-bg gradient-border">
      <Link href={`/nft/${data.nftAddress}/${data.tokenStandard}/${data.tokenId}`}>
        <span className="nft-img relative aspect-square box">
          {["flv", "mp4", "m3u8", "ts", "3gp", "mov", "avi", "wmv"].includes(data.tokenAssetMedia) ? (
            <video poster={data.tokenImage} muted loop autoPlay>
              <source src={data.tokenImage} type={`video/${data.tokenAssetMedia}`} />
            </video>
          ) : (
            <img
              src={
                data.tokenImage ||
                "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80"
              }
              alt={data.tokenName}
              width="100%"
              height="100%"
            />
          )}
          <span className="nft-type font-light absolute inline-box">
            {data.tokenStandard === "NFT" ? "NFT" : "SFT"}
          </span>
        </span>
        <div className="details column-center-stretch">
          <div className="name-price-data row-between-end">
            <p className="name">{data.tokenName || `#${data.listingId}`}</p>
            <span className="price w-max column-center-start">
              <span className="price-label uppercase font-light">Price</span>
              <span className="price-amount">{data.pricePerItem}</span>
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
                onError={(event) => {
                  event.target.src = "/assets/profile-placeholder.png";
                }}
              />
            </span>
            <div className="creator-name column-center-start">
              <span className="label uppercase">Seller</span>
              <span className="name">
                {data.sellerAddress === wallet?.address?.toB256()
                  ? "You"
                  : CompressAddress(data.sellerAddress).compressedAddress}
              </span>
            </div>
            <div className="quantity column-center-center ml-auto">
              <span className="label uppercase">Quantity</span>
              <span className="name">{data.tokenQuantity}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
