import React from "react";
import { CompressAddress } from "@/helpers";
import { useRouter } from "next/router";

function OwnedNFTCard({ data }) {
  const router = useRouter();

  return (
    <div
      onClick={(e) => {
        router.push(`/nft/${data.contractAddress}/${data.tokenStandard}/${data.tokenId}`);
      }}
      style={{ cursor: "pointer" }}
    >
      <div className="grid-card-container blur-bg gradient-border">
        <span className="nft-img aspect-square box">
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
            />
          )}
          <span className="nft-type font-light absolute inline-box">
            {data.tokenStandard === "NFT" ? "NFT" : "SFT"}
          </span>
        </span>
        <div className="details column-center-stretch">
          <div className="name-price-data row-between-end">
            <p className="name font-light font-bold text-lg">{data.tokenName}</p>
          </div>
        </div>
        <div className="details column-center-stretch">
          <div className="name-price-data column-center-start">
            <div className="data-label-btn row-start-center">
              <span className="data-label uppercase font-light">Asset Id</span>
            </div>
            <p className="price-amount font-light flex items-center">
              {CompressAddress(data.assetId).compressedAddress}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OwnedNFTCard;
