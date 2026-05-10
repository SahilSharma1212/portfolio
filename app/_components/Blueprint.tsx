"use client"

import React from "react";

export const CornerLines = () => (
    <div className="absolute inset-0 pointer-events-none overflow-visible z-0">
        {/* Top Left */}
        <div className="absolute top-0 left-0 -translate-x-full -translate-y-[1px] w-8 h-[1px] border-t border-dashed border-zinc-300 [mask-image:linear-gradient(to_left,black,transparent)]" />
        <div className="absolute top-0 left-0 -translate-y-full -translate-x-[1px] w-[1px] h-8 border-l border-dashed border-zinc-300 [mask-image:linear-gradient(to_top,black,transparent)]" />
        
        {/* Top Right */}
        <div className="absolute top-0 right-0 translate-x-full -translate-y-[1px] w-8 h-[1px] border-t border-dashed border-zinc-300 [mask-image:linear-gradient(to_right,black,transparent)]" />
        <div className="absolute top-0 right-0 -translate-y-full translate-x-[1px] w-[1px] h-8 border-r border-dashed border-zinc-300 [mask-image:linear-gradient(to_top,black,transparent)]" />
        
        {/* Bottom Left */}
        <div className="absolute bottom-0 left-0 -translate-x-full translate-y-[1px] w-8 h-[1px] border-b border-dashed border-zinc-300 [mask-image:linear-gradient(to_left,black,transparent)]" />
        <div className="absolute bottom-0 left-0 translate-y-full -translate-x-[1px] w-[1px] h-8 border-l border-dashed border-zinc-300 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        
        {/* Bottom Right */}
        <div className="absolute bottom-0 right-0 translate-x-full translate-y-[1px] w-8 h-[1px] border-b border-dashed border-zinc-300 [mask-image:linear-gradient(to_right,black,transparent)]" />
        <div className="absolute bottom-0 right-0 translate-y-full translate-x-[1px] w-[1px] h-8 border-r border-dashed border-zinc-300 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
    </div>
);

export const BoxBorders = () => (
    <>
        <div className="absolute top-0 left-0 w-full h-[1px] border-t border-dashed border-zinc-300" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] border-b border-dashed border-zinc-300" />
        <div className="absolute top-0 left-0 h-full w-[1px] border-l border-dashed border-zinc-300" />
        <div className="absolute top-0 right-0 h-full w-[1px] border-r border-dashed border-zinc-300" />
    </>
);
