"use client";
import UnusedCoupons from "@/app/profile-details/coupons/UnusedCoupons";
import UsedCoupons from "@/app/profile-details/coupons/UsedCoupons";
import Container from "@/components/common/container/Container";
import Heading2 from "@/components/common/text/heading/Heading2";
import { couponsService } from "@/shared/services/couponsService";
import { Coupon } from "@/shared/types";
import { FC, useEffect, useState } from "react";

const Coupons: FC = () => {
  const [active, setActive] = useState(0);
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await couponsService.fetchCoupons();
        setCoupons(res.rows);
      } catch (error) {
        console.error(erorr);

        // TODO: DELETE
        setCoupons([
          {
            id: "4bf4f280-e24c-11ee-b7bc-2138ec596686",
            code: "aposdk aposdm apsodm",
            discountPercentage: "20",
            startsAt: "2024-03-14T22:46:00.000Z",
            endsAt: "2024-03-22T22:46:00.000Z",
            createdAt: "2024-03-14T21:46:21.480Z",
            updatedAt: "2024-03-14T21:46:21.480Z",
          },
        ]);
      }
    };
  }, []);

  return (
    <div className="w-full">
      <Container className="flex flex-col items-center min-h-screen gap-8 py-6 bg-neutral-900 px-9 lg:items-start ">
        <Heading2 className="">Promo kodovi</Heading2>
        {/* ------------------------------------------------------------- */}
        <div className="flex items-center gap-3 p-2 text-2xl font-semibold rounded-lg bg-neutral-800 font-exo2">
          <div
            className={`px-4 py-2 rounded cursor-pointer hover:bg-neutral-500 transition-all duration-200 ${
              active === 0 ? "bg-neutral-600" : ""
            }`}
            onClick={() => {
              setActive(0);
            }}
          >
            Neiskorišteni
          </div>
          <div
            className={`px-4 py-2 rounded cursor-pointer hover:bg-neutral-500 transition-all duration-200 ${
              active === 1 ? "bg-neutral-600" : ""
            }`}
            onClick={() => {
              setActive(1);
            }}
          >
            Iskorišteni
          </div>
        </div>
        {/* ------------------------------------------------------------- */}

        <div>{active === 1 ? <UsedCoupons /> : <UnusedCoupons />}</div>
      </Container>
    </div>
  );
};

export default Coupons;
