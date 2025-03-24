import { useState } from "react";
import { CompressAddress, isOwner, reloadWindow } from "@/helpers";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/helpers/helperFn";
import { useWallet } from "@fuels/react";
import { MarketplaceClient, Networks } from "@lyncworld/fuel-marketplace";
import MintModal from "../common/MintModal";

function BuyNFT({ price, qtyListed, walletAddress, orderId, seller }) {
  const [qty, setQty] = useState(1);
  const [txnWaiting, setTxnWaiting] = useState(false);
  const { wallet } = useWallet();
  const [isApprove, setIsApprove] = useState(false);
  const [errorInPurchase, setErrorInPurchase] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const performTxn = async (e) => {
    e.preventDefault();

    if (!walletAddress) {
      toast.error("Please connect to wallet using the top right button!");
    } else {
      setIsModalOpen(true);
      setTxnWaiting(true);

      const marketplaceClient = new MarketplaceClient(Networks.Testnet, wallet);

      const response = await marketplaceClient
        .useBuyTokenService()
        .setProperties(orderId, qty, price)
        .execute();

      if (response.success) {
        setIsApprove(true);

        toast.success("Purchase Completed!");
        console.info("Transaction Id: ", response.data.transactionId);
        reloadWindow();

        setTimeout(() => {
          setIsModalOpen(false);
        }, 2000);
      } else {
        setErrorInPurchase(true);

        if (response.error.message.includes("Insufficient Balance"))
          setErrorMsg("Insufficient Balance!");
        else setErrorMsg(response.error.message);
      }
      setTxnWaiting(false);
    }
  };
  return (
    <>
      <MintModal
        isModalOpen={isModalOpen}
        errorInPurchase={errorInPurchase}
        errorMsg={errorMsg}
        isApprove={isApprove}
        txnWaiting={txnWaiting}
        setErrorInPurchase={setErrorInPurchase}
        setIsModalOpen={setIsModalOpen}
      />

      <tr className="listing-table-rows font-light">
        <td className="listing-table-columns">{price + " ETH"}</td>
        <td className="listing-table-columns">{qtyListed}</td>
        <td className="listing-table-columns">
          <span className="duration-input-group row-center-center">
            <button
              type="button"
              className="duration-change-btn aspect-square decrement"
              onClick={() => {
                if (qty === 1) {
                  return;
                }

                setQty((currentQty) => currentQty - 1);
              }}
              disabled={txnWaiting}
            >
              {" "}
              -{" "}
            </button>
            <input
              type="number"
              className="quantity-input"
              name="quantity"
              id="quantity"
              required={true}
              value={qty}
              readOnly={true}
              disabled
            />
            <button
              type="button"
              className="duration-change-btn aspect-square increment"
              onClick={() => {
                if (parseInt(qty) === parseInt(qtyListed)) {
                  return;
                }

                setQty((currentQty) => currentQty + 1);
              }}
              disabled={txnWaiting}
            >
              {" "}
              +{" "}
            </button>
          </span>
        </td>
        <td className="listing-table-columns">
          <a
            href={`https://app-testnet.fuel.network/account/${seller}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {isOwner(seller, wallet) ? (
              "You"
            ) : (
              <>{CompressAddress(seller).compressedAddress}</>
            )}
          </a>
        </td>
        <td className="listing-table-columns row-start-center">
          <button
            type="button"
            className="buy-btn font-bold"
            onClick={performTxn}
            disabled={txnWaiting}
          >
            {txnWaiting ? <span className="loader box relative"></span> : "Buy"}
          </button>
        </td>
      </tr>
    </>
  );
}

export default BuyNFT;
