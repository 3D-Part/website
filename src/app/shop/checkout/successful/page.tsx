"use client";

import Button from "@/components/common/button/Button";
import Heading3 from "@/components/common/text/heading/Heading3";
import Paragraph from "@/components/common/text/paragraph/Paragraph";
import { useAppSelector } from "@/redux/hooks";
import { successfulOrderSelector } from "@/redux/slices/cart/cartSelectors";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect } from "react";

const Successful = () => {
  const router = useRouter();
  const data = useAppSelector(successfulOrderSelector);

  useEffect(() => {
    if (!data) {
      router.push("/");
    }
  }, []);

  return (
    <main className="min-h-screen px-4">
      <motion.div
        className="pt-[68px] pb-8  mx-auto w-full max-w-[588px] flex flex-col justify-center items-center h-full"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="w-[164px] h-[164px] animate-pulse">
          <Image
            alt="failed"
            src={"/assets/img/successful.svg"}
            width={164}
            height={164}
            className=""
          />
        </div>
        <Heading3 className="text-center">Hvala na narudžbi!</Heading3>
        <Paragraph size="L" weight="Regular" className="mt-3 text-center">
          Potvrda o narudžbi je poslata na mail {data?.email}
        </Paragraph>

        <div className="grid grid-cols-[60%40%] gap-2 rounded-2xl mt-9 w-full overflow-hidden">
          <div className="flex text-lg font-bold text-white bg-neutral-700 px-4 py-[21px]">
            Broj narudžbe #
          </div>
          <div className="flex text-lg font-bold text-white bg-neutral-700 px-4 py-[21px]">
            {data?.orderNumber}
          </div>

          <div className="flex text-lg font-normal text-white bg-neutral-700 px-4 py-[21px]">
            Kupljeni proizvodi {`(${data?.products.length})`}
          </div>
          <div className="flex text-lg font-normal text-white bg-neutral-700 px-4 py-[21px]">
            <span className={data?.discount ? "line-through" : ""}>
              {" "}
              {data?.price} KM
            </span>{" "}
            {data?.discount && (
              <span className="ml-1">
                {" "}
                {data?.price - data?.price * (data.discount / 100)} KM
              </span>
            )}
          </div>

          <div className="flex text-lg font-normal text-white bg-neutral-700 px-4 py-[21px]">
            Poštarina
          </div>
          <div className="flex text-lg font-normal text-white bg-neutral-700 px-4 py-[21px]">
            {data?.shippingPrice} KM
          </div>

          <div className="flex text-lg font-bold text-white bg-neutral-700 px-4 py-[21px]">
            UKUPNO
          </div>
          <div className="flex text-lg font-bold text-white bg-neutral-700 px-4 py-[21px]">
            {Number(data?.total)} KM
          </div>
        </div>

        <Button
          onClick={() => {
            router.push("/");
          }}
          type="primary"
          size="L"
          className="w-full mt-16"
        >
          <Paragraph size="M" weight="Bold">
            Vrati se na sajt
          </Paragraph>
        </Button>
      </motion.div>
    </main>
  );
};

export default Successful;
