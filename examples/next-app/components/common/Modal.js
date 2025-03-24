import { svgIcons } from "@/collections/svg";

export function ModalBody({ children = null, changeStatus }) {
    return (
        <>
            {children ? (
                <div className="modal fixed box inset blur-bg">
                    <div className="modal-card popup relative">
                        {children}
                        <button
                            className="modal-close-btn inline-box aspect-square absolute"
                            onClick={() => changeStatus(false)}
                        >
                            {svgIcons.close}
                        </button>
                    </div>
                </div>
            ) : null}
        </>
    );
}

export default function ModalContainer() {
    return (
        <>
            <ModalBody />
        </>
    );
}
