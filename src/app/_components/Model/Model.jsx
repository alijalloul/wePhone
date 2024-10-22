"use client";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Suspense, useEffect, useRef, useState } from "react";

import { models, sizes } from "@/constants";
import { animateWithGsapTimeline } from "@/utils/animations";
import { OrbitControls, PerspectiveCamera, View } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

import IPhoneMesh from "./_components/IPhoneMesh";
import Lights from "./_components/Lights";
import Loader from "./_components/Loader";

gsap.registerPlugin(ScrollTrigger);

const Model = () => {
  const [size, setSize] = useState("small");
  const [model, setModel] = useState({
    title: "wePhone 7 Pro in Natural Titanium",
    color: ["#8F8A81", "#FFE7B9", "#6F6C64"],
    img: "/assets/images/yellow.jpg",
  });

  const cameraControlSmall = useRef();
  const cameraControlLarge = useRef();

  const small = useRef(new THREE.Group());
  const large = useRef(new THREE.Group());

  const [smallRotation, setSmallRotation] = useState(0);
  const [largeRotation, setLargeRotation] = useState(0);

  const tl = gsap.timeline();

  const canvasContainerRef = useRef(null);
  const [canvasElement, setCanvasElement] = useState("");

  useEffect(() => {
    if (canvasContainerRef.current) {
      // Accessing document is safe here
      setCanvasElement(document.getElementById("meshContainer"));
      // Further operations if needed
    }
  }, []);

  useEffect(() => {
    if (size === "large") {
      animateWithGsapTimeline(tl, small, smallRotation, "#view1", "#view2", {
        transform: "translateX(-100%)",
        duration: 2,
      });
    }

    if (size === "small") {
      animateWithGsapTimeline(tl, large, largeRotation, "#view2", "#view1", {
        transform: "translateX(0)",
        duration: 2,
      });
    }
  }, [size]);

  useEffect(() => {
    ScrollTrigger.create({
      trigger: "#meshContainer",
      start: "top center",
      end: "bottom center",
      onEnter: () => {
        gsap.to("#heading", { y: 0, opacity: 1, duration: 1 });
        gsap.to("#caption", { y: 0, opacity: 0.7, duration: 1 });
        gsap.to("#notEaten", { opacity: 0.7, duration: 3 });
      },
    });
  }, []);

  return (
    <div
      ref={canvasContainerRef}
      id="meshContainer"
      className="sm:py-10 py-14 sm:px-10 px-5 bg-black "
    >
      <h1
        id="heading"
        className="text-gray-200 lg:text-6xl md:text-5xl text-3xl font-medium opacity-0 translate-y-20"
      >
        Take a closer look.
      </h1>
      <h5
        id="caption"
        className="text-gray-200 lg:text-xl md:text-lg text-base lg:mb-0 mb-2 opacity-0 translate-y-20"
      >
        You can rotate the wePhone by dragging and moving the left click
      </h5>

      <div className="flex flex-col items-center mt-5">
        <div className="w-full h-[65vh] md:h-[80vh] overflow-hidden relative">
          <ModelView
            index={1}
            groupRef={small}
            gsapType="view1"
            controlRef={cameraControlSmall}
            setRotationState={setSmallRotation}
            item={model}
            size={size}
          />

          <ModelView
            index={2}
            groupRef={large}
            gsapType="view2"
            controlRef={cameraControlLarge}
            setRotationState={setLargeRotation}
            item={model}
            size={size}
          />

          <Canvas className="w-full h-full" eventSource={canvasElement}>
            <View.Port />
          </Canvas>

          <h1
            id="notEaten"
            className=" pointer-events-none text-8xl sm:text-4xl text-white absolute z-10 right-12 top-[50%] opacity-0"
          >
            Our Apple Is Not Eaten
          </h1>
        </div>

        <div className="mx-auto w-full">
          <p className="text-sm font-light text-center mb-5 text-gray-200">
            {model.title}
          </p>

          <div className="flex-center sm:flex-col">
            <ul className="flex items-center justify-center px-4 py-4 rounded-full bg-gray-700 backdrop-blur sm:mb-4">
              {models.map((item, i) => (
                <li
                  key={i}
                  className="w-6 h-6 rounded-full mx-2 cursor-pointer"
                  style={{ backgroundColor: item.color[0] }}
                  onClick={() => setModel(item)}
                />
              ))}
            </ul>

            <button className="flex items-center justify-center p-1 rounded-full bg-gray-700 backdrop-blur ml-3 gap-1">
              {sizes.map(({ label, value }) => (
                <span
                  key={label}
                  className="p-2 text-sm flex justify-center items-center bg-white text-black rounded-full transition-all"
                  style={{
                    backgroundColor: size === value ? "white" : "transparent",
                    color: size === value ? "black" : "white",
                  }}
                  onClick={() => setSize(value)}
                >
                  {label}
                </span>
              ))}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Model;

const ModelView = ({
  index,
  groupRef,
  gsapType,
  controlRef,
  setRotationState,
  size,
  item,
}) => {
  return (
    <View
      index={index}
      id={gsapType}
      className={`w-full h-full absolute ${index === 2 ? "right-[-100%]" : ""}`}
    >
      <ambientLight intensity={0.3} />

      <PerspectiveCamera makeDefault position={[0, 0, 4]} />

      <Lights />

      <group
        ref={groupRef}
        name={`${index === 1} ? 'small' : 'large`}
        position={[0, 0, 0]}
      >
        <Suspense fallback={<Loader />}>
          <IPhoneMesh
            scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
            item={item}
            size={size}
          />
        </Suspense>
      </group>

      <OrbitControls
        makeDefault
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        target={new THREE.Vector3(0, 0, 0)}
        onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())}
      />
    </View>
  );
};
