import React from "react";
import { getSkeletonList } from "@/helpers";
import { CommonCardSkeleton } from "./CommonCardSkeleton";

export function AllCollectionSkeleton() {
  let skeletonList = getSkeletonList(10, <CommonCardSkeleton />) || [];

  return (
    <div className="collection skeleton">
      <div className="banner-container box "></div>
      <div className="collection-profile-container page-padding-inline">
        <span className="collection-profile-img inline-box circle"></span>
        <h1 className="collection-name "></h1>
        <div className="collection-address-container row-start-center">
          <span className="collection-address"></span>
          <span className="collection-created-at"></span>
        </div>
        <p className="collection-description "></p>
        <p className="collection-description "></p>
      </div>
      <div className="display-grid-container no-margin-grid page-padding-inline w-full">
        <div className="display-grid w-full">
          {skeletonList.map((skeleton, i) => {
            return <React.Fragment key={i}>{skeleton}</React.Fragment>;
          })}
        </div>
      </div>
    </div>
  );
}
