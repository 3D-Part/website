import { useEffect, useRef } from "react";

function useOutsideAlerter(ref, outsideClickHandler) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        outsideClickHandler();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [outsideClickHandler, ref]);
}

/**
 * Component that alerts if you click outside of it
 */
function OutsideAlerter({ children, outsideClickHandler }) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, outsideClickHandler);

  return <div ref={wrapperRef}>{children}</div>;
}

export default OutsideAlerter;
