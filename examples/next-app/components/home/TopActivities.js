import Link from "next/link";
import { NoEvents } from "../shared/NoEvents";
import ContractCard from "./ContractCard";
import { Networks, useCollections } from "@lyncworld/fuel-marketplace";
import { getSkeletonList } from "@/helpers";
import { ContractCardSkeleton } from "@/skeletons/ContractCardSkeleton";

export function TopActivities() {
  const { data, fetching } = useCollections({
    network: Networks.Testnet,
    limit: 10,
  });

  const skeletons = getSkeletonList(10, ContractCardSkeleton);

  return (
    <section className="top-activities section-padding-block column-center-stretch">
      <div className="headings-container row-start-center">
        <button style={{ color: "hsl(var(--color-fuel-green))" }} className="header-btns uppercase font-bold active">
          Latest Collections
        </button>
        <Link style={{ color: "black" }} href="/collections" className="btn-white uppercase ml-auto">
          View All
        </Link>
      </div>
      {fetching && <div className="activities-data-container">{skeletons.map((Skeleton) => Skeleton)}</div>}
      {!fetching && data.length === 0 && <NoEvents />}
      {!fetching && data.length > 0 && (
        <div className="activities-data-container">
          {data.map((d, i) => {
            return <ContractCard key={d.contractAddress} item={d} index={i} />;
          })}
        </div>
      )}
    </section>
  );
}
