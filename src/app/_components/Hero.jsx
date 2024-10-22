"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { useEffect, useState } from "react";

const Hero = () => {
  const [videoSrc, setVideoSrc] = useState("");

  useEffect(() => {
    window.innerWidth < 760
      ? setVideoSrc("/assets/videos/smallHero.mp4")
      : setVideoSrc("/assets/videos/hero.mp4");
  }, []);

  function handleVideoSrcSet() {
    window.innerWidth < 760
      ? setVideoSrc("/assets/videos/smallHero.mp4")
      : setVideoSrc("/assets/videos/hero.mp4");
  }
  useEffect(() => {
    window.addEventListener("resize", handleVideoSrcSet);

    return () => {
      window.removeEventListener("resize", handleVideoSrcSet);
    };
  }, []);

  useGSAP(() => {
    gsap.to("#hero", { opacity: 1, delay: 2 });
    gsap.to("#cta", { opacity: 1, y: -50, delay: 2 });
  }, []);

  return (
    <div className="w-full flex-1 bg-black relative pt-10 sm:py-4 flex flex-col justify-between items-center">
      <p
        id="hero"
        className="font-semibold text-5xl md:text-3xl text-gray-400 opacity-0 text-center"
      >
        wePhone 7 pro
      </p>

      <div className="w-9/12 md:w-10/14">
        <video
          className="pointer-events-none"
          src={videoSrc}
          type="video/mp4"
          autoPlay
          muted
          playsInline={true}
          key={videoSrc}
        ></video>
      </div>

      <div id="cta" className="flex flex-col items-center opacity-0 ">
        <Link
          href="#highlights"
          className="text-white rounded-2xl py-3 px-5 bg-sky-500 mb-4"
        >
          Buy
        </Link>

        <p className="font-normal text-xl text-white">
          From $199/month or $899
        </p>
      </div>
    </div>
  );
};

export default Hero;
