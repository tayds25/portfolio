"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ShutterOverlay from "@/components/ui/ShutterOverlay";

// Project Images
import gaitSlide1 from "@/assets/projects_page/gait_analysis/gait_2.png";
import gaitSlide2 from "@/assets/projects_page/gait_analysis/gait_3.png";
import gaitSlide3 from "@/assets/projects_page/gait_analysis/gait_1.png";

import cineSlide1 from "@/assets/projects_page/cineastes_choice/cineaste_1.png";
import cineSlide2 from "@/assets/projects_page/cineastes_choice/cineaste_2.png";
import cineSlide3 from "@/assets/projects_page/cineastes_choice/cineaste_3.png";

import pocSlide1 from "@/assets/projects_page/poc_cat_club/poc_1.png";
import pocSlide2 from "@/assets/projects_page/poc_cat_club/poc_2.png";
import pocSlide3 from "@/assets/projects_page/poc_cat_club/poc_3.png";

import offbeatSlide1 from "@/assets/projects_page/offbeat/offbeat_1.png";
import offbeatSlide2 from "@/assets/projects_page/offbeat/offbeat_2.png";
import offbeatSlide3 from "@/assets/projects_page/offbeat/offbeat_3.png";

const projects = [
  {
    id: "gait-analysis",
    title: "Gait Analysis System",
    category: "Systems Engineering",
    year: "2026",
    status: "Completed",
    completionDate: "May 2026",
    client: "University Thesis",
    role: "Full Stack / ML Integration",
    description: "Engineered a gait analysis system utilizing MediaPipe for precise anatomical landmark extraction, joint angles, and symmetry computation.",
    images: [
      gaitSlide1,
      gaitSlide2,
      gaitSlide3
    ],
    stack: ["Python", "MediaPipe", "OpenCV"],
    links: { github: "https://github.com/tayds25/Mediapipe-Gait-Analysis" }
  },
  {
    id: "cineastes-choice",
    title: "Cineaste's Choice",
    category: "Systems Engineering",
    year: "2025",
    status: "Completed",
    completionDate: "March 2025",
    client: "University Course Deliverable",
    role: "Design / Full Stack",
    description: "A Personalized Movie Recommendation Application that uses Google's Gemini API to suggest movies tailored to individual user preferences.",
    images: [
      cineSlide1,
      cineSlide2,
      cineSlide3
    ],
    stack: ["Python", "React", "Tailwind CSS", "Vite", "Flask", "SQLite", "Google Gemini API"],
    links: { github: "https://github.com/tayds25/CineastesChoice" }
  },
  {
    id: "poc-cat-club",
    title: "POC Cat Club Website",
    category: "Web Platform",
    year: "2025",
    status: "Completed",
    completionDate: "March 2025",
    client: "University Course Deliverable",
    role: "Design / Full Stack",
    description: "A website for the POC Cat Club, a non-profit organization that helps cats, designed and created as a course deliverable.",
    images: [
      pocSlide1,
      pocSlide2,
      pocSlide3
    ],
    stack: ["React", "Tailwind CSS", "Vite", "MongoDB", "Vercel"],
    links: { github: "https://github.com/tayds25/thepoccatclub" }
  },
  {
    id: "offbeat",
    title: "Offbeat",
    category: "Web Platform",
    year: "2025",
    status: "Completed",
    completionDate: "August 2025",
    client: "University Course Deliverable",
    role: "Design / Full Stack",
    description: "An e-commerce platform concept for Offbeat, a fictional fashion brand, designed and created as a course deliverable.",
    images: [
      offbeatSlide1,
      offbeatSlide2,
      offbeatSlide3
    ],
    stack: ["Angular", "TypeScript", "Node.js"],
    links: { github: "https://github.com/tayds25/offbeat" }
  },
  {
    id: "certified-by-tay",
    title: "certified by tay",
    category: "Web Platform",
    year: "2026",
    status: "Active",
    completionDate: "N/A",
    client: "Personal Project",
    role: "Creator & Developer",
    description: "Designed and developed a curated directory showcasing free design resources, typography, and useful tools and websites for all creatives.",
    images: [
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop"
    ],
    stack: ["Next.js", "React", "Tailwind CSS", "Drizzle ORM", "Figma"],
    links: { website: "https://certifiedbytay.com", github: "https://github.com/tayds25/certified-by-tay" }
  },
];

export default function Projects() {
  const router = useRouter();
  const shutterRef = useRef<HTMLDivElement | null>(null);

  // Section Refs
  const containerRef = useRef<HTMLElement | null>(null);
  const floatingImageRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const previewMetaRef = useRef<HTMLDivElement | null>(null);

  // Expanded Elements Refs
  const expandedTitleRef = useRef<HTMLDivElement | null>(null);
  const expandedThumbnailsRef = useRef<HTMLDivElement | null>(null);
  const expandedBottomMetaRef = useRef<HTMLDivElement | null>(null);

  // State & Tracking
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  const isExpanded = useRef(false);
  const mousePos = useRef({ x: 0, y: 0 });

  useGSAP(() => {
    // Shutter Entry
    if (shutterRef.current) {
      gsap.fromTo(shutterRef.current, { yPercent: 0 }, { yPercent: -100, duration: 0.6, ease: "power3.inOut" });
    }

    // Resilient Cursor Trailing
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (!isExpanded.current && floatingImageRef.current) {
        gsap.to(floatingImageRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.5,
          ease: "power3.out",
          overwrite: "auto"
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, { scope: containerRef });

  // Hover Preview
  const handleMouseEnter = (index: number) => {
    if (isExpanded.current) return;
    setHoveredIndex(index);
    gsap.to(floatingImageRef.current, { autoAlpha: 1, scale: 1, duration: 0.4, ease: "power3.out" });
  };

  const handleMouseLeave = () => {
    if (isExpanded.current) return;
    setHoveredIndex(null);
    gsap.to(floatingImageRef.current, { autoAlpha: 0, scale: 0.8, duration: 0.4, ease: "power3.in" });
  };

  // Preview Expand
  const handleProjectClick = (index: number) => {
    if (isExpanded.current) return;
    isExpanded.current = true;
    setClickedIndex(index);
    setActiveImageIndex(0);

    const tl = gsap.timeline();

    // List Fade Out
    tl.to(listRef.current, { x: -50, autoAlpha: 0, duration: 0.5, ease: "power3.inOut" }, 0)
      .to(previewMetaRef.current, { x: 50, autoAlpha: 0, duration: 0.5, ease: "power3.inOut" }, 0)

    // Morph Cursor Image
      .to(floatingImageRef.current, {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2 - 60,
        width: window.innerWidth >= 768 ? "45vw" : "90vw",
        height: window.innerWidth >= 768 ? "50vh" : "40vh",
        borderRadius: "4px",
        duration: 0.8,
        ease: "expo.inOut",
        overwrite: "auto"
      }, 0)

    // Layout Elements for Detailed View
      .fromTo(expandedTitleRef.current, { autoAlpha: 0, x: -30 }, { autoAlpha: 1, x: 0, duration: 0.6, ease: "power3.out" }, 0.4)
      .fromTo(expandedThumbnailsRef.current, { autoAlpha: 0, x: 30 }, { autoAlpha: 1, x: 0, duration: 0.6, ease: "power3.out" }, 0.4)
      .fromTo(expandedBottomMetaRef.current, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" }, 0.5);
  };

  // Transition Reverse for Back Button
  const handleBackClick = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        isExpanded.current = false;
        setClickedIndex(null);
        setActiveImageIndex(0);
        if (hoveredIndex === null) {
          gsap.to(floatingImageRef.current, { autoAlpha: 0, scale: 0.8, duration: 0.3 });
        }
      }
    });

    // Collapse Layout Elements
    tl.to([expandedTitleRef.current, expandedThumbnailsRef.current, expandedBottomMetaRef.current], { autoAlpha: 0, duration: 0.3 }, 0)

    // Shrink the Image back
      .to(floatingImageRef.current, {
        x: mousePos.current.x,
        y: mousePos.current.y,
        width: window.innerWidth >= 768 ? 400 : 300,
        height: window.innerWidth >= 768 ? 500 : 400,
        borderRadius: "16px",
        duration: 0.8,
        ease: "expo.inOut",
        overwrite: "auto"
      }, 0.1)

    // Fade In List
      .to(listRef.current, { x: 0, autoAlpha: 1, duration: 0.5, ease: "power3.out" }, 0.4)
      .to(previewMetaRef.current, { x: 0, autoAlpha: 1, duration: 0.5, ease: "power3.out" }, 0.4);
  };

  const handleBackToHome = () => {
    if (shutterRef.current) {
      gsap.fromTo(shutterRef.current, { yPercent: -100 }, { yPercent: 0, duration: 0.6, ease: "power3.inOut", onComplete: () => router.push("/") });
    }
  };

  const activeData = projects[clickedIndex ?? hoveredIndex ?? 0];

  return (
    <main ref={containerRef} className="relative flex h-screen w-full overflow-hidden bg-bg-screen">

      {/* Close Button */}
      <div className="absolute right-10 top-10 z-50 md:right-20 md:top-20">
        <button
          onClick={clickedIndex !== null ? handleBackClick : handleBackToHome}
          className="cursor-pointer font-body text-body-reg text-color-primary transition-colors hover:text-color-accent"
        >
          {clickedIndex !== null ? "back [x]" : "close [x]"}
        </button>
      </div>

      {/* Preview Floating Image */}
      <div
        ref={floatingImageRef}
        className="pointer-events-none fixed left-0 top-0 z-20 h-[400px] w-[300px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl opacity-0 md:h-[500px] md:w-[400px]"
      >
        {projects.map((project, pIndex) => (
          <div
            key={`img-group-${project.id}`}
            className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${
              (clickedIndex !== null ? clickedIndex === pIndex : hoveredIndex === pIndex) ? "opacity-100" : "opacity-0"
            }`}
          >
            {project.images.map((img, iIndex) => (
              <Image
                key={`${project.id}-hero-${iIndex}`}
                src={img}
                alt={`${project.title} slide ${iIndex}`}
                fill
                className={`object-cover transition-opacity duration-700 ease-in-out ${
                  activeImageIndex === iIndex ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Preview Mode */}
      <div className="relative z-10 flex h-full w-full flex-col md:flex-row pointer-events-none">

        {/* Left Side: Project List */}
        <div ref={listRef} className="flex h-full w-full flex-col justify-start pt-[15vh] md:pt-[20vh] pb-10 pl-10 md:w-1/2 md:pl-20 pointer-events-auto">
          <p className="mb-10 font-body text-body-reg text-color-accent shrink-0">selected works</p>
          <div
            className="flex flex-col overflow-y-auto overscroll-contain pb-32 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            data-lenis-prevent="true"
          >
            {projects.map((project, index) => (
              <div
                key={project.id}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleProjectClick(index)}
                className="group w-fit cursor-pointer py-6"
              >
                <div className={`flex items-baseline gap-6 transition-all duration-500 origin-left ${
                  hoveredIndex !== null && hoveredIndex !== index ? "opacity-20 scale-95" : "opacity-100 scale-100"
                }`}>
                  <span className="font-body text-body-sm text-color-accent tracking-widest">
                    {(index + 1).toString().padStart(2, "0")}
                  </span>
                  <h1 className="font-heading text-[clamp(2.5rem,5vw,6rem)] leading-none text-color-primary">
                    {project.title}
                  </h1>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Preview Metadata */}
        <div className="hidden h-full w-full items-center pr-20 md:flex md:w-1/2 md:pl-20">
          <div ref={previewMetaRef} className="absolute w-full max-w-md pointer-events-none">
            {projects.map((project, index) => (
              <div
                key={`meta-preview-${project.id}`}
                className={`absolute left-0 top-1/2 flex w-full -translate-y-1/2 flex-col gap-4 transition-all duration-500 ${
                  hoveredIndex === index && clickedIndex === null ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"
                }`}
              >
                <div className="flex gap-4 font-body text-body-sm text-color-primary">
                  <span>[ {project.year} ]</span><span className="uppercase">{project.category}</span>
                </div>
                <h3 className="font-heading text-h3 text-color-primary">{project.role}</h3>
                <p className="font-body text-body-reg text-color-accent line-clamp-3">{project.description}</p>

                {project.stack && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.stack.map((tech) => (
                      <span key={tech} className="rounded-full border border-color-accent/30 bg-color-accent/5 px-3 py-1 font-body text-body-xs text-color-primary">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                {project.links && (
                  <div className="flex gap-6 pt-2 font-body text-body-sm">
                    {project.links.website && (<span className="text-color-accent opacity-70">live site</span>)}
                    {project.links.github && (<span className="text-color-accent opacity-70">repository</span>)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Expanded Detail View */}

      {/* Left Anchor Title */}
      <div
        ref={expandedTitleRef}
        className="invisible opacity-0 absolute top-1/2 -translate-y-1/2 left-8 md:left-16 z-10 pointer-events-none"
      >
        <h1 className="font-heading text-[clamp(4rem,6vw,8rem)] leading-none text-color-primary uppercase whitespace-nowrap [writing-mode:vertical-rl] rotate-180">
          {activeData.title}
        </h1>
      </div>

      {/* Right Image Slides */}
      <div ref={expandedThumbnailsRef} className="invisible opacity-0 absolute top-1/2 right-10 md:right-20 -translate-y-1/2 flex flex-col gap-4 z-30 pointer-events-auto">
        {activeData.images.map((img, i) => (
          <button
            key={`thumb-${activeData.id}-${i}`}
            onClick={() => setActiveImageIndex(i)}
            className={`relative w-20 h-14 md:w-28 md:h-16 overflow-hidden rounded border border-color-accent/30 transition-all duration-300 cursor-pointer ${
              activeImageIndex === i ? "opacity-100 ring-1 ring-color-primary" : "opacity-40 hover:opacity-100"
            }`}
          >
            <Image src={img} alt={`Thumbnail ${i}`} fill className="object-cover" />
          </button>
        ))}
      </div>

      {/* Bottom Details Panel */}
      <div className="absolute bottom-8 md:bottom-12 left-0 w-full flex justify-center px-10 pointer-events-none z-30">
        <div ref={expandedBottomMetaRef} className="invisible opacity-0 w-full max-w-[90vw] md:max-w-[75vw] xl:max-w-[65vw] pointer-events-auto">

          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-10 items-start">

            {/* Metadata */}
            <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 font-body text-[10px] md:text-xs tracking-wide uppercase">
              <span className="text-color-accent">Status</span><span className="text-color-primary">{activeData.status}</span>
              <span className="text-color-accent">Date</span><span className="text-color-primary">{activeData.completionDate}</span>
              <span className="text-color-accent">Role</span><span className="text-color-primary">{activeData.role}</span>
              <span className="text-color-accent">Category</span><span className="text-color-primary">{activeData.category}</span>
              <span className="text-color-accent">Client</span><span className="text-color-primary">{activeData.client}</span>
              <span className="text-color-accent">Stack</span><span className="text-color-primary">{activeData.stack?.join(", ")}</span>
            </div>

            {/* Links */}
            <div className="flex flex-col items-center justify-start gap-4 font-body text-[10px] md:text-xs font-bold tracking-widest uppercase text-color-primary pt-1">
              {activeData.links?.website && (
                <a href={activeData.links.website} target="_blank" rel="noreferrer" className="group flex flex-col items-center gap-1 transition-opacity hover:opacity-70">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="stroke-currentColor transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 ml-auto mb-1">
                    <path d="M7 17L17 7M17 7H7M17 7V17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="border-b border-color-primary pb-[2px]">Live Platform</span>
                </a>
              )}
              {activeData.links?.github && (
                <a href={activeData.links.github} target="_blank" rel="noreferrer" className="group flex flex-col items-center gap-1 transition-opacity hover:opacity-70">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="stroke-currentColor transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 ml-auto mb-1">
                    <path d="M7 17L17 7M17 7H7M17 7V17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="border-b border-color-primary pb-[2px]">Repository</span>
                </a>
              )}
            </div>

            {/* Description */}
            <div className="font-body text-[10px] md:text-xs text-color-accent uppercase tracking-wide leading-relaxed max-w-[280px] md:ml-auto md:text-left pt-1">
              {activeData.description}
            </div>

          </div>
        </div>
      </div>

      <ShutterOverlay ref={shutterRef} />
    </main>
  );
}