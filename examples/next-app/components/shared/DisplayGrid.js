import Image from "next/image";
import { appImages } from "@/collections/images";
import { CompressAddress } from "@/helpers";
import { avatars } from "@/collections/avatars";

function GridCards() {
  return (
    <div className="grid-card-container blur-bg gradient-border">
      <span className="nft-img aspect-square box">
        <Image
          src={appImages.nftArtOne}
          alt="alnwick-chapters"
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      </span>
      <div className="details column-center-stretch">
        <div className="name-price-data row-between-end">
          <p className="name">Alnwick Chapters</p>
          <span className="price w-max column-center-start">
            <span className="price-label uppercase font-light">Listed For</span>
            <span className="price-amount">0.03 MATIC</span>
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
            <span className="label uppercase">Listed By</span>
            <span className="name">
              {CompressAddress("0x7dda381c4b8fa68b35b3da9436a584e20b6e45bf").compressedAddress}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DisplayGrid() {
  return (
    <>
      <div className="display-grid w-full">
        <GridCards />
        <GridCards />
        <GridCards />
        <GridCards />
        <GridCards />
        <GridCards />
      </div>
    </>
  );
}
