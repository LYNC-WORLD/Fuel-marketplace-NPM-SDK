import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { useIsConnected, useWallet } from "@fuels/react";
import { NFTStandardOutput } from "@/artifacts/marketplace/typegen/NftMarketplace";
import blockchain from "../../config/blockchain.json";
import { checkNftOwnership } from "@lyncworld/fuel-marketplace";

export default function OwnedNFTs() {
  const { isConnected } = useIsConnected();

  const { wallet } = useWallet();
  const [contract, setContract] = useState("");
  const [subId, setSubId] = useState("");
  const [nftType, setNftType] = useState(NFTStandardOutput.NFT);
  const router = useRouter();

  const OnSubmit = async (e) => {
    e.preventDefault();

    if (!(wallet && isConnected)) {
      toast.error("Please connect your wallet using top right button!");
      return router?.push("/");
    }

    const response = await checkNftOwnership(wallet, contract, subId, nftType);

    if (!response.success) {
      toast.error(
        response.errors[0] ??
          "An error occurred while checking the ownership of the NFT."
      );
      return;
    }

    const data = response.data;
    return router?.replace(
      `/nft/${data.contractAddress}/${data.nftStandard}/${data.subId}`
    );
  };

  useEffect(() => {
    if (!isConnected && !wallet) {
      toast.error("Please connect your wallet using top right button!");
      router?.push("/");
      return;
    }

    if (wallet && isConnected) {
      if (wallet.provider.url !== blockchain["fuel_testnet"].publicRpc) {
        router.push("/");
      }
    }
  }, [wallet?.address]);

  return (
    <>
      <Head>
        <title>Your Profile | LYNC</title>
      </Head>
      <main className="owned-nfts">
        <div className="container column-start-start">
          <form
            className="gradient-border mx-auto form-container"
            onSubmit={OnSubmit}
          >
            <div className="form-group">
              <label htmlFor="contractAddress" className="form-label">
                Contract Address
              </label>
              <input
                type="text"
                id="contractAddress"
                name="contractAddress"
                className="form-input"
                placeholder="Ex. - 0xaaf5a2dda13caceaa3d80b8003db43ad9a0a02bb058..."
                value={contract}
                onChange={(e) => setContract(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="subId" className="form-label">
                Sub ID
              </label>
              <input
                type="text"
                id="subId"
                name="subId"
                className="form-input"
                placeholder="Ex. - 0xb8c1ebe89a0efc7bc5cebd4fc9da6abe650c3d0fe49..."
                value={subId}
                onChange={(e) => setSubId(e.target.value)}
              />
              <div className="form-input-description">
                <p className="description-title">NOTE -</p>
                <p>
                  A SubId is used to differentiate between different assets
                  created by the same contract on the Fuel Network. It is a
                  `b256` value. It is determined by the contract that created
                  the asset. It is used internally to distinguish between
                  different assets minted by the same contract.
                </p>
                <p style={{ marginTop: "0.3rem" }}>
                  For more technical details, you can refer to the{" "}
                  <a
                    href="https://docs.fuel.network/docs/nightly/sway/blockchain-development/native_assets/#the-subid-type"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "underline" }}
                  >
                    Fuel&apos;s Native Assets documentation
                  </a>
                  .
                </p>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="nftType" className="form-label">
                Token Type
              </label>
              <select
                id="nftType"
                name="nftType"
                className="form-select"
                value={nftType}
                onChange={(e) => setNftType(e.target.value)}
              >
                <option value={NFTStandardOutput.NFT}>
                  Non Fungible Token (NFT)
                </option>
                <option value={NFTStandardOutput.SEMI_FT}>
                  Semi Fungible Token (SFT)
                </option>
              </select>
            </div>
            <button
              type="submit"
              className="submit-btn uppercase btn-white row-center-center"
            >
              Submit Details
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
