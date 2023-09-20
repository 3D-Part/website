import Paragraph from "@/components/common/text/paragraph/Paragraph";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { cartLengthSelector } from "@/redux/slices/cartSelectors";
import { cart, changeCartModalVisible } from "@/redux/slices/cartSlice";
import React from "react";

const CartIcon: React.FC<{ className: string }> = ({ className }) => {
  const cartLength = useAppSelector(cartLengthSelector);
  const dispatch = useAppDispatch();
  return (
    <div
      className={`${className} relative cursor-pointer p-1`}
      onClick={() => {
        dispatch(changeCartModalVisible(true));
      }}
    >
      <CartSvg />
      <div
        className={`text-white ${
          cartLength > 0 ? "bg-primary-500" : "bg-neutral-500"
        } w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-exo2 font-normal absolute top-[-2px] right-[-2px]`}
      >
        {cartLength}
      </div>
    </div>
  );
};

const CartSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
    >
      <g clipPath="url(#clip0_152_12794)">
        <path
          d="M22.9044 4.077C22.6231 3.73944 22.271 3.46795 21.8729 3.28182C21.4749 3.09568 21.0408 2.99946 20.6014 3H4.43341L4.39141 2.649C4.30545 1.91942 3.95479 1.24673 3.4059 0.758478C2.857 0.270223 2.14803 0.000341793 1.41341 0L1.19141 0C0.92619 0 0.671836 0.105357 0.484299 0.292893C0.296763 0.48043 0.191406 0.734784 0.191406 1C0.191406 1.26522 0.296763 1.51957 0.484299 1.70711C0.671836 1.89464 0.92619 2 1.19141 2H1.41341C1.65834 2.00003 1.89474 2.08996 2.07778 2.25272C2.26081 2.41547 2.37775 2.63975 2.40641 2.883L3.78241 14.583C3.92526 15.7998 4.50988 16.9218 5.42531 17.736C6.34074 18.5502 7.52326 19 8.74841 19H19.1914C19.4566 19 19.711 18.8946 19.8985 18.7071C20.0861 18.5196 20.1914 18.2652 20.1914 18C20.1914 17.7348 20.0861 17.4804 19.8985 17.2929C19.711 17.1054 19.4566 17 19.1914 17H8.74841C8.12946 16.9983 7.52621 16.8051 7.02134 16.4471C6.51648 16.089 6.13472 15.5835 5.92841 15H17.8484C19.0207 15.0001 20.1557 14.5882 21.0552 13.8364C21.9547 13.0846 22.5614 12.0407 22.7694 10.887L23.5544 6.533C23.6328 6.10101 23.6152 5.65707 23.5028 5.23264C23.3905 4.80821 23.1862 4.41368 22.9044 4.077ZM21.5914 6.178L20.8054 10.532C20.6805 11.225 20.3159 11.852 19.7753 12.3032C19.2347 12.7544 18.5526 13.0011 17.8484 13H5.61041L4.66941 5H20.6014C20.7483 4.99912 20.8936 5.03062 21.0269 5.09226C21.1603 5.15389 21.2784 5.24415 21.3729 5.35661C21.4674 5.46907 21.536 5.60097 21.5738 5.74294C21.6115 5.8849 21.6176 6.03344 21.5914 6.178Z"
          fill="white"
        />
        <path
          d="M7.19141 24C8.29598 24 9.19141 23.1046 9.19141 22C9.19141 20.8954 8.29598 20 7.19141 20C6.08684 20 5.19141 20.8954 5.19141 22C5.19141 23.1046 6.08684 24 7.19141 24Z"
          fill="white"
        />
        <path
          d="M17.1914 24C18.296 24 19.1914 23.1046 19.1914 22C19.1914 20.8954 18.296 20 17.1914 20C16.0868 20 15.1914 20.8954 15.1914 22C15.1914 23.1046 16.0868 24 17.1914 24Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_152_12794">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0.191406)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default CartIcon;
