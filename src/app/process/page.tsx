"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ShutterOverlay from "@/components/ui/ShutterOverlay";

export default function Process() {
    const router = useRouter();
    const shutterRef = useRef<HTMLDivElement | null>(null);

    useGSAP(() => {
        if (shutterRef.current) {
        gsap.fromTo(
            shutterRef.current,
            { yPercent: 0 },
            { yPercent: -100, duration: 0.6, ease: "power3.inOut" }
        );
        }
    });

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
        <main className="relative flex min-h-screen w-full flex-col items-center justify-center bg-bg-screen p-10 md:p-20">

        {/* Close Button */}
        <div className="absolute right-10 top-10 z-50 md:right-20 md:top-20">
            <button
            onClick={handleBackToHome}
            className="cursor-pointer font-body text-body-reg text-text-caption transition-colors text-color-primary hover:text-color-accent"
            >
            close [x]
            </button>
        </div>

        {/* Hero Section */}
        <div className="flex flex-col items-center text-center">
            <h1 className="font-heading text-[clamp(2.5rem,5vw,5rem)] leading-tight text-color-primary">
                so, what do i do?<br />
                and how do i do it?
            </h1>

            {/* Scroll Indicator */}
            <div className="mt-16 flex flex-col items-center gap-3 opacity-60 text-color-primary">
                <svg
                    width="24"
                    height="40"
                    viewBox="0 0 24 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-text-caption"
                >
                    <rect x="1" y="1" width="22" height="38" rx="11" strokeWidth="1" stroke="currentColor" />
                    <circle cx="12" cy="10" r="3" fill="currentColor" className="fill-text-caption animate-scroll-down" />
                </svg>

                <style jsx global>{`
                    @keyframes scrollDown {
                    0% {
                        transform: translateY(0);
                        opacity: 0;
                    }
                    20% {
                        opacity: 1;
                    }
                    60% {
                        stroke-dashoffset: 0;
                        transform: translateY(12px);
                        opacity: 1;
                    }
                    80%, 100% {
                        transform: translateY(12px);
                        opacity: 0;
                    }
                    }
                    .animate-scroll-down {
                    animation: scrollDown 2s cubic-bezier(0.25, 1, 0.5, 1) infinite;
                    }
                `}</style>

                <p className="font-body text-body-sm tracking-widest text-text-caption">
                    scroll
                </p>
            </div>
        </div>

        <ShutterOverlay ref={shutterRef} />
        </main>
    );
}