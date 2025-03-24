import { useEffect, useState } from "react";
import ModifyCancelListing1155 from "./ModifyCancelListing1155";
import ListLendNFT1155 from "./ListLendNFT1155";
import { AllListings1155 } from "./AllListings1155";
import { UserInteractionPanelSkeleton } from "@/skeletons/UserInteractionPanelSkeleton";
import { useIsConnected, useWallet } from "@fuels/react";
import { NFTStandardOutput } from "@/artifacts/marketplace/typegen/NftMarketplace";
import { getMintedAssetId } from "fuels";

export function UserInteraction1155({ data }) {
  const { listingData, lendingData, contractAddress, tokenId, owners, type } = data;

  const [qtyOwned, setQtyOwned] = useState(null);
  const { isConnected } = useIsConnected();

  const { wallet } = useWallet();

  const [showListLendForm, setShowListLendForm] = useState(false);
  const [loader, setLoader] = useState(false);
  const [toggleListingTable, setToggleListingTable] = useState(false);
  const [toggleLendingTable, setToggleLendingTable] = useState(false);
  const asset_id = getMintedAssetId(contractAddress, tokenId);

  const ownerLendingData = lendingData?.filter(
    (item) => item.lenderAddress.toLowerCase() === wallet?.address.toB256()?.toLowerCase()
  )?.[0];
  const ownerListingData = listingData?.filter(
    (item) => item.sellerAddress.toLowerCase() === wallet?.address.toB256()?.toLowerCase()
  )?.[0];
  const [userRentings, setUserRentings] = useState(null);

  async function init() {
    if (wallet && isConnected) {
      //setLoader(true);

      if (wallet?.address.toB256() != null) {
        let isOwner = false;

        const balance = await wallet?.getBalance(asset_id);
        if (balance.toNumber() > 0) {
          isOwner = true;
        }
        setQtyOwned(balance);

        if (isOwner) setShowListLendForm(true);
        else {
          setShowListLendForm(false);
        }
      }
    }
  }

  useEffect(() => {
    init();
  }, [wallet]);

  if (loader) {
    return <UserInteractionPanelSkeleton />;
  }

  return (
    <>
      {showListLendForm && !ownerListingData ? (
        <div className="nft-activities-container column-center-stretch">
          <ListLendNFT1155
            walletAddress={wallet?.address.toB256()}
            type={type}
            contractAddress={contractAddress}
            tokenId={tokenId}
            qtyOwned={qtyOwned}
            asset_id={asset_id}
          />
        </div>
      ) : null}
      {wallet && ownerListingData ? (
        <div className="nft-activities-container column-center-stretch">
          <ModifyCancelListing1155
            walletAddress={wallet?.address.toB256()}
            orderId={ownerListingData.listingId.toString()}
            currentPrice={ownerListingData.pricePerItem.toString()}
            qtyListed={Number(ownerListingData.tokenQuantity)}
            type={NFTStandardOutput.SEMI_FT}
            qtyOwned={qtyOwned?.toNumber()}
            asset_id={asset_id}
          />
        </div>
      ) : null}

      {listingData && <AllListings1155 listingData={listingData} walletAddress={wallet?.address.toB256()} />}
    </>
  );
}
