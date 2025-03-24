import { reloadWindow } from "@/helpers";
import { getErrorMessage } from "@/helpers/helperFn";
import { useState } from "react";
import toast from "react-hot-toast";
import { NFTStandardInput } from "../../../artifacts/marketplace/typegen/NftMarketplace";
import { useWallet } from "@fuels/react";
import { MarketplaceClient, Networks } from "@lyncworld/fuel-marketplace";

function ListLendNFT1155({ walletAddress, provider, contractAddress, tokenId, qtyOwned, asset_id }) {
  const [activeLogicBtn, setActiveLogicBtn] = useState("sell");
  const [amt, setAmt] = useState(null);
  const [qtyInput, setQtyInput] = useState(1);
  const [txnWaiting, setTxnWaiting] = useState(false);

  const { wallet } = useWallet();

  async function performListTxn(e) {
    e.preventDefault();
    if (amt === null || amt === "" || amt <= 0) {
      toast.error("Invalid price input");
    } else {
      setTxnWaiting(true);

      const marketplaceClient = new MarketplaceClient(Networks.Testnet, wallet);
      const response = await marketplaceClient
        .useListTokenService()
        .setProperties(asset_id, contractAddress, tokenId, amt, qtyInput, NFTStandardInput.SEMI_FT)
        .execute();

      if (response.success) {
        toast.success("NFT Listed Successfully.");
        console.info("Transaction Id: ", response.data.transactionId);
        reloadWindow();
      } else {
        toast.error("Error listing token: " + getErrorMessage(response.error));
        console.error("Error listing token: ", { error: response.error });
      }

      setTxnWaiting(false);
    }
  }

  return (
    <div className="nft-activities-container column-center-stretch">
      <div className="logic-btns-container w-full row-center-center">
        <button
          className={`logic-btns font-bold ${activeLogicBtn === "sell" ? "active" : null}`}
          disabled={txnWaiting}
          onClick={() => {
            setActiveLogicBtn("sell");
          }}
        >
          Sell
        </button>
      </div>
      <form
        className={`activity-form column-start-start ${activeLogicBtn === "sell" ? "listing-form" : "lending-form"}`}
      >
        <p className="qty-listed uppercase">Items Available: {qtyOwned.toString()}</p>
        <div className="form-data-group listing-price-data  w-full">
          <label htmlFor="sellAmount" className="label uppercase">
            Price Per {activeLogicBtn === "sell" ? "Item" : "Day"}
          </label>
          <div className="amount-input-container row-center-stretch">
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

        <div className="form-data-group quantity-input-group w-full">
          <label htmlFor="lendDuration" className="label uppercase">
            Quantity
          </label>
          <div className="duration-input-container row-start-center">
            <span className="duration-input-group">
              <button
                type="button"
                className="duration-change-btn aspect-square decrement"
                onClick={() => {
                  if (qtyInput > 1) setQtyInput(qtyInput - 1);
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
                placeholder={""}
                value={qtyInput}
                disabled
              />
              <button
                type="button"
                className="duration-change-btn aspect-square increment"
                onClick={() => {
                  if (qtyInput < qtyOwned.toNumber()) setQtyInput(qtyInput + 1);
                }}
              >
                {" "}
                +{" "}
              </button>
            </span>
          </div>
        </div>

        <button type="submit" className="activity-submit-btn font-bold" onClick={performListTxn} disabled={txnWaiting}>
          {txnWaiting ? <span className="loader box relative"></span> : "List NFT"}
        </button>
      </form>
    </div>
  );
}

export default ListLendNFT1155;
