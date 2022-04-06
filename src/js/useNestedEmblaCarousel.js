import { useState, useEffect, useCallback, useRef } from "react";

const noop = () => undefined;

export const useNestedEmblaCarousel = (embla) => {
  const [parentIsLocked, setParentIsLocked] = useState(false);
  const onPointerUp = useRef(noop);
  const lastLocation = useRef(0);

  const releaseParentScroll = useCallback(() => {
    if (!embla) return;
    onPointerUp.current = noop;
    const engine = embla.internalEngine();
    engine.animation.stop();
    engine.location.set(lastLocation.current);
    engine.target.set(engine.location);
    engine.scrollTo.distance(0, false);
    engine.translate.toggleActive(true);
  }, [embla]);

  const lockParentScroll = useCallback(() => {
    if (!embla) return;
    const engine = embla.internalEngine();
    engine.translate.toggleActive(false);
    lastLocation.current = engine.location.get();
    onPointerUp.current = releaseParentScroll;
  }, [embla, releaseParentScroll]);

  useEffect(() => {
    if (parentIsLocked) lockParentScroll();
  }, [parentIsLocked, lockParentScroll]);

  useEffect(() => {
    if (!embla) return;
    embla.on("pointerUp", () => onPointerUp.current());
    embla.on("pointerDown", () => embla.internalEngine().animation.start());
  }, [embla]);

  return setParentIsLocked;
};
