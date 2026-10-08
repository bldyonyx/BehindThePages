
function SlideNavigation({
  currentSlide,
  totalSlides,
  onPrevious,
  onNext,
}) {
  const isFirst = currentSlide === 0;
  const isLast = currentSlide === totalSlides - 1;

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

      <div className="flex items-center gap-2 text-sm tracking-widest">
        <span className="font-bold text-lime">
          {String(currentSlide + 1).padStart(2, "0")}
        </span>

        <span className="text-parchment/40">/</span>

        <span className="text-parchment/60">
          {String(totalSlides).padStart(2, "0")}
        </span>
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
