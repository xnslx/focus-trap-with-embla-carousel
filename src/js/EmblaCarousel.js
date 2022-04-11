import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo
} from "react";
import ReactDOM from "react-dom";
import { PrevButton, NextButton } from "./EmblaCarouselButtons";
import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import FocusTrap from "focus-trap-react";
import Frame from "react-frame-component";
import Plyr from "plyr-react";
import "plyr-react/dist/plyr.css";
import { motion } from "framer-motion";

import { useNestedEmblaCarousel } from "./useNestedEmblaCarousel";
import "../css/embla.css";
import { List } from "../media/index";
import BackgroundColorComponent from "./BackgroundColorComponent";

const NestedCarousel = ({ slides, setLockParentScroll }) => {
  const [viewportRef, embla] = useEmblaCarousel(
    {
      axis: "y",
      skipSnaps: false
    },
    [WheelGesturesPlugin({ forceWheelAxis: "y" })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [scrollSnaps, setScrollSnaps] = useState([]);
  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap());
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla, setSelectedIndex]);

  const scrollTo = useCallback(
    (index) => {
      embla && embla.scrollTo(index);
    },
    [embla]
  );

  useEffect(() => {
    if (!embla) return;
    onSelect();
    setScrollSnaps(embla.scrollSnapList());
    embla.on("select", onSelect);
  }, [embla, onSelect, setScrollSnaps]);
  console.log("selectedIndex", selectedIndex);

  return (
    <>
      <div className="embla__nested">
        <div className="embla__viewport" ref={viewportRef}>
          <div className="embla__container__nested">
            {slides.map((s, index) => {
              console.log("47", s);
              return <VariedTypeCarousel s={s} key={index} />;
            })}
          </div>
        </div>
      </div>
      <div className="embla__dots">
        {scrollSnaps.map((_, index) => {
          console.log("index", index);
          return (
            <DotButton
              key={index}
              selected={index === selectedIndex}
              onClick={() => scrollTo(index)}
            />
          );
        })}
      </div>
    </>
  );
};

const VariedTypeCarousel = ({ s, key }) => {
  // const videoSrc = {
  //   controls: ["play", "fullscreen"],
  //   type: "video",
  //   sources: [
  //     {
  //       src: "https://player.vimeo.com/video/613922369",
  //       provider: "vimeo",
  //       type: "video/mp4"
  //     }
  //   ]
  // };

  switch (s.type) {
    case "image":
      return (
        <div className="embla__slide__nested" key={key}>
          <div className="embla__slide__inner__nested">
            <img
              className="embla__slide__img__nested"
              src={s.media}
              alt="A cool cat."
            />
          </div>
        </div>
      );
    case "video":
      return (
        // <div>
        //   {/* <Plyr source={videoSrc} /> */}
        //   <Plyr
        //     source={{
        //       type: "video",
        //       sources: [
        //         {
        //           src: "aqz-KE-bpKQ",
        //           provider: "youtube"
        //         }
        //       ]
        //     }}
        //   />
        // </div>
        <iframe
          src="https://player.vimeo.com/video/613922369?h=0d8ebdc340&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
          frameborder="0"
          style={{
            height: "100vw",
            minWidth: "150vh"
          }}
          allow="autoplay; fullscreen; picture-in-picture"
          allowfullscreen
          title="Untitled.mp4"
        ></iframe>
      );
    default:
      return null;
  }
};

const EmblaCarousel = () => {
  const [viewportRef, embla] = useEmblaCarousel(
    {
      axis: "x",
      skipSnaps: false
    },
    [WheelGesturesPlugin({ forceWheelAxis: "x" })]
  );
  const setLockParentScroll = useNestedEmblaCarousel(embla);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
  const onSelect = useCallback(() => {
    if (!embla) return;
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    embla.on("select", onSelect);
    onSelect();
  }, [embla, onSelect]);

  return (
    <>
      <div className="embla">
        <div className="embla__viewport" ref={viewportRef}>
          <div className="embla__container">
            {List.map((s, index) => {
              console.log("s", Object.values(s));
              return Object.values(s).map((j, index) => {
                console.log("j", j);
                return (
                  <div className="embla__slide" key={index}>
                    <div>
                      {Object.keys(s).map((i, index) => {
                        return <span key={index}>{i}</span>;
                      })}
                    </div>
                    <div>
                      <NestedCarousel
                        slides={j}
                        setLockParentScroll={setLockParentScroll}
                      />
                    </div>
                  </div>
                );
              });
            })}
          </div>
        </div>
        <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
        <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
      </div>
    </>
  );
};

export const DotButton = ({ selected, onClick }) => {
  console.log("selected", selected);
  return (
    <button
      className={`embla__dot ${selected ? "is-selected" : ""}`}
      type="button"
      onClick={onClick}
    />
  );
};

export default EmblaCarousel;
