import { useState } from "react";
import { toast } from "react-hot-toast";
import { getErrorMessage } from "@/helpers/helperFn";
import { reloadWindow } from "@/helpers";
import { useWallet } from "@fuels/react";
import { NFTStandardOutput } from "@/artifacts/marketplace/typegen/NftMarketplace";
import { MarketplaceClient, Networks } from "@lyncworld/fuel-marketplace";

function ModifyCancelListing1155({ walletAddress, orderId, currentPrice, qtyListed, type, qtyOwned, asset_id }) {
  const [inputQty, setInputQty] = useState(0);
  const [inputAmt, setAmt] = useState(0);
  const [activeLogicBtn, setActiveLogicBtn] = useState("left");
  const [txnWaiting, setTxnWaiting] = useState(false);

  const { wallet } = useWallet();

  const performCancelTxn = async (e) => {
    e.preventDefault();

    if (!walletAddress) {
      toast.error("Please connect wallet using the top right button!");
    } else {
      setTxnWaiting(true);
      const marketplaceClient = new MarketplaceClient(Networks.Testnet, wallet);
      const response = await marketplaceClient.useCancelListingService().setProperties(orderId).execute();

      if (response.success) {
        toast.success("NFT Listing Canceled!");
        console.info("Transaction Id: ", response.data.transactionId);
        reloadWindow();
      } else {
        toast.error("Error canceling NFT listing: " + getErrorMessage(response.error));
      }

      setTxnWaiting(false);
    }
  };

  const performModifyTxn = async (e) => {
    e.preventDefault();

    if (!inputAmt && !inputQty) {
      toast.error("Please enter at least amount or quantity to modify!");
      return;
    }
    if (inputAmt) {
      if (Number(inputAmt) <= 0) {
        toast.error("Price can't be equal or less than zero");
        return;
      }
    }

    if (walletAddress == null) {
      toast.error("Please connect wallet using the top right button");
    } else {
      setTxnWaiting(true);
      const marketplaceClient = new MarketplaceClient(Networks.Testnet, wallet);

      const response = await marketplaceClient
        .useModifyListingService()
        .setProperties(orderId, inputAmt, inputQty, asset_id)
        .execute();

      if (response.success) {
        toast.success("NFT Listing Modified!");
        console.info("Transaction Id: ", response.data.transactionId);
        reloadWindow();
      } else {
        toast.error("Error modifying NFT listing: " + getErrorMessage(response.error));
      }
      setTxnWaiting(false);
    }
  };

  return (
    <>
      <div className="logic-btns-container w-full row-center-center">
        <button
          className={`logic-btns font-bold ${activeLogicBtn === "left" ? "active" : null}`}
          disabled={txnWaiting}
          onClick={() => {
            setActiveLogicBtn("left");
          }}
        >
          Modify Listing
        </button>
        <button
          className={`logic-btns font-bold ${activeLogicBtn === "right" ? "active" : null}`}
          disabled={txnWaiting}
          onClick={() => {
            setActiveLogicBtn("right");
          }}
        >
          Cancel Listing
        </button>
      </div>
      <form
        className={`activity-form column-start-start ${
          activeLogicBtn === "left" ? "modify-listing-form" : "cancel-listing-form"
        }`}
      >
        <div className="form-data-group current-price-data w-full">
          <label htmlFor="currentPrice" className="label uppercase">
            Price Per Item
          </label>
          <div className="amount-input-container row-center-stretch">
            <input
              type="text"
              className="amount-input listing-price font-bold"
              name="currentPrice"
              id="currentPrice"
              value={currentPrice + " ETH"}
              readOnly={true}
              style={{ color: "hsl(var(--color-fuel-green))" }}
            />
          </div>
          <div className="qty-listed-group row-start-center">
            <p className="qty-listed uppercase">Listed: {qtyListed}</p>
            {qtyOwned - qtyListed > 0 ? (
              <p className="qty-listed uppercase">Not Listed: {qtyOwned}</p>
            ) : type === NFTStandardOutput.SEMI_FT ? (
              <p className="qty-listed uppercase">All copies listed</p>
            ) : null}
          </div>
        </div>
        {activeLogicBtn === "left" ? (
          <div className="form-data-group w-full">
            <label htmlFor="sellAmount" className="label uppercase">
              Modify Price Per Item
            </label>
            <div className="amount-input-container  row-center-stretch">
              <input
                type="number"
                className="amount-input"
                name="sellAmount"
                id="sellAmount"
                required={true}
                placeholder={"Amount"}
                min={0}
                onChange={(e) => {
                  setAmt(e.target.value);
                }}
              />
              <select className="amount-unit" name="amountUnit" id="amountUnit" required={true} defaultValue={"ETH"}>
                <option value="ETH">ETH</option>
              </select>
            </div>
          </div>
        ) : null}
        {qtyOwned - qtyListed > 0 && activeLogicBtn === "left" ? (
          <div className="form-data-group qty-input-group w-full">
            <label htmlFor="lendDuration" className="label uppercase">
              Quantity to increase
            </label>
            <div className="duration-input-container row-start-center">
              <span className="duration-input-group">
                <button
                  type="button"
                  className="duration-change-btn aspect-square decrement"
                  onClick={() => {
                    if (inputQty > 0) setInputQty(inputQty - 1);
                  }}
                >
                  {" "}
                  -{" "}
                </button>
                <input
                  type="number"
                  className="duration-input"
                  name="lendDuration"
                  id="lendDuration"
                  required={true}
                  value={inputQty}
                  disabled
                />
                <button
                  type="button"
                  className="duration-change-btn aspect-square increment"
                  onClick={() => {
                    if (inputQty < qtyOwned - qtyListed) setInputQty(inputQty + 1);
                  }}
                >
                  {" "}
                  +{" "}
                </button>
              </span>
            </div>
          </div>
        ) : null}
        {activeLogicBtn === "left" ? (
          <button
            type="submit"
            className="activity-submit-btn font-bold"
            disabled={txnWaiting}
            onClick={performModifyTxn}
          >
            {txnWaiting ? <span className="loader box relative"></span> : "Modify Listing"}
          </button>
        ) : (
          <button
            type="submit"
            className="activity-submit-btn font-bold"
            disabled={txnWaiting}
            onClick={performCancelTxn}
          >
            {txnWaiting ? <span className="loader box relative"></span> : "Cancel Listing"}
          </button>
        )}
      </form>
    </>
  );
}

export default ModifyCancelListing1155;
