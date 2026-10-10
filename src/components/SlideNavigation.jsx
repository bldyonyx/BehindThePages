
import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, List } from "lucide-react";

function SlideNavigation({
  currentSlide,
  totalSlides,
  slides,
  onPrevious,
  onNext,
  onGoToSlide,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const isFirst = currentSlide === 0;
  const isLast = currentSlide === totalSlides - 1;

  useEffect(() => {
    if (!isMenuOpen) return;

    const handlePointerDown = (event) => {
      if (!menuRef.current?.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen]);

  const handleSelectSlide = (index) => {
    onGoToSlide(index);
    setIsMenuOpen(false);
  };

  return (
    <nav
      aria-label="Navigation de la présentation"
      className="flex items-center justify-between gap-3 border-t border-parchment/15 pt-5"
    >
      <button
        type="button"
        onClick={onPrevious}
        disabled={isFirst}
        className="rounded-full border border-parchment/25 bg-walnut/40 px-4 py-3 text-xs font-bold text-parchment transition-colors hover:bg-walnut disabled:cursor-not-allowed disabled:opacity-30 sm:px-6 sm:text-sm"
      >
        ← Précédent
      </button>

      <div
        ref={menuRef}
        className="relative flex items-center justify-center"
      >
        <button
          type="button"
          onClick={() => setIsMenuOpen((previous) => !previous)}
          aria-expanded={isMenuOpen}
          aria-haspopup="true"
          aria-label="Choisir une slide"
          title="Accéder à une slide"
          className="flex items-center gap-2 rounded-full border border-parchment/20 bg-walnut/40 px-3 py-2.5 text-sm transition-colors hover:border-lime/50 hover:bg-walnut sm:px-4"
        >
          <List
            size={16}
            className="text-parchment/65"
            strokeWidth={1.8}
          />

          <span className="font-bold text-lime">
            {String(currentSlide + 1).padStart(2, "0")}
          </span>

          <span className="text-parchment/40">/</span>

          <span className="text-parchment/60">
            {String(totalSlides).padStart(2, "0")}
          </span>

          <ChevronDown
            size={14}
            className={`text-parchment/60 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isMenuOpen && (
          <div
            role="group"
            aria-label="Liste des slides"
            className="absolute bottom-full left-1/2 z-40 mb-3 max-h-[min(65vh,480px)] w-[min(320px,90vw)] -translate-x-1/2 overflow-y-auto rounded-2xl border border-parchment/20 bg-darkwood p-2 shadow-2xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <div className="border-b border-parchment/15 px-3 py-3">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-lime">
                Sommaire
              </p>

              <p className="mt-1 text-xs text-parchment/50">
                Accéder directement à une slide
              </p>
            </div>

            <div className="space-y-1 pt-2">
              {slides.map((slide, index) => {
                const isActive = index === currentSlide;

                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => handleSelectSlide(index)}
                    aria-current={isActive ? "step" : undefined}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                      isActive
                        ? "bg-lime/10 text-lime"
                        : "text-parchment/75 hover:bg-parchment/10 hover:text-mintcream"
                    }`}
                  >
                    <span
                      className={`w-6 shrink-0 font-mono text-xs ${
                        isActive
                          ? "text-lime"
                          : "text-parchment/40"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="min-w-0 flex-1">
                      {slide.navLabel}
                    </span>

                    {isActive && (
                      <Check
                        size={15}
                        className="shrink-0 text-lime"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={onNext}
        disabled={isLast}
        className="rounded-full bg-lime px-4 py-3 text-xs font-bold text-darkwood transition-colors hover:bg-mintcream disabled:cursor-not-allowed disabled:opacity-30 sm:px-6 sm:text-sm"
      >
        Suivant →
      </button>
    </nav>
  );
}

export default SlideNavigation;
