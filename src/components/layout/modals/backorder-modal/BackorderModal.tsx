"use client";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Button from "@/components/common/button/Button";
import Heading6 from "@/components/common/text/heading/Heading6";
import Paragraph from "@/components/common/text/paragraph/Paragraph";

type BackorderModalProps = {
  isOpen: boolean;
  productName: string;
  stock: number;
  requested: number;
  // made to order: procured from the supplier; otherwise the goods are on their way
  byOrder?: boolean;
  onConfirm: () => void;
  onClose: () => void;
};

const BackorderModal: React.FC<BackorderModalProps> = ({
  isOpen,
  productName,
  stock,
  requested,
  byOrder = false,
  onConfirm,
  onClose,
}) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  const missing = requested - stock;

  // Rendered in a portal because product cards sit inside a <Link>; clicks are
  // stopped here so they never reach it
  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen && (
        <div
          className="fixed top-0 left-0 z-[400] flex items-center justify-center w-full h-full"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 w-full h-full bg-[rgba(17,17,17,0.78)] cursor-pointer min-w-[360px]"
            onClick={onClose}
          ></motion.div>
          <motion.div
            initial={{ top: -500, opacity: 0 }}
            animate={{ top: 0, opacity: 1 }}
            exit={{ top: 500, opacity: 0, transition: { duration: 0.2 } }}
            transition={{
              type: "spring",
              stiffness: 140,
              duration: 0.4,
              damping: 16,
            }}
            className="relative bg-[#1D1D1D] rounded-2xl max-w-[425px] min-w-[300px] mx-8 flex flex-col gap-4 w-[425px] p-6"
          >
            <Heading6>
              {stock > 0
                ? byOrder
                  ? "Dio količine je po narudžbi"
                  : "Nema dovoljno proizvoda na stanju"
                : byOrder
                ? "Po narudžbi"
                : "Proizvod trenutno nije na stanju"}
            </Heading6>
            <Paragraph size="M" weight="Regular" className="text-neutral-200">
              {stock > 0
                ? byOrder
                  ? `Od proizvoda „${productName}" na stanju je ${stock} kom. Preostalih ${missing} kom nabavićemo od dobavljača, pa će isporuka trajati duže.`
                  : `Od proizvoda „${productName}" na stanju je ${stock} kom. Preostalih ${missing} kom možete naručiti, a poslaćemo ih čim roba stigne.`
                : byOrder
                ? `Proizvod „${productName}" je po narudžbi: nabavićemo ga od dobavljača, pa će isporuka trajati duže.`
                : `Proizvod „${productName}" trenutno nemamo na stanju. Možete ga naručiti, a poslaćemo ga čim roba stigne.`}
            </Paragraph>
            <div className="flex flex-wrap gap-3 mt-2">
              <Button
                type="primary"
                size="M"
                className="flex-1 h-10"
                onClick={onConfirm}
              >
                Naruči svejedno
              </Button>
              <Button
                type="secondary"
                size="M"
                className="flex-1 h-10"
                onClick={onClose}
              >
                Odustani
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default BackorderModal;
