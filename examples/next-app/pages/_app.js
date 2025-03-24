// pages/_app.js
'use client'
import Head from "next/head";
import "@/styles/main.css";
import ModalContainer from "@/components/common/Modal";
import ToasterContainer from "@/components/common/Toaster";
import Navbar from "@/components/common/NavbarNew";
import Footer from "@/components/common/Footer";
import { ToasterContextProvider } from "@/context/ToasterContext";
import { Toaster } from "react-hot-toast";
import dynamic from "next/dynamic";
import { WrapProvider } from "@/components/connector/WrapProvider";
import { DEFAULT_WAGMI_CONFIG } from "../config/index";
import { cookieToInitialState } from "wagmi";
import Cookies from 'js-cookie';

export default function App({ Component, pageProps }) {
  const cookieValue = Cookies.get('cookie');
  const wagmiInitialState = cookieToInitialState(DEFAULT_WAGMI_CONFIG, cookieValue);
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <WrapProvider initialState={wagmiInitialState}>
        <ToasterContextProvider>
          <Navbar />
          <ToasterContainer />
          {/* <Toaster position="bottom-right" reverseOrder={true} /> */}
          <Component {...pageProps} />
          <Footer />
          <ModalContainer />
        </ToasterContextProvider>
      </WrapProvider>
    </>
  );
}