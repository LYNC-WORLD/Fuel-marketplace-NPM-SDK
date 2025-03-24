import { svgIcons } from "@/collections/svg";

export default function Footer() {
  function onSubscribe(e) {
    e.preventDefault();
    const form = e.target;

    const email = form.email.value;
    if (!email) {
      return;
    }

    form.reset();
  }

  return (
    <div className="footer-container">
      <div className="footer row-start-stretch2">
        <div className="footer-common footer-1">
          <span className="heading uppercase font-light">Connect With Us</span>
          <div className="icons-container row-center-center w-max">
            <a href="https://www.linkedin.com/company/lync-world/" target="_blank" rel="noopener noreferrer">
              <span className="icons inline-box aspect-square">{svgIcons.linkedin}</span>
            </a>
            <a href="https://discord.com/invite/R8s8NGauRn" target="_blank" rel="noopener noreferrer">
              <span className="icons inline-box aspect-square">{svgIcons.discord}</span>
            </a>
            <a href="https://x.com/Lyncworld" target="_blank" rel="noopener noreferrer">
              <span className="icons inline-box aspect-square">{svgIcons.twitter}</span>
            </a>
            <a href="https://t.me/lyncgg" target="_blank" rel="noopener noreferrer">
              <span className="icons inline-box aspect-square">{svgIcons.telegram}</span>
            </a>
            <a href="https://lyncworld.medium.com/" target="_blank" rel="noopener noreferrer">
              <span className="icons inline-box aspect-square">{svgIcons.medium}</span>
            </a>
          </div>
          <span className="lets-connect-text font-light uppercase">
            Working On a Web3 Product?
            <br />
            Let&apos;s connect
          </span>
          <p className="email-text font-light">
            Email us at:{" "}
            <a href="mailto: team@lync.world">
              <span className="email-link">team@lync.world</span>
            </a>
          </p>
        </div>
        <div className="footer-common footer-2">
          <span className="heading uppercase">Our Product</span>

          <ul className="products-list items-list column-start-start">
            <a href="https://docs.lync.world/fuel/lync-unity-fuel-sdk" target="_blank" rel="noopener noreferrer">
              <li className="products-list-items list-items font-light">Unity Fuel SDK</li>
            </a>
            <a href="https://fueldeployer.lync.world/" target="_blank" rel="noopener noreferrer">
              <li className="products-list-items list-items font-light">Fuel NFT Deployer</li>
            </a>
            <a href="https://creator.lync.world/" target="_blank" rel="noopener noreferrer">
              <li className="products-list-items list-items font-light">EVM NFT Deployer</li>
            </a>
            <a href="https://fuel-lootbox.lync.world/" target="_blank" rel="noopener noreferrer">
              <li className="products-list-items list-items font-light">Fuel Lootbox</li>
            </a>
            <a
              href="https://lync.gitbook.io/lync/products/lync-in-game-marketplace-sdk"
              target="_blank"
              rel="noopener noreferrer"
            >
              <li className="products-list-items list-items font-light">In-Game Marketplace</li>
            </a>
          </ul>
        </div>
        <div className="footer-common footer-3">
          <span className="heading uppercase">Community</span>
          <ul className="community-list items-list column-start-start">
            <a href="https://lyncworld.medium.com/" target="_blank" rel="noopener noreferrer">
              <li className="community-list-items list-items font-light">Blog</li>
            </a>
            <a href="https://discord.com/invite/R8s8NGauRn" target="_blank" rel="noopener noreferrer">
              <li className="community-list-items list-items font-light">Discord</li>
            </a>
            <a href="https://t.me/lyncgg" target="_blank" rel="noopener noreferrer">
              <li className="community-list-items list-items font-light">Telegram</li>
            </a>
            <a href="https://www.lync.world/" target="_blank" rel="noopener noreferrer">
              <li className="community-list-items list-items font-light">Partnership</li>
            </a>
            <a
              href="https://ipfs.io/ipfs/bafybeiefcqt2jftwc56b7ivy5wmb4ng2xlloo7dyehdts3s4s4kmiqwr6i/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <li className="community-list-items list-items font-light">Media Kit</li>
            </a>
          </ul>
        </div>
        <div className="footer-common footer-4">
          <span className="heading uppercase">Stay Updated</span>
          <form className="subscription-form row-start-stretch3" onSubmit={(e) => onSubscribe(e)}>
            <input
              type="email"
              name="email"
              id="email"
              className="email-input w-full font-bold"
              placeholder={"example@gmail.com"}
              style={{ color: "#ffffff", fontWeight: "300" }}
            />
            <button type="submit" className="subscribe-btn font-light">
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="copyright-text font-light mx-auto">
        <span className="text">&copy; {new Date().getFullYear()} LYNC World. All Rights Reserved</span>
      </div>
    </div>
  );
}
