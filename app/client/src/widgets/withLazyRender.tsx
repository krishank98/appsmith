import { useEffect, useRef, useState } from "react";
import React from "react";
import BaseWidget, { WidgetProps } from "./BaseWidget";

export function withLazyRender(Widget: typeof BaseWidget) {
  return function WrappedComponent(props: WidgetProps) {
    const [deferRender, setDeferRender] = useState(true);
    const wrapperRef = useRef<HTMLDivElement>(null);
    let observer: IntersectionObserver;
    useEffect(() => {
      if (wrapperRef.current && deferRender) {
        observer = new IntersectionObserver(
          (entries: IntersectionObserverEntry[]) => {
            if (!!entries.find((entry) => entry.isIntersecting)) {
              setDeferRender(false);
            } else {
              (window as any).requestIdleCallback(
                () => {
                  setDeferRender(false);
                },
                {
                  timeout: 1500,
                },
              );
            }

            wrapperRef.current && observer.unobserve(wrapperRef.current);
          },
          {
            root: null,
            threshold: 0,
          },
        );

        observer.observe(wrapperRef.current);
      } else {
        setDeferRender(false);
      }
    }, []);

    return (
      <Widget {...props} deferRender={deferRender} wrapperRef={wrapperRef} />
    );
  };
}
