"use client";
import React from "react";
import { FuelProvider } from "@fuels/react";
import { createConfig, defaultConnectors } from "@fuels/connectors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { CHAIN_IDS, Provider } from "fuels";
import { ConnectProvider } from "./ConnectProvider";
import { DEFAULT_WAGMI_CONFIG } from "../../config/index";
const queryClient = new QueryClient();


const NETWORKS = [
  {
    chainId: CHAIN_IDS.fuel.testnet,
    url: "https://testnet.fuel.network/v1/graphql",
  },
];

const FUEL_CONFIG = createConfig(() => {
  return {
    connectors: defaultConnectors({
      devMode: true,
      wcProjectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID,
      ethWagmiConfig: DEFAULT_WAGMI_CONFIG,
      chainId: NETWORKS[0].chainId,
      fuelProvider: Provider.create(NETWORKS[0].url),
    }),
  };
});

export const WrapProvider = ({ children, initialState: wagmiInitialState}) => {
  return (
    <React.Fragment>
      <QueryClientProvider client={queryClient}>
        <ConnectProvider wagmiInitialState={wagmiInitialState}>
          <FuelProvider theme={"dark"} fuelConfig={FUEL_CONFIG} networks={NETWORKS}>
            {children}
          </FuelProvider>
        </ConnectProvider>
      </QueryClientProvider>
      <Toaster position="top-center" reverseOrder={true} />
    </React.Fragment>
  );
};
