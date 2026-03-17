import React from 'react'

export default function () {
    return (
        <div className="absolute inset-0 pointer-events-none rounded-lg overflow-hidden">
            <div
                className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-gray-500 to-transparent"
                style={{
                    backgroundSize: "400% 100%",
                    backgroundPosition: "calc(var(--border-progress) * -1%) 0",
                    maskImage: "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
                }}
            />
            <div
                className="absolute top-0 right-0 bottom-0 w-px bg-linear-to-b from-transparent via-gray-500 to-transparent"
                style={{
                    backgroundSize: "100% 400%",
                    backgroundPosition: "0 calc(var(--border-progress) * -1%)",
                    maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
                }}
            />
            <div
                className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-gray-500 to-transparent"
                style={{
                    backgroundSize: "400% 100%",
                    backgroundPosition: "calc(var(--border-progress) * 1%) 0",
                    maskImage: "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
                }}
            />
            <div
                className="absolute top-0 left-0 bottom-0 w-px bg-linear-to-b from-transparent via-gray-500 to-transparent"
                style={{
                    backgroundSize: "100% 400%",
                    backgroundPosition: "0 calc(var(--border-progress) * 1%)",
                    maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
                }}
            />
        </div>
    )
}
