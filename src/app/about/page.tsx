"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ShutterOverlay from "@/components/ui/ShutterOverlay";

export default function About() {
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
        <main className="flex min-h-screen flex-col items-center justify-center bg-bg-screen p-20 text-landing-primary">
        <h1 className="font-heading text-title">About Me</h1>

        <button
            onClick={handleBackToHome}
            className="mt-8 cursor-pointer font-body text-landing-primary transition-colors hover:text-landing-primary"
        >
            [back to home]
        </button>
        <ShutterOverlay ref={shutterRef} />
        </main>
    );
}