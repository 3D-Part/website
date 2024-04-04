"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useAppSelector } from "@/redux/hooks";
import { isGlobalLoadingSelector } from "@/redux/slices/ui/uiSelectors";
import Spinner from "@/components/common/spinner/Spinner";

const SpinnerModal = () => {
  const isOpen = useAppSelector(isGlobalLoadingSelector);
  return (
    <>
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            className="fixed top-0 left-0 z-[9999] w-full h-full bg-[rgba(17,17,17,0.78)] cursor-pointer min-w-[360px] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Spinner />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SpinnerModal;
