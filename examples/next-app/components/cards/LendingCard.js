import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { appImages } from "@/collections/images";
import { svgIcons } from "@/collections/svg";
import { CompressAddress, typeOFContract, isOwner } from "@/helpers";
import { Network, Alchemy } from "alchemy-sdk";
import { ethers } from "ethers";
import { ListingCardSkeleton } from "@/skeletons/ListingCardSkeleton";
import { avatars } from "@/collections/avatars";

function LendingCard({ data }) {
  const [loading, setLoading] = useState(false);
  const [nftData, setNftData] = useState({
    nftName: "",
    nftPrice: "",
    nftImage: "",
  });
  const [mediaData, setMedia] = useState(null);

  useEffect(() => {
    loadAndFilterData();
  }, []);

  const loadAndFilterData = async () => {
    setLoading(true);
    const settings = {
      apiKey: process.env.ALCHEMY_KEY,
      network: Network.MATIC_MUMBAI,
    };
    const alchemy = new Alchemy(settings);
    const response = await alchemy.nft.getNftMetadata(data.nftAddress, data.tokenId, {});
    const image_url = response?.media[0]?.gateway;
    setMedia(response?.media[0]);
    setNftData({
      nftName: response.title,
      nftPrice: ethers.utils.formatEther(data.pricePerDay.toString()),
      nftImage: image_url,
    });
    setLoading(false);
  };

  if (loading) {
    return <ListingCardSkeleton />;
  }

  return (
    <>
      <Link href={`/nft/${data.nftAddress}/${data.tokenId}`} className="nft-card blur-bg gradient-border">
        <span className="nft-img aspect-square relative box">
          {["flv", "mp4", "m3u8", "ts", "3gp", "mov", "avi", "wmv"].includes(mediaData?.format) ? (
            <>
              <video poster={mediaData?.thumbnail} muted loop autoPlay>
                <source src={nftData.nftImage} type={`video/${mediaData?.format}`} />
              </video>
            </>
          ) : (
            <>
              {nftData.nftImage ? (
                <>
                  <img src={nftData.nftImage} width="100%" height="100%" />
                </>
              ) : (
                <img
                  src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80"
                  alt={nftData.nftName}
                />
              )}
            </>
          )}
          <span className="heart-icon box circle absolute">{svgIcons.heartOutline}</span>
          <span className="nft-type font-light absolute inline-box">{typeOFContract(data.nftStandard)}</span>
        </span>
        <div className="nft-details column-center-stretch">
          <div className="name-price-data row-between-end">
            <p className="name">{nftData.nftName || `#${data?.tokenId}`}</p>
            <span className="price w-max column-center-start">
              <span className="price-label uppercase font-light">Price</span>
              <span className="price-amount font-bold">{nftData.nftPrice} MATIC</span>
            </span>
          </div>
          <div className="creator-details row-start-center">
            <span className="creator-avatar square circle box">
              <Image
                src={avatars[Math.floor(Math.random() * 10)]}
                alt="avatar"
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </span>
            <div className="creator-name column-center-start">
              <span className="label uppercase">Lent By</span>
              <span className="name">
                {isOwner(data.lenderAddress) ? "You" : <>{CompressAddress(data.lenderAddress).compressedAddress}</>}
              </span>
            </div>
            {/* <div className="quantity column-center-center ml-auto">
              <span className="label uppercase">Quantity</span>
              <span className="name">{data.tokenQuantity}</span>
            </div> */}
          </div>
        </div>
      </Link>
    </>
  );
}

export default LendingCard;
