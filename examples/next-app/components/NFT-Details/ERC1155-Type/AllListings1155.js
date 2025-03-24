import { useState } from "react";
import BuyNFT from "../BuyNFT";
import { svgIcons } from "@/collections/svg";
import { NoEvents } from "@/components/shared/NoEvents";

export function AllListings1155({ listingData, walletAddress }) {
  const [toggleListingTable, setToggleListingTable] = useState(true);

  return (
    <>
      <div className="nft-listing-table-container column-start-stretch">
        <div
          role="button"
          onClick={() => setToggleListingTable(!toggleListingTable)}
          className="listing-table-title row-between-center"
        >
          <span className="title">All Listings</span>
          <span className={`icon ${toggleListingTable ? "open" : "closed"}`}>
            {svgIcons.dropdown}
          </span>
        </div>
        <div className="listing-table-container-upper">
          {toggleListingTable === true ? (
            <>
              {listingData && listingData.length > 0 ? (
                <table className="nft-listing-table">
                  <thead className="listing-table-heading">
                    <tr className="listing-table-rows">
                      <th className="listing-table-columns font-light uppercase">
                        Price <small>(Per Item)</small>
                      </th>
                      <th className="listing-table-columns font-light uppercase">
                        Quantity
                      </th>
                      <th className="listing-table-columns font-light uppercase">
                        Qty to Buy
                      </th>
                      <th className="listing-table-columns font-light uppercase">
                        From
                      </th>
                      <th className="listing-table-columns font-light uppercase">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="listing-table-body">
                    {listingData.map((item, index) => {
                      if (
                        item.sellerAddress.toLowerCase() !==
                        String(walletAddress)?.toLowerCase()
                      ) {
                        return (
                          <BuyNFT
                            key={index}
                            price={item.pricePerItem.toString()}
                            qtyListed={item.tokenQuantity.toString()}
                            walletAddress={walletAddress?.toString()}
                            orderId={item.listingId.toString()}
                            seller={item.sellerAddress.toString()}
                          />
                        );
                      } else {
                        return null;
                      }
                    })}
                  </tbody>
                </table>
              ) : (
                <NoEvents />
              )}
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}
