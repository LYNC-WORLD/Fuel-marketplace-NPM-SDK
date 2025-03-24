import { createContext, useState, useContext } from "react";
const ToasterContext = createContext();

export function ToasterContextProvider({ children }) {
    const [toaster, setToaster] = useState({
        success: {
            message: "",
            show: false,
        },

        error: {
            message: "",
            show: false,
        },

        info: {
            message: "",
            show: false,
        },

        warning: {
            message: "",
            show: false,
        },
    });
    const [toastClosed, setToastClosed] = useState(false);

    const toast = {
        success: function (message) {
            setToaster({
                ...toaster,
                success: {
                    message: message,
                    show: true,
                },
            });

            setTimeout(() => {
                if (toaster.success.show) {
                    setToastClosed(true);
                    setTimeout(() => {
                        if (toaster.success.show) {
                            setToaster({
                                ...toaster,
                                success: {
                                    message: toaster.success.message,
                                    show: false,
                                },
                            });
                            setToastClosed(false);
                        }
                    }, 250);
                }
            }, 5000);
        },

        error: function (message) {
            setToaster({
                ...toaster,
                error: {
                    message: message,
                    show: true,
                },
            });

            setTimeout(() => {
                if (toaster.error.show) {
                    setToastClosed(true);
                    setTimeout(() => {
                        if (toaster.error.show) {
                            setToaster({
                                ...toaster,
                                error: {
                                    message: toaster.error.message,
                                    show: false,
                                },
                            });
                            setToastClosed(false);
                        }
                    }, 250);
                }
            }, 5000);
        },

        info: function (message) {
            setToaster({
                ...toaster,
                info: {
                    message: message,
                    show: true,
                },
            });

            setTimeout(() => {
                if (toaster.info.show) {
                    setToastClosed(true);
                    setTimeout(() => {
                        if (toaster.info.show) {
                            setToaster({
                                ...toaster,
                                info: {
                                    message: toaster.info.message,
                                    show: false,
                                },
                            });
                            setToastClosed(false);
                        }
                    }, 250);
                }
            }, 5000);
        },

        warning: function (message) {
            setToaster({
                ...toaster,
                warning: {
                    message: message,
                    show: true,
                },
            });

            setTimeout(() => {
                if (toaster.warning.show) {
                    setToastClosed(true);
                    setTimeout(() => {
                        if (toaster.warning.show) {
                            setToaster({
                                ...toaster,
                                warning: {
                                    message: toaster.warning.message,
                                    show: false,
                                },
                            });
                            setToastClosed(false);
                        }
                    }, 250);
                }
            }, 5000);
        },
    };

    return (
        <ToasterContext.Provider
            value={{ toast, toaster, setToaster, toastClosed, setToastClosed }}
        >
            {children}
        </ToasterContext.Provider>
    );
}

export function useToaster() {
    return useContext(ToasterContext);
}
