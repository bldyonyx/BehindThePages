
import { BookOpen } from "lucide-react";

import { presentationData } from "../data/presentationData";
import useSlideNavigation from "../hooks/useSlideNavigation";

import Slide from "./Slide";
import SlideNavigation from "./SlideNavigation";

import TitleSlide from "../slides/TitleSlide";
import ContentSlide from "../slides/ContentSlide";
import VisualSlide from "../slides/VisualSlide";
import DemoSlide from "../slides/DemoSlide";

const slideComponents = {
  title: TitleSlide,
  content: ContentSlide,
  visual: VisualSlide,
  demo: DemoSlide,
};

function Presentation() {
  const {
    currentSlide,
    nextSlide,
    previousSlide,
  } = useSlideNavigation(presentationData.length);

  const slide = presentationData[currentSlide];
  const SlideContent = slideComponents[slide.type];

  return (
    <main className="flex min-h-screen flex-col bg-darkwood px-6 py-6 font-ui text-parchment sm:px-12 sm:py-8">
      <header className="flex items-center justify-between gap-4 border-b border-parchment/15 pb-5">
        <div className="flex items-center gap-3 text-[#EEF3E4]">
          <BookOpen
            aria-hidden="true"
            className="size-6 shrink-0 text-[#CDADAC]"
            strokeWidth={1.8}
          />

          <span className="whitespace-nowrap font-heading text-[28px] font-semibold leading-none tracking-[0.01em]">
            Dear Pages
          </span>
        </div>

        <span className="hidden text-xs text-parchment/60 sm:block">
          Behind the Pages — Dans les coulisses
        </span>
      </header>

      <Slide>
        <SlideContent slide={slide} />
      </Slide>

      <SlideNavigation
        currentSlide={currentSlide}
        totalSlides={presentationData.length}
        onPrevious={previousSlide}
        onNext={nextSlide}
      />
    </main>
  );
}

export default Presentation;
