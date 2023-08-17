"use client";
import Image from "next/image";
import React from "react";

const ContactUsImage = () => {

  return (
    <div className="mb-20 md:mb-0 md:w-1/2 ">
      <div
        // initial="hidden"
        // whileInView="visible"
        // viewport={{ once: true }}
        // transition={{ duration: 0.5 }}
        // variants={{
        //   visible: { opacity: 1, x: 0 },
        //   hidden: { opacity: 0, x: -100 },
        // }}
        className="relative w-auto h-0 pb-[59.407407407%] "
      >
        <Image
          src={"/assets/img/contact-us.png"}
          alt="3D machine printing"
          fill
        />
      </div>
    </div>
  );
};

export default ContactUsImage;
