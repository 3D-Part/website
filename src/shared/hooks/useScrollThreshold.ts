import { useState, useEffect } from "react";

const useScrollThreshold = (threshold: number) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY || window.pageYOffset;
      if (scrollPosition >= threshold) {
        setScrolled(true);
      } else if (scrollPosition === 0) {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold, scrolled]);

  return scrolled;
};

export default useScrollThreshold;
