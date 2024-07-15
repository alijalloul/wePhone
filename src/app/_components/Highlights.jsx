"use client";

import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap";
import Image from "next/image";
import React, { useEffect } from "react";
import VideoCarousel from "./VideoCarousel";

gsap.registerPlugin(ScrollTrigger);

const Highlights = () => {
  useEffect(() => {
    ScrollTrigger.create({
      trigger: "#highlights",
      start: "top center",
      end: "bottom center",
      onEnter: () => {
        gsap.to("#title", { opacity: 1, y: 0 });
        gsap.to(".link", { opacity: 1, y: 0, duration: 1, stagger: 0.25 });
      },
    });

    // Refresh ScrollTrigger after setup
    ScrollTrigger.refresh();

    // Optionally, you can also add a resize listener to refresh ScrollTrigger on window resize
    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      id="highlights"
      className="overflow-hidden pt-5 pb-20 px-20 sm:pt-10  sm:px-10 bg-[#191919]"
    >
      <div className="mb-12 w-full sm:block flex items-end justify-between">
        <h1
          id="title"
          className="text-gray-400 text-6xl opacity-0 font-medium translate-y-20 md:text-5xl sm:text-3xl sm:mb-2"
        >
          Get the hightlights.
        </h1>

        <div className="flex flex-wrap items-end gap-5">
          <WatchLink text="Watch the film" imgSrc="/assets/images/watch.svg" />
          <WatchLink
            text="Watch the evenets"
            imgSrc="/assets/images/right.svg"
          />
        </div>
      </div>

      <VideoCarousel />
    </div>
  );
};

const WatchLink = ({ text, imgSrc }) => {
  return (
    <p className="link opacity-0 flex-center translate-y-20 text-blue-500 gap-2 text-sm">
      {text} <Image src={imgSrc} alt="right" width={16} height={16} />
    </p>
  );
};
export default Highlights;
