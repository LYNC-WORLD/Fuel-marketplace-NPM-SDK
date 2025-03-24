import Image from "next/image";
import { appImages } from "@/collections/images";

export function Hero() {
  return (
    <>
      <section className="hero box min-h-screen2 relative">
        <span className="illustration box absolute">
          <Image
            src={appImages.illustration}
            alt="illustration"
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        </span>
        <h1 className="heading w-max absolute section-padding-block font-bold">
          Join the new era of
          <br />
          in-game asset with Web3.0
        </h1>
      </section>
    </>
  );
}
