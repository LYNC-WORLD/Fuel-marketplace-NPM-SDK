import { svgIcons } from "@/collections/svg";
import { ERC1155 } from "@/components/NFT-Details/ERC1155-Type/ERC1155";
import { ERC721 } from "@/components/NFT-Details/ERC721-Type/ERC721";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { NFTDetailsSkeleton } from "@/skeletons/NFTDetailsSkeleton";
import { NFTStandardOutput } from "@/artifacts/marketplace/typegen/NftMarketplace";
import { useWallet } from "@fuels/react";
import { Networks, useNft } from "@lyncworld/fuel-marketplace";
import { Address, getMintedAssetId, isB256 } from "fuels";

export default function NFTDetails({ contractAddress, tokenId, nftType }) {
  const router = useRouter();

  const { data, fetching } = useNft({
    network: Networks.Testnet,
    nftStandard: nftType,
    contractAddress,
    tokenId,
  });

  let mintedAssetId = "";
  if (contractAddress && tokenId) {
    mintedAssetId = getMintedAssetId(contractAddress, tokenId);
  }

  const { wallet } = useWallet();

  if (router.isFallback || fetching) return <NFTDetailsSkeleton />;

  return (
    <React.Fragment>
      <Head>
        <title>
          {data?.nftMetadata.tokenName || mintedAssetId || "Unknown"} | LYNC
        </title>
      </Head>
      <main className="nft-details page-padding-inline page-padding-block">
        <div className="container">
          <div className="grid-items image-container">
            <span className="nft-image box aspect-square relative">
              {[
                "flv",
                "mp4",
                "m3u8",
                "ts",
                "3gp",
                "mov",
                "avi",
                "wmv",
              ].includes(data?.nftMetadata.tokenAssetMedia) ? (
                <video
                  poster={data?.nftMetadata.tokenImage}
                  muted
                  loop
                  autoPlay
                >
                  <source
                    src={data?.nftMetadata.tokenImage}
                    type={`video/${data?.nftMetadata.tokenAssetMedia}`}
                  />
                </video>
              ) : (
                <img
                  src={
                    data?.nftMetadata.tokenImage ||
                    "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80"
                  }
                  alt={
                    data?.nftMetadata.tokenName || mintedAssetId || "Unknown"
                  }
                  height="100%"
                  width="100%"
                />
              )}

              <span className="heart-icon box absolute blur-bg circle">
                {svgIcons.heartOutline}
              </span>
            </span>
            <div className="description-container column-center-stretch">
              <div
                style={{ color: "hsl(var(--color-fuel-green))" }}
                className="description-header row-start-center"
              >
                {svgIcons.description}
                Description
              </div>
              <p
                style={{ color: "hsl(var(--color-white))" }}
                className="content font-light"
              >
                {data?.nftMetadata.description || "-"}
              </p>
            </div>
          </div>
          {nftType === NFTStandardOutput.NFT ? (
            <ERC721
              nftData={{
                contractAddress: contractAddress,
                tokenId: tokenId,
                data: data.nftMetadata,
                type: nftType,
                assetId: mintedAssetId,
              }}
              walletAddress={wallet?.address?.toB256()}
              listingData={data?.listingData}
            />
          ) : nftType === NFTStandardOutput.SEMI_FT ? (
            <ERC1155
              nftData={{
                contractAddress: contractAddress,
                tokenId: tokenId,
                data: data?.nftMetadata,
                type: nftType,
                assetId: mintedAssetId,
              }}
              walletAddress={wallet?.address?.toB256()}
              listingData={data?.listingData}
            />
          ) : null}
        </div>
      </main>
    </React.Fragment>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { contractAddress, tokenId, nftType } = context.params;
  const isAddress = Address.fromB256(contractAddress.toString());
  const isSubId = isB256(tokenId);

  if (isAddress && isSubId) {
    return {
      props: {
        contractAddress: contractAddress.toString(),
        tokenId: tokenId,
        nftType: nftType,
      },
      revalidate: 5,
    };
  } else {
    return {
      notFound: true,
      revalidate: 5,
    };
  }
}
