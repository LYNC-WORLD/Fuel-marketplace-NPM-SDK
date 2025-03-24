import { CompressAddress } from "@/helpers";
import { UserInteraction721 } from "./UserInteraction721";
import Link from "next/link";

export const nftTokenTypes = {
  SEMI_FT: "Semi Fungible Token (SFT)",
  NFT: "Non-Fungible Token (NFT)",
};

export function ERC721({ nftData, listingData }) {
  const { contractAddress, tokenId, data, type, assetId } = nftData;
  const nftListingData = listingData?.[0];

  return (
    <div className="grid-items details-container column-start-stretch">
      <div className="nft-information-container column-center-stretch">
        <span className="collection-name font-light">
          <Link href={`/collection/${type}/${contractAddress}`}>
            {CompressAddress(contractAddress).compressedAddress}
          </Link>
          &nbsp; | &nbsp;<strong>Type: {nftTokenTypes[type]}</strong>
        </span>
        <h1 style={{ color: "hsl(var(--color-fuel-green))" }} className="art-name">
          {data
            ? data.tokenName || `#${CompressAddress(assetId).compressedAddress}`
            : `#${CompressAddress(assetId).compressedAddress}`}
        </h1>
      </div>
      <UserInteraction721
        data={{
          nftListingData,
          contractAddress,
          tokenId,
          type,
        }}
      />
    </div>
  );
}
