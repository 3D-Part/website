"use client";
import Paragraph from "@/components/common/text/paragraph/Paragraph";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const SaleCountdown: React.FC<{ date: string }> = ({ date }) => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = moment.utc(date); // Replace with your target date
    const interval = setInterval(() => {
      const now = moment();
      const diff = targetDate.diff(now);
      const duration = moment.duration(diff);
      const remainingTime = {
        days: duration.days(),
        hours: duration.hours(),
        minutes: duration.minutes(),
        seconds: duration.seconds(),
      };
      setCountdown(remainingTime);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [date]);

  return (
    <>
      {(countdown.hours > 0 ||
        countdown.days > 0 ||
        countdown.minutes > 0 ||
        countdown.seconds > 0) && (
        <motion.div
          className="flex gap-1"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <TimeBox text={"Čas"} time={countdown.hours + countdown.days * 24} />
          <TimeBox text={"Min"} time={countdown.minutes} />
          <TimeBox text={"Sek"} time={countdown.seconds} />
        </motion.div>
      )}
    </>
  );
};

const TimeBox: React.FC<{ text: string; time: number }> = ({ text, time }) => {
  return (
    <div className="flex items-center gap-1 px-[6px] py-[2px] bg-[rgba(248,250,252,0.1)] rounded min-w-[56px] justify-center">
      <Paragraph size="M" weight="Regular">
        {time}
      </Paragraph>{" "}
      <Paragraph size="XS" weight="Regular" className="pt-1">
        {text}
      </Paragraph>{" "}
    </div>
  );
};

export default SaleCountdown;
