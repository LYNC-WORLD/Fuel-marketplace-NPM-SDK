export function ContractCardSkeleton() {
    return (
        <>
            <div className="activities-data row-center-center skeleton w-full">
                <span className="counter inline-box"></span>
                <span className="data-avatar aspect-square inline-box"></span>
                <div className="data-name">
                    <p className="name capitalize w-full"></p>
                    <span className="at-text"></span>
                </div>
                <span className="data-amount"></span>
            </div>
        </>
    );
}
