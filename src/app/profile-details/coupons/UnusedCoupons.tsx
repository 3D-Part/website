import Coupon from "@/app/profile-details/coupons/Coupon";
import React from "react";

const UnusedCoupons = () => {
  return (
    <div className="flex flex-col gap-3">
      <Coupon active={true} percent={10}>
        asafasf dsgs d gsaf sdg dssad asd sad sa d
      </Coupon>

      <Coupon active={true} percent={15}>
        asafasf dsgs d gsdgasd sad sa d
      </Coupon>
    </div>
  );
};

export default UnusedCoupons;
