import React from "react";
import Head from "next/head";
import { Hero } from "@/components/home/Hero";
import { ListingAndRentings } from "@/components/home/ListingsAndRentings";
import { TopActivities } from "@/components/home/TopActivities";

export default function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>LYNC Marketplace</title>
      </Head>

      <main className="home page-padding-inline">
        <Hero />
        <ListingAndRentings />
        <TopActivities />
      </main>
    </React.Fragment>
  );
}
