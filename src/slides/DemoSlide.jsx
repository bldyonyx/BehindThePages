
function DemoSlide({ slide }) {
  return (
    <div className="mx-auto max-w-4xl space-y-8 text-center">
      <p className="text-xs font-bold uppercase tracking-[0.3em] text-lime sm:text-sm">
        {slide.section}
      </p>

      <h2 className="font-heading text-6xl font-medium leading-tight text-mintcream sm:text-8xl">
        {slide.title}
      </h2>

      <p className="text-lg text-parchment sm:text-2xl">
        {slide.subtitle}
      </p>

      <p className="mx-auto max-w-2xl text-sm leading-relaxed text-parchment/70 sm:text-base">
        {slide.description}
      </p>

      <div className="flex flex-wrap justify-center gap-4 pt-4">
        {slide.links?.map((link, index) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={
              index === 0
                ? "rounded-full bg-lime px-7 py-4 text-sm font-bold text-darkwood transition-colors hover:bg-mintcream"
                : "rounded-full border border-parchment/30 bg-walnut/60 px-7 py-4 text-sm font-bold text-parchment transition-colors hover:bg-walnut"
            }
          >
            {link.label} ↗
          </a>
        ))}
      </div>
    </div>
  );
}

export default DemoSlide;
