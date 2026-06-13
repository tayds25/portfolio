"use client";

import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useGSAP } from "@gsap/react";
import ShutterOverlay from "@/components/ui/ShutterOverlay";

// Assets
import step1Svg from "@/assets/process_page/step_1.svg";
import step2Svg from "@/assets/process_page/step_2.svg";
import step3Svg from "@/assets/process_page/step_3.svg";
import mouseCursorSvg from "@/assets/process_page/mouse_cursor.svg";

// Plugins
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function Process() {
    const router = useRouter();
    const shutterRef = useRef<HTMLDivElement | null>(null);

    // Section Refs
    const containerRef = useRef<HTMLElement | null>(null);
    const pinSectionRef = useRef<HTMLElement | null>(null);
    const waypointsSectionRef = useRef<HTMLElement | null>(null);
    const cursorRef = useRef<HTMLDivElement | null>(null);
    const carouselRefs = useRef<(HTMLDivElement | null)[]>([]); // Ref array for carousels

    const steps = [
        { id: "plan", title: "Step 1: Plan" },
        { id: "design", title: "Step 2: Design" },
        { id: "code", title: "Step 3: Code" },
    ];

    useGSAP(
        () => {
        // Shutter Transition
        if (shutterRef.current) {
            gsap.fromTo(
            shutterRef.current,
            { yPercent: 0 },
            { yPercent: -100, duration: 0.6, ease: "power3.inOut" }
            );
        }

        // Lateral Pin Indicator Logic
        const listItems = gsap.utils.toArray<HTMLElement>(".step-item");
        const slides = gsap.utils.toArray<HTMLElement>(".step-slide");
        const fill = ".indicator-fill";

        if (pinSectionRef.current && listItems.length === 3 && slides.length === 3) {
            const pinTl = gsap.timeline({
            scrollTrigger: {
                trigger: pinSectionRef.current,
                start: "top top",
                end: "+=3000",
                pin: true,
                scrub: true,
            },
            });

            gsap.set(fill, { scaleY: 0.333, transformOrigin: "top left" });
            gsap.set(listItems[0], { opacity: 1 });
            gsap.set(slides[0], { autoAlpha: 1 });

            pinTl.to(fill, { scaleY: 1, ease: "none", duration: 4 }, 0);

            // Step 1 -> Step 2
            pinTl.to(listItems[0], { opacity: 0.3, duration: 0.5 }, 1)
            .to(slides[0], { autoAlpha: 0, duration: 0.5 }, 1)
            .to(listItems[1], { opacity: 1, duration: 0.5 }, 1)
            .to(slides[1], { autoAlpha: 1, duration: 0.5 }, 1);

            // Step 2 -> Step 3
            pinTl.to(listItems[1], { opacity: 0.3, duration: 0.5 }, 2.5)
            .to(slides[1], { autoAlpha: 0, duration: 0.5 }, 2.5)
            .to(listItems[2], { opacity: 1, duration: 0.5 }, 2.5)
            .to(slides[2], { autoAlpha: 1, duration: 0.5 }, 2.5);

            // Hold Step 3
            pinTl.to({}, { duration: 0.5 }, 3.5);
        }

        // MotionPath Waypoints Logic
        const cursor = cursorRef.current;
        const waypointsContainer = waypointsSectionRef.current;
        const markers = gsap.utils.toArray<HTMLElement>(".waypoint-marker", waypointsContainer);

        if (cursor && waypointsContainer && markers.length > 0) {
            const containerRect = waypointsContainer.getBoundingClientRect();

            const points = markers.map((marker) => {
                const rect = marker.getBoundingClientRect();
                return {
                    x: rect.left - containerRect.left + rect.width / 2,
                    y: rect.top - containerRect.top + rect.height / 2,
                };
            });

            gsap.set(cursor, { x: points[0].x, y: points[0].y, xPercent: -50, yPercent: -50 });

            const pathTl = gsap.timeline({
            scrollTrigger: {
                trigger: waypointsContainer,
                start: "top center",
                end: "bottom bottom",
                scrub: 1,
            },
            });

            pathTl.to(cursor, {
            motionPath: {
                path: points.slice(1),
                curviness: 1.5,
            },
            ease: "none",
            });
        }
        },
        { scope: containerRef }
    );

    // Auto-play Carousel Logic
    useEffect(() => {
        const interval = setInterval(() => {
            carouselRefs.current.forEach((carousel) => {
                if (carousel && carousel.children.length > 1) {
                    // Calculate slide width to determine current index
                    const slideWidth =
                        (carousel.children[1] as HTMLElement).offsetLeft -
                        (carousel.children[0] as HTMLElement).offsetLeft;

                    const currentIndex = Math.round(carousel.scrollLeft / slideWidth);
                    let nextIndex = currentIndex + 1;

                    // Loop back to the first slide
                    if (nextIndex >= carousel.children.length) {
                        nextIndex = 0;
                    }

                    const targetSlide = carousel.children[nextIndex] as HTMLElement;
                    let targetScroll = targetSlide.offsetLeft - (carousel.clientWidth / 2) + (targetSlide.offsetWidth / 2);

                    // Clamp
                    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
                    targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));

                    gsap.to(carousel, {
                        scrollLeft: targetScroll,
                        duration: 1.2,
                        ease: "power3.inOut",
                        overwrite: "auto",
                        onStart: () => {
                            carousel.style.scrollSnapType = "none";
                        },
                        onComplete: () => {
                            carousel.style.scrollSnapType = "";
                        }
                    });
                }
            });
        }, 3500);

        return () => clearInterval(interval);
    }, []);

    const handleBackToHome = () => {
        if (shutterRef.current) {
        gsap.fromTo(
            shutterRef.current,
            { yPercent: -100 },
            {
            yPercent: 0,
            duration: 0.6,
            ease: "power3.inOut",
            onComplete: () => router.push("/"),
            }
        );
        }
    };

    return (
        <main ref={containerRef} className="relative min-h-screen w-full bg-bg-screen">

        {/* Navigation */}
        <div className="absolute right-10 top-10 z-50 md:right-20 md:top-20">
            <button
            onClick={handleBackToHome}
            className="cursor-pointer font-body text-body-reg text-color-primary transition-colors hover:text-color-accent"
            >
                close [x]
            </button>
        </div>

        {/* Hero Section */}
        <section className="flex h-screen w-full flex-col items-center justify-center p-10 text-center md:p-20">
            <h1 className="font-heading text-[clamp(2.5rem,5vw,5rem)] font-bold leading-tight text-color-primary">
                so, what do i do?<br />
                and how do i do it?
            </h1>

            {/* Scroll Indicator */}
            <div className="mt-16 flex flex-col items-center gap-3 opacity-60">
                <svg
                    width="24"
                    height="40"
                    viewBox="0 0 24 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-color-accent"
                >
                    <rect x="1" y="1" width="22" height="38" rx="11" strokeWidth="1" stroke="currentColor" />
                    <circle cx="12" cy="10" r="3" fill="currentColor" className="animate-scroll-down fill-color-accent" />
                </svg>

                <style dangerouslySetInnerHTML={{
                    __html: `
                    @keyframes scrollDown {
                        0% { transform: translateY(0); opacity: 0; }
                        20% { opacity: 1; }
                        60% { transform: translateY(12px); opacity: 1; }
                        80%, 100% { transform: translateY(12px); opacity: 0; }
                    }
                    .animate-scroll-down {
                        animation: scrollDown 2s cubic-bezier(0.25, 1, 0.5, 1) infinite;
                    }
                    `,
                }} />

                <p className="font-body text-body-sm tracking-widest text-color-accent">
                    scroll
                </p>
            </div>
        </section>

        {/* Lateral Pin Indicator */}
        <div className="relative w-full">
            <section
            ref={pinSectionRef}
            className="relative flex h-screen w-full items-center justify-center overflow-hidden border-y border-dashed border-color-accent/50 bg-bg-screen"
            >
                <div className="relative mx-auto flex w-full max-w-5xl items-center px-10">
                    {/* Left Column */}
                    <div className="relative pl-8 pr-10 md:pr-30">
                        <div className="absolute left-0 top-0 h-full w-[3px] bg-color-accent/20"></div>
                        <div className="indicator-fill absolute left-0 top-0 h-full w-[3px] bg-color-primary"></div>

                        <ul className="m-0 flex list-none flex-col gap-6 p-0 font-heading text-h4 text-color-primary">
                            {steps.map((step) => (
                            <li key={step.id} className="step-item opacity-30">
                                {step.title}
                            </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right Column */}
                    <div className="relative h-[400px] flex-1">
                        {/* Slide 1 */}
                        <div className="step-slide invisible absolute left-0 top-1/2 w-full -translate-y-1/2 opacity-0">
                            <div className="flex h-[350px] w-full flex-col items-center justify-center rounded-lg border border-color-primary/50 bg-color-accent/10 p-6">
                            <div className="relative h-48 w-full max-w-[280px]">
                                <Image src={step1Svg} alt="Planning Phase" fill priority className="object-contain" />
                            </div>
                            <span className="mt-6 font-body text-body-sm text-color-primary">
                                Analyze the problem, plan a solution.
                            </span>
                            </div>
                        </div>

                        {/* Slide 2 */}
                        <div className="step-slide invisible absolute left-0 top-1/2 w-full -translate-y-1/2 opacity-0">
                            <div className="flex h-[350px] w-full flex-col items-center justify-center rounded-lg border border-color-primary/50 bg-color-accent/10 p-6">
                            <div className="relative h-48 w-full max-w-[280px]">
                                <Image src={step2Svg} alt="Interface Design Phase" fill className="object-contain" />
                            </div>
                            <span className="mt-6 max-w-[250px] text-center font-body text-body-sm text-color-primary">
                                Making sure everything is aligned with the plan, design an interface that is consistent.
                            </span>
                            </div>
                        </div>

                        {/* Slide 3 */}
                        <div className="step-slide invisible absolute left-0 top-1/2 w-full -translate-y-1/2 opacity-0">
                            <div className="flex h-[350px] w-full flex-col items-center justify-center rounded-lg border border-color-primary/50 bg-color-accent/10 p-6">
                            <div className="relative h-48 w-full max-w-[280px]">
                                <Image src={step3Svg} alt="Engineering Phase" fill className="object-contain" />
                            </div>
                            <span className="mt-6 max-w-[250px] text-center font-body text-body-sm text-color-primary">
                                Bridge the gap between concept and product. Code and breathe life into ideas.
                            </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

        {/* MotionPath Waypoints */}
        <section ref={waypointsSectionRef} className="relative w-full overflow-hidden bg-bg-screen py-40 px-10 md:px-20">

            {/* Animated Cursor */}
            <div ref={cursorRef} className="absolute left-0 top-0 z-50 h-16 w-16 pointer-events-none drop-shadow-xl">
                <Image src={mouseCursorSvg} alt="Animated Cursor" fill className="object-contain" />
            </div>

            <div className="mx-auto flex max-w-6xl flex-col gap-[30vh]">
                {/* Step 1 */}
                <div className="relative flex flex-col items-center text-center">
                    {/* Waypoint 1 */}
                    <div className="waypoint-marker absolute top-10 right-[30%] h-4 w-4 rounded-full opacity-0"></div>

                    <h2 className="font-heading text-[clamp(2rem,4vw,4rem)] font-bold text-color-primary mb-6">Step 1: Plan</h2>
                    <p className="max-w-xl font-body text-body-reg text-color-accent mb-16">
                        Great interfaces begin with great architecture.<br />
                        I map user flows, create wireframes, and define the logic before development begins.
                    </p>

                    {/* Carousel 1 */}
                    <div
                        ref={(el) => { carouselRefs.current[0] = el; }}
                        className="relative flex w-full snap-x snap-mandatory overflow-x-auto pb-8 gap-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                    >
                        {[1, 2, 3].map((slide) => (
                            <div key={`plan-${slide}`} className="shrink-0 flex h-[400px] w-full md:w-[80%] items-center justify-center rounded-xl border border-text-caption/20 bg-ds-accent/5 snap-center">
                            <span className="font-heading text-h5 text-color-primary opacity-30">WIREFRM_IMG_{slide}.PNG</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Step 2 */}
                <div className="relative flex flex-col md:flex-row items-center gap-16">
                    <div className="flex-1">
                        {/* Waypoint 2 */}
                        <div className="waypoint-marker absolute top-10 left-[5%] h-4 w-4 rounded-full opacity-0"></div>

                        <h2 className="font-heading text-[clamp(2rem,4vw,4rem)] font-bold text-color-primary mb-6">Step 2: Design</h2>
                        <p className="font-body text-body-reg text-color-accent mb-8">
                            Translating architectural wireframes into high-fidelity components, establishing typography scales, defining interactive states, and creating a comprehensive design system that scales effectively.
                        </p>
                    </div>

                    {/* Carousel 2 */}
                    <div
                        ref={(el) => { carouselRefs.current[1] = el; }}
                        className="relative flex w-full md:w-1/2 snap-x snap-mandatory overflow-x-auto pb-8 gap-6 [scrollbar-width:none]"
                    >
                        {[1, 2, 3].map((slide) => (
                            <div key={`design-${slide}`} className="shrink-0 flex h-[400px] w-[90%] items-center justify-center rounded-xl border border-text-caption/20 bg-text-caption/5 snap-center">
                            <span className="font-heading text-h5 text-color-primary opacity-30">FIGMA_MOCK_{slide}.PNG</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Step 3 */}
                <div className="relative flex flex-col-reverse md:flex-row items-center gap-16">
                    {/* Carousel 3 */}
                    <div
                        ref={(el) => { carouselRefs.current[2] = el; }}
                        className="relative flex w-full md:w-1/2 snap-x snap-mandatory overflow-x-auto pb-8 gap-6 [scrollbar-width:none]"
                    >
                        {[1, 2, 3].map((slide) => (
                            <div key={`code-${slide}`} className="shrink-0 flex h-[400px] w-[90%] items-center justify-center rounded-xl border border-text-caption/20 bg-text-primary/5 snap-center">
                            <span className="font-heading text-h5 text-color-primary opacity-30">CODE_SNIP_{slide}.PNG</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex-1 text-left md:text-right">
                        {/* Waypoint 3 */}
                        <div className="waypoint-marker absolute top-10 right-[5%] h-4 w-4 rounded-full opacity-0"></div>

                        <h2 className="font-heading text-[clamp(2rem,4vw,4rem)] text-color-primary font-bold mb-6">Step 3: Code</h2>
                        <p className="font-body text-body-reg text-color-accent mb-8 md:ml-auto">
                            Engineering the final product through clean, maintainable code. The focus here shifts to performance and ensuring the final build matches the design and ideas behind it.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <ShutterOverlay ref={shutterRef} />
        </main>
    );
}