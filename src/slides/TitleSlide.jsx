
function TitleSlide({ slide }) {
  return (
    <div className="mx-auto max-w-4xl space-y-7 text-center">
      <p className="text-xs font-bold uppercase tracking-[0.3em] text-lime sm:text-sm">
        {slide.section}
      </p>

      <div className="space-y-3">
        <h1 className="font-heading text-6xl font-medium leading-[1.05] tracking-tight text-mintcream sm:text-8xl">
          {slide.title}
          <span className="ml-3 text-lime">♡</span>
        </h1>

        <div className="mx-auto h-px w-24 bg-lime/60" />
      </div>

      <p className="text-lg text-parchment sm:text-2xl">
        {slide.subtitle}
      </p>

      <p className="mx-auto max-w-xl text-sm leading-relaxed text-parchment/65 sm:text-base">
        {slide.description}
      </p>
    </div>
  );
}

export default TitleSlide;
