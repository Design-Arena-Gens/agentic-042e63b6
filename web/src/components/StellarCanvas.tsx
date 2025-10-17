"use client";

import { useEffect, useRef } from "react";

type Star = {
  baseX: number;
  baseY: number;
  offsetX: number;
  offsetY: number;
  radius: number;
  twinklePhase: number;
  driftSpeed: number;
};

type Props = {
  className?: string;
};

const STAR_COUNT = 140;

export function StellarCanvas({ className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const stars: Star[] = [];
    let animationFrame = 0;
    let width = 0;
    let height = 0;
    const pointer = { x: 0.5, y: 0.5 };

    const seedStars = () => {
      stars.length = 0;
      for (let i = 0; i < STAR_COUNT; i += 1) {
        stars.push({
          baseX: Math.random(),
          baseY: Math.random(),
          offsetX: (Math.random() - 0.5) * 0.002,
          offsetY: (Math.random() - 0.5) * 0.002,
          radius: 0.6 + Math.random() * 1.8,
          twinklePhase: Math.random() * Math.PI * 2,
          driftSpeed: 0.2 + Math.random() * 0.6,
        });
      }
    };

    const setSize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.scale(dpr, dpr);
    };

    const draw = (timestamp: number) => {
      context.clearRect(0, 0, width, height);

      for (const star of stars) {
        star.twinklePhase += 0.002 + star.driftSpeed * 0.0006;
        const twinkle = 0.55 + Math.sin(star.twinklePhase) * 0.45;
        const influenceX = (pointer.x - 0.5) * 160;
        const influenceY = (pointer.y - 0.5) * 160;
        const drift = timestamp * star.driftSpeed * 0.00002;

        const x = star.baseX * width + star.offsetX * width + influenceX * star.baseY;
        const y = star.baseY * height + star.offsetY * height + influenceY * star.baseX + drift;

        const wrappedX = ((x % width) + width) % width;
        const wrappedY = ((y % height) + height) % height;

        const gradient = context.createRadialGradient(
          wrappedX,
          wrappedY,
          0,
          wrappedX,
          wrappedY,
          star.radius * 12,
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${0.8 * twinkle})`);
        gradient.addColorStop(0.5, `rgba(72, 215, 255, ${0.55 * twinkle})`);
        gradient.addColorStop(1, "rgba(4, 7, 27, 0)");

        context.beginPath();
        context.fillStyle = gradient;
        context.arc(wrappedX, wrappedY, star.radius * 10, 0, Math.PI * 2);
        context.fill();
      }

      animationFrame = window.requestAnimationFrame(draw);
    };

    const handlePointer = (event: PointerEvent) => {
      pointer.x = event.clientX / width;
      pointer.y = event.clientY / height;
    };

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        animationFrame = window.requestAnimationFrame(draw);
      } else {
        window.cancelAnimationFrame(animationFrame);
      }
    };

    seedStars();
    setSize();
    animationFrame = window.requestAnimationFrame(draw);

    window.addEventListener("resize", setSize);
    window.addEventListener("pointermove", handlePointer, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", setSize);
      window.removeEventListener("pointermove", handlePointer);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <canvas
      aria-hidden="true"
      ref={canvasRef}
      className={className}
    />
  );
}
