
import { useEffect, useState } from "react";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(() =>
    window.matchMedia("(max-width: 968px)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(max-width: 968px)"
    );

    const handleChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener(
        "change",
        handleChange
      );
    };
  }, []);

  return isMobile;
};

export default useIsMobile;
