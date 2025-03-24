import { UserInteractionPanelSkeleton } from "./UserInteractionPanelSkeleton";

export function NFTDetailsSkeleton() {
    return (
        <>
            <div className="nft-details skeleton page-padding-inline page-padding-block">
                <div className="container">
                    <div className="grid-items image-container">
                        <span className="nft-image box aspect-square relative">
                            <span className="heart-icon box absolute blur-bg circle"></span>
                        </span>
                        <div className="description-container column-center-stretch">
                            <div className="description-header row-start-center">
                                <span className="icon"></span>
                                <span className="text"></span>
                            </div>
                            <p className="content">
                                <span className="lines w-full"></span>
                                <span className="lines w-full"></span>
                                <span className="lines w-full"></span>
                                <span className="lines w-full"></span>
                                <span className="lines w-full"></span>
                                <span className="lines w-full"></span>
                            </p>
                        </div>
                    </div>
                    <div className="grid-items details-container column-start-stretch">
                        <div className="nft-information-container column-center-stretch">
                            <span className="collection-name">
                                <span className="contract-address"></span>
                                <span className="nft-type"></span>
                            </span>
                            <h1 className="art-name"></h1>
                            <span className="owner-name"></span>
                            <span className="sell-information-details row-start-center">
                                <span className="icon circle"></span>
                                <span className="text w-full"></span>
                            </span>
                        </div>
                        <UserInteractionPanelSkeleton />
                    </div>
                </div>
            </div>
        </>
    );
}
