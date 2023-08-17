"use client ";
import { useIsTablet } from "@/shared/hooks/useMediaQuerry";
import { motion } from "framer-motion";

const FastDelivery = () => {
  const isTablet = useIsTablet();

  const variants = {
    hidden: {
      x: isTablet === false ? -50 : 0,
      opacity: isTablet === false ? 0 : 1,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 1, type: "spring", delay: 0.3 },
    },
  };
  const pathVariants = {
    hidden: {
      pathLength: isTablet === false ? 0 : 1,
      opacity: isTablet === false ? 0 : 1,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 1, delay: 0.3 },
    },
  };

  return (
    <motion.svg
      width="66"
      height="66"
      viewBox="0 0 66 66"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      variants={variants}
    >
      <g clipPath="url(#clip0_152_12524)">
        <mask
          id="mask0_152_12524"
          maskUnits="userSpaceOnUse"
          x="-1"
          y="0"
          width="66"
          height="66"
        >
          <motion.path
            variants={pathVariants}
            d="M-1 7.62939e-06H65V66H-1V7.62939e-06Z"
            fill="white"
          />
        </mask>
        <g mask="url(#mask0_152_12524)">
          <motion.path
            variants={pathVariants}
            d="M58.4047 50.5667C57.793 52.8494 55.4467 54.7 53.1639 54.7C50.8811 54.7 49.5264 52.8494 50.1381 50.5667C50.7497 48.2839 53.0961 46.4333 55.3789 46.4333C57.6617 46.4333 59.0164 48.2839 58.4047 50.5667Z"
            stroke="#35CDFD"
            strokeWidth="3"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <motion.path
            variants={pathVariants}
            d="M54.2818 50.5667H54.2715"
            stroke="#35CDFD"
            strokeWidth="3"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <motion.path
            variants={pathVariants}
            d="M26.3715 50.5667C25.7598 52.8494 23.4135 54.7 21.1307 54.7C18.8479 54.7 17.4932 52.8494 18.1049 50.5667C18.7165 48.2839 21.0629 46.4333 23.3457 46.4333C25.6285 46.4333 26.9832 48.2839 26.3715 50.5667Z"
            stroke="#35CDFD"
            strokeWidth="3"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <motion.path
            variants={pathVariants}
            d="M22.2486 50.5667H22.2383"
            stroke="#35CDFD"
            strokeWidth="3"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <motion.path
            variants={pathVariants}
            d="M26.3721 50.5667H50.1386"
            stroke="#35CDFD"
            strokeWidth="3"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <motion.path
            variants={pathVariants}
            d="M42.333 23.7001H49.0704C49.641 23.7001 49.9797 24.1628 49.8268 24.7335L42.9048 50.5667"
            stroke="#35CDFD"
            strokeWidth="3"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <motion.path
            variants={pathVariants}
            d="M18.1053 50.5667H12.9386C12.368 50.5667 12.0293 50.104 12.1822 49.5333L14.1204 42.2998"
            stroke="#35CDFD"
            strokeWidth="3"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <motion.path
            variants={pathVariants}
            d="M49.5498 25.7668H58.3046C59.2366 25.7668 59.886 26.3905 59.8904 27.2897L59.9375 37.1333L63.4313 39.6314C63.9538 40.0048 64.1544 40.6775 63.9598 41.4035L62.0584 48.4999C61.7526 49.6414 60.5794 50.5667 59.4379 50.5667H58.4046"
            stroke="#35CDFD"
            strokeWidth="3"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <motion.path
            variants={pathVariants}
            d="M63.7199 42.3H61.6533"
            stroke="#35CDFD"
            strokeWidth="3"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <motion.path
            variants={pathVariants}
            d="M57.52 42.3H45.1201"
            stroke="#35CDFD"
            strokeWidth="3"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <motion.path
            variants={pathVariants}
            d="M59.9378 37.1333H52.7045C51.5631 37.1333 50.8857 36.208 51.1916 35.0667L52.0222 31.9666C52.3281 30.8253 53.5012 29.9 54.6426 29.9H59.8093"
            stroke="#35CDFD"
            strokeWidth="3"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <motion.path
            variants={pathVariants}
            d="M38.1999 25.7668C38.1999 33.7564 31.723 40.2334 23.7332 40.2334C15.7435 40.2334 9.2666 33.7564 9.2666 25.7668C9.2666 17.7772 15.7435 11.3001 23.7332 11.3001C31.723 11.3001 38.1999 17.7772 38.1999 25.7668Z"
            stroke="#35CDFD"
            strokeWidth="3"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <motion.path
            variants={pathVariants}
            d="M25.8002 25.7669C25.8002 26.9082 24.875 27.8335 23.7336 27.8335C22.5922 27.8335 21.667 26.9082 21.667 25.7669C21.667 24.6255 22.5922 23.7002 23.7336 23.7002C24.875 23.7002 25.8002 24.6255 25.8002 25.7669Z"
            stroke="#35CDFD"
            strokeWidth="3"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <motion.path
            variants={pathVariants}
            d="M25.3477 24.1521L30.9664 18.5335"
            stroke="#35CDFD"
            strokeWidth="3"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <motion.path
            variants={pathVariants}
            d="M19.5996 29.9001L22.1829 27.3167"
            stroke="#35CDFD"
            strokeWidth="3"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <motion.path
            variants={pathVariants}
            d="M23.7334 15.4335V16.4668"
            stroke="#35CDFD"
            strokeWidth="3"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <motion.path
            variants={pathVariants}
            d="M23.7334 35.0668V36.1001"
            stroke="#35CDFD"
            strokeWidth="3"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <motion.path
            variants={pathVariants}
            d="M34.0665 25.7668H33.0332"
            stroke="#35CDFD"
            strokeWidth="3"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <motion.path
            variants={pathVariants}
            d="M14.4337 25.7668H13.4004"
            stroke="#35CDFD"
            strokeWidth="3"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <motion.path
            variants={pathVariants}
            d="M10.3001 39.2H-0.0332031"
            stroke="#35CDFD"
            strokeWidth="3"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <motion.path
            variants={pathVariants}
            d="M9.26641 43.3333H3.06641"
            stroke="#35CDFD"
            strokeWidth="3"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <motion.path
            variants={pathVariants}
            d="M8.23362 47.4666H6.16699"
            stroke="#35CDFD"
            strokeWidth="3"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_152_12524">
          <rect width="66" height="66" fill="white" />
        </clipPath>
      </defs>
    </motion.svg>
  );
};

export default FastDelivery;
