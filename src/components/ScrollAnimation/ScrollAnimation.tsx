// credits: https://betterprogramming.pub/simple-react-scroll-animations-with-zero-dependencies-b496c1e1c7bd
import { useState, useEffect, useRef } from "react";

const useElementOnScreen = (
  ref: React.RefObject<Element | null>,
  rootMargin = "0px"
) => {
  const [isIntersecting, setIsIntersecting] = useState(true);

  useEffect(() => {
    if (!ref.current) return;

    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { rootMargin }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return isIntersecting;
};


const AnimateIn: React.FC<
React.PropsWithChildren<{ from: React.CSSProperties; to: React.CSSProperties }>
> = ({ from, to, children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useElementOnScreen(ref);
  const defaultStyles: React.CSSProperties = {
    transition: "600ms ease-in-out"
  };
  return (
    <div
      ref={ref}
      style={
        onScreen
          ? {
              ...defaultStyles,
              ...to
            }
          : {
              ...defaultStyles,
              ...from
            }
      }
    >
      {children}
    </div>
  );
};

const FadeUp: React.FC<React.PropsWithChildren> = ({ children }) => (
  <AnimateIn
    from={{ opacity: 0, translate: "0 2rem" }}
    to={{ opacity: 1, translate: "none" }}
  >
    {children}
  </AnimateIn>
);

const FadeDown: React.FC<React.PropsWithChildren> = ({ children }) => (
  <AnimateIn
    from={{ opacity: 0, translate: "none" }}
    to={{ opacity: 1, translate: "0 2rem" }}
  >
    {children}
  </AnimateIn>
);

const FadeIn: React.FC<React.PropsWithChildren> = ({ children }) => (
    <AnimateIn from={{ opacity: 0 }} to={{ opacity: 1 }}>
      {children}
    </AnimateIn>
  );

export const Animate = {
  FadeUp,
  FadeDown,
  FadeIn
};
