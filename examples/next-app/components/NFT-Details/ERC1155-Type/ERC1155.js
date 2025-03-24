import { CompressAddress } from "@/helpers";
import { UserInteraction1155 } from "./UserInteraction1155";
import Link from "next/link";
import { ModalBody } from "@/components/common/Modal";
import { useState } from "react";

export const nftTokenTypes = {
  SEMI_FT: "Semi Fungible Token (SFT)",
  NFT: "Non-Fungible Token (NFT)",
};

export function ERC1155({ nftData, listingData }) {
  const { contractAddress, tokenId, data, type, assetId } = nftData;
  const [showOwners, setShowOwners] = useState(false);

  return (
    <div className="grid-items details-container column-start-stretch">
      <div className="nft-information-container column-center-stretch">
        <span className="collection-name font-light">
          <Link href={`/collection/${type}/${contractAddress}`} target="_blank" rel="noopener noreferrer">
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
      {showOwners ? (
        <ModalBody changeStatus={setShowOwners}>
          {listingData && listingData.length > 0 ? (
            <div className="owners-list-display-container column-start-stretch">
              <span className="list-heading uppercase font-bold">Owned By</span>
              <ul className="owners-list-display">
                {listingData.map((d) => {
                  return (
                    <li key={d.listingId} className="owners-list-display-items font-light">
                      {d.sellerAddress}
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}
        </ModalBody>
      ) : null}
      {listingData && (
        <UserInteraction1155
          data={{
            listingData,
            contractAddress,
            tokenId,
            owners: listingData.map((d) => d.sellerAddress),
            type,
          }}
        />
      )}
    </div>
  );
}
