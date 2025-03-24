import React from "react";
import { Loader2, TriangleAlert } from "lucide-react";

const MintModal = ({
  isModalOpen,
  errorInPurchase,
  errorMsg,
  isApprove,
  txnWaiting,
  setErrorInPurchase,
  setIsModalOpen,
}) => {
  if (!isModalOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        {!errorInPurchase ? (
          <>
            <div className="modal-header">
              <h2>Mint</h2>
            </div>
            <div className="modal-content">
              <div className="status-list">
                <div className="status-item">
                  {!isApprove ? (
                    <Loader2 className="spinner" />
                  ) : (
                    <div className="check-circle" />
                  )}
                  <div className="status-item-text">
                    <span>Wait for approval</span>
                    <p>Waiting for transaction to be approved</p>
                  </div>
                </div>
                <div className="status-item modal-alignitem">
                  {!txnWaiting ? (
                    <div className="check-circle" />
                  ) : (
                    <div className="uncheck-circle" />
                  )}
                  <span>Purchased!</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="reject-modal">
            <div className="reject-modal-body">
              <TriangleAlert color="#ff0000" size="30px" />
              <h2>{errorMsg}</h2>
            </div>
            <div className="reject-modal-button-container">
              <button
                onClick={() => {
                  setErrorInPurchase(false);
                  setIsModalOpen(false);
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MintModal;
