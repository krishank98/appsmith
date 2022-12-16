import { useEffect, useRef, useState } from "react";
import React from "react";
import BaseWidget, { WidgetProps } from "./BaseWidget";
import { REQUEST_IDLE_CALLBACK_TIMEOUT } from "constants/AppConstants";

export function withLazyRender(Widget: typeof BaseWidget) {
  return function WrappedComponent(props: WidgetProps) {
    const [deferRender, setDeferRender] = useState(true);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (wrapperRef.current && deferRender) {
        const observer = new IntersectionObserver(
          (entries: IntersectionObserverEntry[]) => {
            if (!!entries.find((entry) => entry.isIntersecting)) {
              setDeferRender(false);
            } else {
              (window as any).requestIdleCallback(
                () => {
                  setDeferRender(false);
                },
                {
                  timeout: REQUEST_IDLE_CALLBACK_TIMEOUT,
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
