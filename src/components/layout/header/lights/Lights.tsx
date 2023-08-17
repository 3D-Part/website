"use client";
import { useIsTablet } from "@/shared/hooks/useMediaQuerry";
import { motion } from "framer-motion";

const Lights = () => {
  const isTablet = useIsTablet();
  const blueAnimate = isTablet
    ? {
        x: [-200, -250, -300, -250, -150, -150, -150, -120, -200],
        y: [-200, 0, 100, -100, -50, 100, 0, -200],
      }
    : {
        x: [-200, -450, -350, -350, -300, -150, -150, -180, -200],
        y: [-200, 0, 100, -100, -50, 100, 0, -200],
      };

  const purpleAnimate = isTablet
    ? {
        x: [100, 100, 200, 150, 130, 0, 100, 170, 120, 190, 100],
        y: [100, 220, 180, 250, 360, 200, 220, 130, 100],
      }
    : {
        x: [100, 300, 250, 300, 230, 150, 200, 90, 190, 150, 100],
        y: [-100, 70, 200, -50, -30, 60, 130, -70, -100],
      };
  return (
    <div>
      <motion.div
        initial={{ x: -200, y: -200 }}
        animate={blueAnimate}
        transition={{ type: Infinity, duration: 25 }}
        className="fixed top-0 left-0 bg-[rgba(0,50,160,0.73)] lg:w-[745px] lg:h-[745px] z-[-1] blur-[100px] w-[410px] h-[410px] animate-[pulse_5s_ease-in-out_infinite]"
      ></motion.div>
      <motion.div
        initial={{ x: 100, y: 100 }}
        animate={purpleAnimate}
        transition={{ type: Infinity, duration: 30 }}
        className="fixed top-0 right-0 bg-[rgba(51,22,134,0.72)] lg:w-[745px] lg:h-[745px] z-[-1] blur-[100px] w-[410px] h-[410px] animate-[pulse_6s_ease-in-out_infinite] "
      ></motion.div>
    </div>
  );
};

export default Lights;
