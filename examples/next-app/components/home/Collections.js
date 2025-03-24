import Image from "next/image";
import React from "react";
import { useRouter } from "next/router";

import { appImages } from "@/collections/images";
import { svgIcons } from "@/collections/svg";
import Slider from "../common/Slider";
import Link from "next/link";

export function Collections({ heading, subheading, collectionData, viewAllPagePath }) {
  const router = useRouter();

  return (
    <section className="collection section-padding-block column-center-stretch">
      <div className="collection-type-container column-center-stretch">
        <div className="collection-header-container row-center-center">
          <div className="headings column-center-start">
            <h2 className="headings-h2 font-bold">{heading}</h2>
            <h3 className="headings-h3 font-regular">{subheading}</h3>
          </div>
          <button className="btn-white" onClick={() => router.push("/explore")}>
            View All
          </button>
        </div>
        {collectionData && collectionData.length > 0 ? (
          <Slider showItems={3} totalItems={collectionData.length} gapAmount={40}>
            {collectionData.map((data, index) => {
              let imageURL = `https://ipfs.io/ipfs/${data.image}`;
              return (
                <div key={index} className="collection-card">
                  <Link href={`/collection/${data.contractAddress}`}>
                    <div className="collection-items relative">
                      <span className="collection-img">
                        {data.image === "" ? (
                          <Image
                            src={appImages.collectionThumbnail1}
                            alt="thumbnail"
                            style={{
                              width: "100%",
                              height: "100%",
                            }}
                          />
                        ) : (
                          <img
                            src={imageURL}
                            alt="thumbnail"
                            style={{
                              width: "100%",
                              height: "100%",
                            }}
                          />
                        )}
                      </span>
                      <span className="heart-icon blur-bg box absolute circle">{svgIcons.heartOutline}</span>
                      <div className="collection-info absolute w-full row-center-center">
                        <p className="launching-info">Launching in 2 weeks</p>
                        <p className="deployment-info blur-bg w-max font-light">Deployed on {svgIcons.ethereum}</p>
                      </div>
                    </div>
                    <p className="collection-name font-bold">{data.contractName}</p>
                  </Link>
                </div>
              );
            })}
          </Slider>
        ) : null}
      </div>
    </section>
  );
}
