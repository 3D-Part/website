import { ToastContainer, toast, Bounce, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const notify = (message: string, options: ToastOptions) =>
  toast(message, {
    position: "top-right",
    autoClose: 2000,
    pauseOnHover: false,
    className: "error_bodyClassName",
    hideProgressBar: true,
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
