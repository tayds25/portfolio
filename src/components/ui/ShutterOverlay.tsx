import React, { forwardRef } from "react";

const ShutterOverlay = forwardRef<HTMLDivElement, unknown>(function ShutterOverlay(_, ref) {
    return (
        <div
            ref={ref}
            className="fixed inset-0 z-[100] h-screen w-full bg-text-primary pointer-events-none"
        />
    );
});

export default ShutterOverlay;