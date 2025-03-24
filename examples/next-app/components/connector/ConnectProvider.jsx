"use client";

import { DEFAULT_WAGMI_CONFIG } from "../../config/index";
import { ConnectKitProvider } from "connectkit";
import { WagmiProvider } from "wagmi";


export function ConnectProvider({ children, wagmiInitialState }) {
  return (
    <WagmiProvider config={DEFAULT_WAGMI_CONFIG} initialState={wagmiInitialState}>
      <ConnectKitProvider>{children}</ConnectKitProvider>
    </WagmiProvider>
  );
}