
function Slide({ children }) {
  return (
    <section className="relative z-10 flex min-h-0 flex-1 flex-col justify-center py-10 sm:py-14">
      <div className="mx-auto w-full max-w-6xl">
        {children}
      </div>
    </section>
  );
}

export default Slide;
