
function ContentSlide({ slide }) {
  return (
    <div className="space-y-9">
      <div className="space-y-4">
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

      <div className="grid gap-4 sm:grid-cols-2">
        {slide.points?.map((point, index) => (
          <div
            key={`${index}-${point}`}
            className="flex min-h-28 items-center gap-4 rounded-2xl border border-parchment/15 bg-walnut/65 p-6"
          >
            <span
              aria-hidden="true"
              className="h-2.5 w-2.5 shrink-0 rounded-full bg-lime"
            />

            <p className="text-base leading-relaxed text-mintcream sm:text-lg">
              {point}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContentSlide;
