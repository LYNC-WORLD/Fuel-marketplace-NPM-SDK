import { reloadWindow } from "@/helpers";
import { getErrorMessage } from "@/helpers/helperFn";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useWallet } from "@fuels/react";
import { MarketplaceClient, Networks } from "@lyncworld/fuel-marketplace";

export function BuyNFT721({ price, walletAddress, orderId }) {
  const [txnWaiting, setTxnWaiting] = useState(false);
  const { wallet } = useWallet();

  const performTxn = async (e) => {
    e.preventDefault();

    if (!walletAddress) {
      toast.error("Please connect to wallet using the top right button!");
    } else {
      setTxnWaiting(true);

      const marketplaceClient = new MarketplaceClient(Networks.Testnet, wallet);
      const response = await marketplaceClient.useBuyTokenService().setProperties(orderId, 1, price).execute();

      if (response.success) {
        toast.success("NFT buy successful.");
        console.info("Transaction Id: ", response.data.transactionId);
        reloadWindow();
      } else {
        toast.error("Error canceling NFT listing: " + getErrorMessage(response.error));
      }

      setTxnWaiting(false);
    }
  };

  return (
    <form className="activity-form column-start-start" onSubmit={(e) => performTxn(e)}>
      <div className="form-data-group current-price-data w-full">
        <label htmlFor="currentPrice" className="label uppercase">
          Current Price
        </label>
        <div className="amount-input-container row-center-stretch">
          <input
            type="text"
            className="amount-input listing-price font-bold"
            name="currentPrice"
            id="currentPrice"
            value={price + " ETH"}
            readOnly={true}
            style={{ color: "hsl(var(--color-fuel-green))" }}
          />
        </div>
      </div>
      <button type="submit" className="activity-submit-btn font-bold" disabled={txnWaiting}>
        {txnWaiting ? <span className="loader box relative"></span> : "Buy"}
      </button>
    </form>
  );
}
