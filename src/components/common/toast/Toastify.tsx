import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ToastOptions = {
  autoClose?: number | false;
  hideProgressBar?: boolean;
  newestOnTop?: boolean;
  closeOnClick?: boolean;
  rtl?: boolean;
  pauseOnFocusLoss?: boolean;
  draggable?: boolean;
  pauseOnHover?: boolean;
  progress?: number | string | undefined;
  bodyClassName?: string | undefined;
  toastClassName?: string | undefined;
  onOpen?: () => void | undefined;
  onClose?: () => void | undefined;
  type?: "info" | "success" | "warning" | "error" | undefined;
  position?:
    | "top-right"
    | "top-center"
    | "top-left"
    | "bottom-right"
    | "bottom-center"
    | "bottom-left"
    | undefined;
  progressClassName?: string | undefined;
  progressStyle?: object | undefined;
  role?: string | undefined;
  ariaLive?: string | undefined;
  toastStyle?: object | undefined;
  draggablePercent?: number | undefined;
  toastId?: string | number;
};

export const notify = (message: string, options: ToastOptions) =>
  toast(message, {
    position: "top-center",
    autoClose: 2000,
    pauseOnHover: false,
    toastClassName: "error_bodyClassName",
    ...options,
  });

const Toastify = () => {
  return (
    <div>
      <ToastContainer theme="dark" transition={Bounce} />
    </div>
  );
};

export default Toastify;
