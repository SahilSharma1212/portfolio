"use client";

import React, { useEffect, useRef } from "react";

export default function ElasticCursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointsRef = useRef<{ x: number; y: number }[]>([]); // Historical coordinates: [{x, y}, ...]
  const targetMouseRef = useRef({ x: 0, y: 0 }); // Real raw mouse position
  const interpolatedMouseRef = useRef({ x: 0, y: 0 }); // Eased mouse position
  const animationFrameId = useRef<number | null>(null);
  const lastMouseMoveTime = useRef(Date.now());
  const maxPointsAtStart = useRef(0);
  const hasMovedRef = useRef(false); // Only render once mouse has moved
  const isHoveringRef = useRef(false); // Track if cursor is over interactive elements
  const currentRadiusRef = useRef(3); // Easing for the custom cursor dot radius

  const MAX_TRAIL_LENGTH = 45;
  const MIN_MOVEMENT_THRESHOLD = 4; // px
  const EASING_FACTOR = 0.22; // Speed at which the lead point catches up to the real cursor
  const TRAIL_FOLLOW_FACTOR = 0.32; // Speed at which subsequent trail points follow each other
  const DECAY_DELAY_MS = 60; // Delay before trail starts vanishing when idle

  // Renders the points smoothly using Quadratic Bezier curves
  const drawTrail = (ctx: CanvasRenderingContext2D, points: { x: number; y: number }[]) => {
    if (points.length < 2) return;

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];
      const midX = (p1.x + p2.x) / 2;
      const midY = (p1.y + p2.y) / 2;
      ctx.quadraticCurveTo(p1.x, p1.y, midX, midY);
    }

    ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
    ctx.lineWidth = 1.8;
    
    // Warm brownish-grey color matching selection and scrollbar tones
    ctx.strokeStyle = "rgba(95, 77, 81, 0.24)"; 
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
  };

  const animate = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) {
      animationFrameId.current = requestAnimationFrame(animate);
      return;
    }

    const dpr = window.devicePixelRatio || 1;
    ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

    if (!hasMovedRef.current) {
      animationFrameId.current = requestAnimationFrame(animate);
      return;
    }

    // Easing physics for the trail lead
    const dx = targetMouseRef.current.x - interpolatedMouseRef.current.x;
    const dy = targetMouseRef.current.y - interpolatedMouseRef.current.y;
    interpolatedMouseRef.current.x += dx * EASING_FACTOR;
    interpolatedMouseRef.current.y += dy * EASING_FACTOR;

    const trail = pointsRef.current;
    const lastPoint = trail[trail.length - 1];

    // Add new point to historical path if cursor moved beyond threshold
    if (!lastPoint) {
      trail.push({ x: interpolatedMouseRef.current.x, y: interpolatedMouseRef.current.y });
    } else {
      const moveDist = Math.hypot(
        interpolatedMouseRef.current.x - lastPoint.x,
        interpolatedMouseRef.current.y - lastPoint.y
      );

      if (moveDist > MIN_MOVEMENT_THRESHOLD) {
        trail.push({ x: interpolatedMouseRef.current.x, y: interpolatedMouseRef.current.y });
        if (trail.length > MAX_TRAIL_LENGTH) {
          trail.shift();
        }
      }
    }

    // Spring/damping chase physics (each point chases the position of the one ahead)
    for (let i = trail.length - 2; i >= 0; i--) {
      const nextPoint = trail[i + 1];
      const currentPoint = trail[i];
      currentPoint.x += (nextPoint.x - currentPoint.x) * TRAIL_FOLLOW_FACTOR;
      currentPoint.y += (nextPoint.y - currentPoint.y) * TRAIL_FOLLOW_FACTOR;
    }

    // Handle decay/vanishing when cursor is inactive
    const timeSinceLastMove = Date.now() - lastMouseMoveTime.current;
    if (timeSinceLastMove < DECAY_DELAY_MS) {
      maxPointsAtStart.current = 0;
    } else if (pointsRef.current.length > 0) {
      if (maxPointsAtStart.current === 0) {
        maxPointsAtStart.current = pointsRef.current.length;
      }
      const initialLength = maxPointsAtStart.current;
      const currentLength = pointsRef.current.length;
      
      const removeCount = (initialLength - currentLength) / initialLength < 0.4 ? 2 : 4;
      pointsRef.current.splice(0, removeCount);
    }

    // Draw active trail
    if (pointsRef.current.length > 1) {
      drawTrail(ctx, pointsRef.current);
    }

    // Draw the custom cursor dot at real-time mouse position
    const targetRadius = isHoveringRef.current ? 7 : 3;
    currentRadiusRef.current += (targetRadius - currentRadiusRef.current) * 0.15; // Smooth scale transition

    ctx.beginPath();
    ctx.arc(
      targetMouseRef.current.x,
      targetMouseRef.current.y,
      currentRadiusRef.current,
      0,
      Math.PI * 2
    );
    if (isHoveringRef.current) {
      // Soft semi-transparent larger indicator on hover
      ctx.fillStyle = "rgba(95, 77, 81, 0.35)";
    } else {
      // Crisp solid core dot
      ctx.fillStyle = "rgba(95, 77, 81, 0.9)";
    }
    ctx.fill();

    animationFrameId.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Inject styles globally to hide default browser cursor
    const styleElement = document.createElement("style");
    styleElement.innerHTML = `
      * {
        cursor: none !important;
      }
    `;
    document.head.appendChild(styleElement);

    const resizeCanvas = () => {
      const ctx = canvas.getContext("2d");
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx?.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      hasMovedRef.current = true;
      lastMouseMoveTime.current = Date.now();
      targetMouseRef.current = { x: e.clientX, y: e.clientY };

      if (pointsRef.current.length === 0) {
        interpolatedMouseRef.current = { x: e.clientX, y: e.clientY };
      }
    };

    // Track when hovering over clickable/interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("clickable") ||
        window.getComputedStyle(target).cursor === "pointer";

      isHoveringRef.current = !!isInteractive;
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      styleElement.remove();
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 9999,
      }}
      aria-hidden="true"
    />
  );
}
