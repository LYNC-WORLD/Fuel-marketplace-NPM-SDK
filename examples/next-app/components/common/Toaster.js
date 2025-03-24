import { svgIcons } from "@/collections/svg";
import { useToaster } from "@/context/ToasterContext";

export default function ToasterContainer() {
  const { toaster, setToaster, toastClosed, setToastClosed } = useToaster();

  function closeSuccessToaster() {
    setToaster({
      ...toaster,
      success: {
        message: toaster.success.message,
        show: false,
      },
    });
  }

  function closeErrorToaster() {
    setToaster({
      ...toaster,
      error: {
        message: toaster.success.message,
        show: false,
      },
    });
  }

  function closeInfoToaster() {
    setToaster({
      ...toaster,
      info: {
        message: toaster.success.message,
        show: false,
      },
    });
  }

  function closeWarningToaster() {
    setToaster({
      ...toaster,
      warning: {
        message: toaster.success.message,
        show: false,
      },
    });
  }

  return (
    <>
      {toaster.success.show ? (
        <div className={`toast ${toastClosed ? "toast-closed" : null} fixed`}>
          <div className="toast-container relative">
            <div className="toast-content column-start-start">
              <div className="toast-title-container row-start-center">
                <span className="toast-type-icon inline-box">{svgIcons.success}</span>
                <span className="toast-title success-toast-title font-bold">Success</span>
              </div>
              <p className="toast-msg capitalize font-bold">{toaster.success.message}</p>
            </div>
            <button
              className="toast-close-btn absolute"
              onClick={() => {
                setToastClosed(true);
                setTimeout(() => {
                  closeSuccessToaster();
                  setToastClosed(false);
                }, 250);
              }}
            >
              {svgIcons.close}
            </button>
          </div>
          <div className="toast-progress-container w-full">
            <span className="toast-progress-bar success-progress-bar"></span>
          </div>
        </div>
      ) : null}
      {toaster.error.show ? (
        <div className={`toast ${toastClosed ? "toast-closed" : null} fixed`}>
          <div className="toast-container relative">
            <div className="toast-content column-start-start">
              <div className="toast-title-container row-start-center">
                <span className="toast-type-icon inline-box">{svgIcons.error}</span>
                <span className="toast-title error-toast-title font-bold">Error</span>
              </div>
              <p className="toast-msg capitalize font-bold">{toaster.error.message}</p>
            </div>
            <button
              className="toast-close-btn absolute"
              onClick={() => {
                setToastClosed(true);
                setTimeout(() => {
                  closeErrorToaster();
                  setToastClosed(false);
                }, 250);
              }}
            >
              {svgIcons.close}
            </button>
          </div>
          <div className="toast-progress-container w-full">
            <span className="toast-progress-bar error-progress-bar"></span>
          </div>
        </div>
      ) : null}
      {toaster.info.show ? (
        <div className={`toast ${toastClosed ? "toast-closed" : null} fixed`}>
          <div className="toast-container relative">
            <div className="toast-content column-start-start">
              <div className="toast-title-container row-start-center">
                <span className="toast-type-icon inline-box">{svgIcons.info}</span>
                <span className="toast-title info-toast-title font-bold">Information</span>
              </div>
              <p className="toast-msg capitalize font-bold">{toaster.info.message}</p>
            </div>
            <button
              className="toast-close-btn absolute"
              onClick={() => {
                setToastClosed(true);
                setTimeout(() => {
                  closeInfoToaster();
                  setToastClosed(false);
                }, 250);
              }}
            >
              {svgIcons.close}
            </button>
          </div>
          <div className="toast-progress-container w-full">
            <span className="toast-progress-bar info-progress-bar"></span>
          </div>
        </div>
      ) : null}
      {toaster.warning.show ? (
        <div className={`toast ${toastClosed ? "toast-closed" : null} fixed`}>
          <div className="toast-container relative">
            <div className="toast-content column-start-start">
              <div className="toast-title-container row-start-center">
                <span className="toast-type-icon inline-box">{svgIcons.warning}</span>
                <span className="toast-title warning-toast-title font-bold">Warning</span>
              </div>
              <p className="toast-msg capitalize font-bold">{toaster.warning.message}</p>
            </div>
            <button
              className="toast-close-btn absolute"
              onClick={() => {
                setToastClosed(true);
                setTimeout(() => {
                  closeWarningToaster();
                  setToastClosed(false);
                }, 250);
              }}
            >
              {svgIcons.close}
            </button>
          </div>
          <div className="toast-progress-container w-full">
            <span className="toast-progress-bar warning-progress-bar"></span>
          </div>
        </div>
      ) : null}
    </>
  );
}
