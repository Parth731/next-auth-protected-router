import { toast } from "react-toastify";

export const showSuccessToastMessage = (message: string) => {
  return toast.success(message, {
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    position: "top-right",
    style: {
      borderRadius: "0px",
      backgroundColor: "#1c1c1e",
      color: "#999999",
      fill: "#999999",
    },
  });
};

export const showErrorToastMessage = (message: string | any) => {
  return toast.error(message, {
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    position: "top-right",
  });
};
export const showInfoToastMessage = (message: string) => {
  return toast.info(message, {
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    position: "top-right",
  });
};

export const showWarnToastMessage = (message: string) => {
  return toast.warn(message, {
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    position: "top-right",
  });
};
