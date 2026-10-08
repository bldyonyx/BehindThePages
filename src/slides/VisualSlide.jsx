
function VisualSlide({ slide }) {
  return (
    <div className="space-y-7">
      <div className="space-y-3">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-lime sm:text-sm">
          {slide.section}
        </p>

        <h2 className="font-heading text-5xl font-medium leading-tight text-mintcream sm:text-7xl">
          {slide.title}
        </h2>

        <p className="text-base text-parchment/70 sm:text-xl">
          {slide.subtitle}
        </p>
      </div>

      <div className="flex min-h-64 items-center justify-center overflow-hidden rounded-3xl border border-parchment/20 bg-walnut/55 p-4 sm:min-h-80 sm:p-7">
        {slide.image ? (
          <div className="flex w-full items-center justify-center rounded-2xl bg-parchment p-3 sm:p-5">
            <img
              src={slide.image}
              alt={slide.title}
              className="max-h-[48vh] max-w-full object-contain"
            />
          </div>
        ) : (
          <div className="space-y-4 py-10 text-center">
            <div
              aria-hidden="true"
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-lime/10 text-2xl text-lime"
            >
              ♡
            </div>

            <p className="mx-auto max-w-xl text-base leading-relaxed text-parchment sm:text-lg">
              {slide.description}
            </p>

            <p className="text-xs uppercase tracking-widest text-parchment/45">
              Visuel à ajouter
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default VisualSlide;
