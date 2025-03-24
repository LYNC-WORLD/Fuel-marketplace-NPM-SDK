"use client";

import Image from "next/image";
import { appImages } from "@/collections/images";
import { svgIcons } from "@/collections/svg";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CompressAddress } from "@/helpers";
import { toast } from "react-hot-toast";
import { useConnectUI, useWallet } from "@fuels/react";
import blockchain from "../../config/blockchain.json";
import { useDebounce } from "@/hooks";
import { SearchResults } from "./SearchResults";

export default function Navbar() {
  const { connect, error, isError } = useConnectUI();
  const { wallet } = useWallet();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchList, setShowSearchList] = useState(false);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const searchContainerRef = useRef(null);
  const searchListContainerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchListContainerRef.current?.contains(event.target)) {
        return;
      }

      if (searchContainerRef.current?.contains(event.target)) {
        setShowSearchList(true);
        return;
      }

      setShowSearchList(false);
    };

    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  useEffect(() => {
    if (isError) {
      console.error("Error connecting to Wallet: ", { error });
      toast.error("Error connecting wallet");
    }
  }, [error, isError]);

  return (
    <header className="header w-full fixed row-between-center page-padding-inline">
      <span className="lync w-max inline-box">
        <Link href="/">
          <Image src={appImages.lync} alt="LYNC" width={95} height={(32 / 133) * 95} />
        </Link>
      </span>
      <div className="container row-between-center">
        <div className="relative" ref={searchContainerRef}>
          <form className="search-box row-center-center">
            <span className="search-icon inline-box">{svgIcons.search}</span>
            <input
              type="search"
              name="searchMarketplace"
              id="searchMarketplace"
              placeholder="Search NFTs..."
              className="search-input font-regular"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          {debouncedSearchQuery && showSearchList && (
            <SearchResults
              ref={searchListContainerRef}
              searchQuery={debouncedSearchQuery}
              setShowSearchList={setShowSearchList}
              setSearchQuery={setSearchQuery}
            />
          )}
        </div>
        {wallet?.address && (
          <div className="wallet-address-container relative row-between-center">
            <button className="btn-white font-bold">
              <Link href="/items/owned">{CompressAddress(String(wallet?.address.toB256())).compressedAddress}</Link>
            </button>
            <button
              className="inline-box"
              onClick={() => {
                navigator.clipboard.writeText(wallet?.address.toB256());
                toast.success("Wallet Address Copied Successfully!");
              }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em">
                <path d="M20 2H10c-1.103 0-2 .897-2 2v4H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2v-4h4c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zM4 20V10h10l.002 10H4zm16-6h-4v-4c0-1.103-.897-2-2-2h-4V4h10v10z" />
              </svg>
            </button>
            <div className="chain-name-box font-light">
              {wallet.provider.url == blockchain["fuel_testnet"].publicRpc && (
                <span style={{ fontSize: "var(--fs-sm)", letterSpacing: "0.025em" }} className="uppercase">
                  Testnet
                </span>
              )}
            </div>
            <a
              href="https://fueldeployer.lync.world/"
              target="_blank"
              style={{ fontSize: "var(--fs-sm)", letterSpacing: "0.025em" }}
              className="btn-black uppercase font-regular"
            >
              Create
            </a>
          </div>
        )}

        {!wallet?.address && (
          <button className="btn-black font-bold" onClick={connect}>
            Connect
          </button>
        )}
      </div>
    </header>
  );
}
