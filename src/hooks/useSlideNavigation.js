
import { useCallback, useEffect, useState } from "react";

function useSlideNavigation(totalSlides) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToSlide = useCallback(
    (index) => {
      setCurrentSlide(
        Math.max(0, Math.min(index, totalSlides - 1))
      );
    },
    [totalSlides]
  );

  const nextSlide = useCallback(() => {
    setCurrentSlide((previous) =>
      Math.min(previous + 1, totalSlides - 1)
    );
  }, [totalSlides]);

  const previousSlide = useCallback(() => {
    setCurrentSlide((previous) =>
      Math.max(previous - 1, 0)
    );
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const target = event.target;

      if (
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))
      ) {
        return;
      }

      if (event.altKey || event.ctrlKey || event.metaKey) {
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        nextSlide();
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        previousSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [nextSlide, previousSlide]);

  return {
    currentSlide,
    goToSlide,
    nextSlide,
    previousSlide,
  };
}

export default useSlideNavigation;
