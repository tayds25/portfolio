"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ShutterOverlay from "@/components/ui/ShutterOverlay";

gsap.registerPlugin(ScrollTrigger);

export default function Process() {
    const router = useRouter();
    const shutterRef = useRef<HTMLDivElement | null>(null);

    const containerRef = useRef<HTMLElement | null>(null);
    const pinSectionRef = useRef<HTMLElement | null>(null);

    // Steps for Lateral Pin Indicator
    const steps = [
        { id: "plan", title: "Step 1: Plan" },
        { id: "design", title: "Step 2: Design" },
        { id: "code", title: "Step 3: Code" },
    ];

    useGSAP(
        () => {
        // 1. Shutter Entry
        if (shutterRef.current) {
            gsap.fromTo(
            shutterRef.current,
            { yPercent: 0 },
            { yPercent: -100, duration: 0.6, ease: "power3.inOut" }
            );
        }

        // 2. Logic: Lateral Pin Indicator
        const listItems = gsap.utils.toArray<HTMLElement>(".step-item");
        const slides = gsap.utils.toArray<HTMLElement>(".step-slide");
        const fill = ".indicator-fill";

        if (pinSectionRef.current && listItems.length === 3 && slides.length === 3) {
            const tl = gsap.timeline({
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

            tl.to(fill, { scaleY: 1, ease: "none", duration: 4 }, 0);

            // Step 1 -> Step 2
            tl.to(listItems[0], { opacity: 0.3, duration: 0.5 }, 1)
            .to(slides[0], { autoAlpha: 0, duration: 0.5 }, 1)
            .to(listItems[1], { opacity: 1, duration: 0.5 }, 1)
            .to(slides[1], { autoAlpha: 1, duration: 0.5 }, 1);

            // Step 2 -> Step 3
            tl.to(listItems[1], { opacity: 0.3, duration: 0.5 }, 2.5)
            .to(slides[1], { autoAlpha: 0, duration: 0.5 }, 2.5)
            .to(listItems[2], { opacity: 1, duration: 0.5 }, 2.5)
            .to(slides[2], { autoAlpha: 1, duration: 0.5 }, 2.5);

            // Hold on Step 3
            tl.to({}, { duration: 0.5 }, 3.5);
        }
        },
        { scope: containerRef }
    );

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
        {/* Close Button */}
        <div className="absolute right-10 top-10 z-50 md:right-20 md:top-20">
            <button
            onClick={handleBackToHome}
            className="cursor-pointer font-body text-body-reg text-text-caption transition-colors hover:text-text-primary"
            >
            close [x]
            </button>
        </div>

        {/* Hero Section */}
        <section className="flex h-screen w-full flex-col items-center justify-center p-10 text-center md:p-20">
            <h1 className="font-heading text-[clamp(2.5rem,5vw,5rem)] leading-tight text-text-primary">
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
                className="stroke-text-caption"
            >
                <rect x="1" y="1" width="22" height="38" rx="11" strokeWidth="1" stroke="currentColor" />
                <circle cx="12" cy="10" r="3" fill="currentColor" className="animate-scroll-down fill-text-caption" />
            </svg>

            <style
                dangerouslySetInnerHTML={{
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
                }}
            />

            <p className="font-body text-body-sm tracking-widest text-text-caption uppercase">
                scroll
            </p>
            </div>
        </section>

        <div className="relative w-full">
            {/* Lateral Pin Indicator Section */}
            <section
            ref={pinSectionRef}
            className="relative flex h-screen w-full items-center justify-center overflow-hidden border-y border-dashed border-text-caption/30 bg-bg-screen"
            >
                <div className="relative mx-auto flex w-full max-w-5xl items-center px-10">
                    {/* List & Indicator */}
                    <div className="relative pl-8 pr-10">
                    {/* Background Line */}
                    <div className="absolute left-0 top-0 h-full w-[2px] bg-text-caption/20"></div>

                    {/* Active Indicator Line */}
                    <div className="indicator-fill absolute left-0 top-0 h-full w-[2px] bg-text-primary"></div>

                    <ul className="m-0 flex list-none flex-col gap-6 p-0 font-heading text-h4 text-text-primary">
                        {steps.map((step) => (
                        <li key={step.id} className="step-item opacity-30">
                            {step.title}
                        </li>
                        ))}
                    </ul>
                    </div>

                    {/* Slides */}
                    <div className="relative h-[400px] flex-1">
                        {/* Step 1 */}
                        <div className="step-slide invisible absolute left-0 top-1/2 w-full -translate-y-1/2 opacity-0">
                            <div className="flex h-[350px] w-full flex-col items-center justify-center rounded-lg border border-text-caption/20 bg-ds-accent/10">
                                <span className="font-heading text-h5 text-text-primary">ILLUSTRATION PLACEHOLDER</span>
                                <span className="mt-2 font-body text-body-sm text-text-caption">
                                    Analyze the problem, plan a solution.
                                </span>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="step-slide invisible absolute left-0 top-1/2 w-full -translate-y-1/2 opacity-0">
                            <div className="flex h-[350px] w-full flex-col items-center justify-center rounded-lg border border-text-caption/20 bg-text-caption/10">
                                <span className="font-heading text-h4 text-text-primary text-center">
                                    CAROUSEL<br />PLACEHOLDER
                                </span>
                                <span className="mt-4 max-w-[250px] text-center font-body text-body-sm text-text-caption">
                                    Making sure everything is aligned with the plan, design an interface that is consistent.
                                </span>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="step-slide invisible absolute left-0 top-1/2 w-full -translate-y-1/2 opacity-0">
                            <div className="flex h-[350px] w-full flex-col items-center justify-center rounded-lg border border-text-caption/20 bg-text-primary/10">
                                <span className="font-heading text-h4 text-text-primary text-center">
                                    CAROUSEL<br />PLACEHOLDER
                                </span>
                                <span className="mt-4 max-w-[250px] text-center font-body text-body-sm text-text-caption">
                                    Bridge the gap between concept and product. Code and breathe life into ideas.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

        {/* Next Section Buffer */}
        <section className="flex h-[200vh] w-full flex-col items-center justify-center bg-ds-accent/5">
            <p className="font-heading text-h4 text-text-caption opacity-50">Next Section: MotionPath Waypoints</p>
        </section>

        <ShutterOverlay ref={shutterRef} />
        </main>
    );
}