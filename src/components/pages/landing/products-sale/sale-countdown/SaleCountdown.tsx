import React, { useEffect, useState } from "react";
import moment from "moment";
import Paragraph from "@/components/common/text/paragraph/Paragraph";
import { motion } from "framer-motion";

const SaleCountdown: React.FC<{ date: string }> = ({ date }) => {
  const calculateCountdown = () => {
    const now = moment();
    const targetDate = moment.utc(date);

    const diff = targetDate.diff(now);

    const duration = moment.duration(diff);

    const days = Math.floor(duration.asDays());
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    return {
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  };

  const [countdown, setCountdown] = useState(calculateCountdown());

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(calculateCountdown());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
          <TimeBox text={"Dan"} time={countdown.days} />
          <TimeBox text={"Čas"} time={countdown.hours} />
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
