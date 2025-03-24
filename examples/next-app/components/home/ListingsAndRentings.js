import React, { useEffect, useState } from "react";
import Slider from "../common/Slider";
import ListingCard from "../cards/ListingCard";
import { ListingCardSkeleton } from "@/skeletons/ListingCardSkeleton";
import Link from "next/link";
import { NoEvents } from "../shared/NoEvents";
import { Networks, useListings } from "@lyncworld/fuel-marketplace";

export function ListingAndRentings() {
  const { data, fetching } = useListings({
    network: Networks.Testnet,
    limit: 8,
  });

  const [slidesToShow, setSlidesToShow] = useState(3);
  const [width, setWidth] = useState(0);

  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    setWidth(window.innerWidth);

    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    // console.log(width);
    if (width <= 480) {
      setSlidesToShow(1);
    } else {
      if(data?.length>4) setSlidesToShow(1);
      else setSlidesToShow(4);
    }

    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [width]);

  return (
    <section className="listing-renting section-padding-block column-center-stretch">
      <div className="headings-container row-start-center">
        <button
          style={{ color: "hsl(var(--color-fuel-green))" }}
          className="header-btns uppercase font-bold active"
        >
          Recently Listed
        </button>
        <Link
          style={{ color: "black" }}
          href="/items/sell"
          className="btn-white uppercase ml-auto"
        >
          View All
        </Link>
      </div>
      {fetching && (
        <div className="nft-cards-container row-start-center responsive-new w-full ">
          <ListingCardSkeleton />
          <ListingCardSkeleton />
          <ListingCardSkeleton />
          <ListingCardSkeleton />
        </div>
      )}
      {!fetching && data.length === 0 && <NoEvents />}
      {!fetching && data.length > 0 && (
        <div className="nft-cards-container row-start-center w-full">
          <Slider showItems={slidesToShow} totalItems={data.length} gapAmount={10}>
            {data.map((d, i) => (
              <ListingCard key={d.listingId} data={d} iKey={i} />
            ))}
          </Slider>
        </div>
      )}
    </section>
  );
}
