import Coupon from "@/app/profile-details/coupons/Coupon";
import { CouponType } from "@/shared/types";
import React, { FC } from "react";

const UsedCoupons: FC<{ coupons: CouponType[] }> = ({ coupons }) => {
  return (
    <div className="flex flex-col gap-3">
      {coupons.map((coupon) => {
        return (
          <Coupon
            active={!coupon?.userPromotionCode[0].isRedeemed}
            percent={Number(coupon.discountPercentage)}
            key={coupon.id}
          >
            {coupon.code}
          </Coupon>
        );
      })}
    </div>
  );
};

export default UsedCoupons;
