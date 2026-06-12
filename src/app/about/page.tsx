"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import ShutterOverlay from "@/components/ui/ShutterOverlay";

export default function About() {
    const router = useRouter();
    const shutterRef = useRef<HTMLDivElement | null>(null);

    const lenis = useLenis();

    const [hoveredId, setHoveredId] = useState<string | null>(null);

    const experience = [
        {
        id: "exp-solutions-design",
        role: "Solutions Designer Intern",
        company: "East West Banking Corporation",
        date: "2025",
        type: "WORK",
        },
        {
        id: "exp-university",
        role: "BS in Computer Science",
        company: "Mapúa University",
        date: "2022 — 2026",
        type: "EDUCATION",
        },
    ];

    // Suspend Lenis on mount
    useEffect(() => {
        if (lenis) {
        lenis.stop();
        }
        return () => {
        if (lenis) {
            lenis.start();
        }
        };
    }, [lenis]);

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
        <main className="relative flex h-screen w-full flex-col overflow-hidden bg-bg-screen p-10 md:p-20">

        <div className="absolute right-10 top-10 z-50 md:right-20 md:top-20">
            <button
            onClick={handleBackToHome}
            className="cursor-pointer font-body text-body-reg text-text-caption transition-colors text-color-primary hover:text-color-accent"
            >
            close [x]
            </button>
        </div>

        <div className="mt-20 grid w-full flex-1 min-h-0 grid-cols-1 gap-20 overflow-hidden md:grid-cols-2">

            {/* Left Column */}
            <div className="flex flex-col">
            <p className="mb-10 font-body text-body-reg text-text-caption text-color-primary">
                about the dev
            </p>

            <h1 className="mb-16 font-heading text-title leading-none text-color-primary">
                tayshaun<br />
                delos santos
            </h1>

            <div className="flex max-w-md flex-col gap-8 font-body text-body-reg text-color-primary">
                <p>A programmer who likes design. A designer who likes code.</p>
                <p>
                Building digital experiences where logic meets beauty. I translate complex problems into high-end interfaces. By considering how a product is built, used, and experienced, I engineer systems for the user, bridging the gap between the human and product.
                </p>
            </div>
            </div>

            {/* Right Column */}
            <div className="flex h-full min-h-0 flex-col border-l border-ds-accent/30 border-color-accent border-text-accent pl-10">
                <p className="mb-10 shrink-0 font-body text-body-reg text-text-caption text-color-primary">
                    experience
                </p>

                <div
                    data-lenis-prevent="true"
                    className="flex-1 min-h-0 overflow-y-auto overscroll-contain"
                    style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    WebkitOverflowScrolling: "touch",
                    WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 80%, transparent 100%)",
                    maskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 80%, transparent 100%)"
                    }}
                >
                    <div className="flex flex-col gap-12 pb-64 pt-10">
                    {experience.map((item) => (
                        <div
                        key={item.id}
                        onMouseEnter={() => setHoveredId(item.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        className={`flex flex-col gap-1 transition-opacity duration-500 ease-out ${
                            hoveredId && hoveredId !== item.id ? "opacity-30" : "opacity-100"
                        }`}
                        >
                            <div className="flex items-center justify-between font-body text-body-sm text-text-caption text-color-accent">
                                <p>[ {item.date} ]</p>
                                <p>{item.type}</p>
                            </div>
                            <h3 className="font-heading text-h3 text-color-primary">
                                {item.company}
                            </h3>
                            <p className="font-body text-body-reg text-text-caption text-color-accent">
                                {item.role}
                            </p>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </div>

        <ShutterOverlay ref={shutterRef} />
        </main>
    );
}