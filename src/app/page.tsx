"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef, useState } from "react";

// Assets
import aboutImg from "@/assets/carousel/about.jpg";
import caseStudyImg from "@/assets/carousel/case_study.jpg";
import processImg from "@/assets/carousel/process.jpg";
import projectsImg from "@/assets/carousel/projects.jpg";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const carousel = [
    { title: "about", src: aboutImg },
    { title: "process", src: processImg },
    { title: "projects", src: projectsImg },
    { title: "case studies", src: caseStudyImg },
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const wrapperRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const track = trackRef.current;

      if (!track) {
        return;
      }

      const lastCard = track.lastElementChild as HTMLElement;

      if (!lastCard) {
        return;
      }

      const scrollDistance = lastCard.offsetLeft;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          pin: true,
          scrub: 1,
          end: "+=3000",
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const nextIndex = Math.round(self.progress * (carousel.length - 1));

            setActiveIndex(nextIndex);
          },
        },
      });

      tl.to(
        track,
        {
          x: -scrollDistance,
          ease: "none",
        },
        0
      );

      const parallaxImages = gsap.utils.toArray("[data-parallax]", track);
      tl.to(
        parallaxImages,
        {
          xPercent: 10,
          ease: "none",
        },
        0
      );
    },
    { scope: wrapperRef }
  );

  return (
    <main
      ref={wrapperRef}
      className="relative min-h-screen overflow-hidden bg-bg-screen"
    >
      <div className="pointer-events-none fixed inset-0 z-50 flex h-full w-full p-10">
        <div className="flex h-full w-full flex-col justify-between">
          <div className="flex items-start justify-between">

            {/* Header */}
            <div className="flex flex-col">
              <h1 className="font-heading text-h4 text-text-primary">
                tayshaun
              </h1>
              <p className="font-heading text-h5 text-text-caption">
                ( developer / designer )
              </p>
            </div>

            {/* Links */}
            <div className="flex flex-col items-end gap-2 text-right">
              <a
                className="pointer-events-auto font-heading text-h5 text-text-primary"
                href="mailto:tayshaunds25@gmail.com"
              >
                [email]
              </a>
              <a
                className="pointer-events-auto font-heading text-h5 text-text-primary"
                href="https://www.linkedin.com/in/tayshaunds/"
                target="_blank"
                rel="noreferrer"
              >
                [linkedin]
              </a>
              <a
                className="pointer-events-auto font-heading text-h5 text-text-primary"
                href="https://github.com/tayds25"
                target="_blank"
                rel="noreferrer"
              >
                [github]
              </a>
            </div>
          </div>

          {/* Carousel Paginator */}
          <div className="flex items-end">
            <div className="flex items-end gap-2">
              {carousel.map((item, index) => (
                <div
                  key={item.title}
                  className={`w-2 rounded-full transition-[height] duration-300 ease-out ${
                    index === activeIndex
                      ? "h-8 bg-text-primary"
                      : "h-4 bg-text-caption"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div className="absolute top-1/2 left-1/2 -translate-x-37.5 -translate-y-20 rotate-20">
        <div ref={trackRef} className="relative flex w-max flex-row gap-10">
          {carousel.map((item, index) => (
            <div
              key={item.title}
              className={`group flex w-75 shrink-0 flex-col gap-4 ${
                index % 2 !== 0 ? "mt-32" : ""
              }`}
            >
              <p className="font-body text-h5 text-text-caption opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                (0{index + 1})
              </p>

              <div className="cursor-pointer relative h-112.5 w-full shrink-0 overflow-hidden bg-ds-accent/20">
                <div
                  data-parallax
                  className="absolute top-0 left-[-15%] h-full w-[130%]"
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover grayscale transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                  />
                </div>
              </div>

              <p className="font-body text-h4 text-text-primary opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}