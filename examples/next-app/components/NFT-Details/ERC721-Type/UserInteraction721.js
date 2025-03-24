import { NoEvents } from "@/components/shared/NoEvents";
import { UserInteractionPanelSkeleton } from "@/skeletons/UserInteractionPanelSkeleton";
import { BigNumber } from "ethers";
import { useEffect, useState } from "react";
import { BuyNFT721 } from "./BuyNFT721";
import ListLendNFT721 from "./ListLendNFT721";
import ModifyCancelListing721 from "./ModifyCancelListing721";
import { useWallet } from "@fuels/react";
import { getMintedAssetId } from "fuels";

export function UserInteraction721({ data }) {
  const { nftListingData, contractAddress, tokenId } = data;
  const { wallet } = useWallet();

  const [qtyOwned, setQtyOwned] = useState(null);
  const [showListLendForm, setShowListLendForm] = useState(false);
  const [loader, setLoader] = useState(false);
  const asset_id = getMintedAssetId(contractAddress, tokenId);

  async function init() {
    //setLoader(true);

    if (wallet?.address.toB256() != null) {
      let isOwner = false;

      const balance = await wallet?.getBalance(asset_id);
      if (balance.toNumber() === 1) {
        isOwner = true;
        setQtyOwned(BigNumber.from("1"));
      }

      if (isOwner) setShowListLendForm(true);
      else setShowListLendForm(false);
    }
    //setLoader(false);
  }

  useEffect(() => {
    init();
  }, [wallet]);

  if (loader) {
    return <UserInteractionPanelSkeleton />;
  }

  /** ----- Listing and Lending Forms ----- */
  if (showListLendForm) {
    return <ListLendNFT721 contractAddress={contractAddress} tokenId={tokenId} asset_id={asset_id} />;
  }

  /** ------ Modify and Cancel Listing Forms ----- */
  if (wallet && nftListingData?.sellerAddress.toLowerCase() === String(wallet.address.toB256()).toLowerCase()) {
    return (
      <div className="nft-activities-container column-center-stretch">
        <ModifyCancelListing721
          walletAddress={wallet.address.toB256()}
          orderId={nftListingData?.listingId.toString()}
          currentPrice={nftListingData?.pricePerItem.toString()}
        />
      </div>
    );
  }

  /** ------ Modify and Cancel Lending Forms ----- */

  /** ----- Buy a Listed NFT Form ----- */
  if (nftListingData) {
    return (
      <div className="nft-activities-container column-center-stretch">
        <BuyNFT721
          price={String(nftListingData?.pricePerItem)}
          walletAddress={wallet?.address.toB256().toString()}
          orderId={String(nftListingData?.listingId)}
        />
      </div>
    );
  }

  return (
    <div className="nft-activities-container column-center-stretch">
      <NoEvents />
    </div>
  );
}
