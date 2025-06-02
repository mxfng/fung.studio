"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

// Configurable constants
const STRINGS = [
	"Max Fung",
	"Musician",
	"Developer",
	"Designer",
	"Artist",
	"Free Spirit",
	"Dreamer",
	"Creator",
	"Destroyer",
	"Max Fung",
	"Explorer",
	"Optimist",
	"Architect",
	"Craftsman",
	"Code Poet",
	"Sound Bender",
	"Idea Machine",
	"Vision Builder",
	"Max Fung",
	"Human-Centered",
	"System Disruptor",
	"Traveler",
	"DJ",
	"Guitarist",
	"Producer",
	"Singer",
	"Songwriter",
];

const ACTIVATION_DELAY_MS = 5000;
const MOUSE_MOVE_INTERVAL_MS = 120;
const MIN_MOVE_DELTA = 1;
const TRAIL_LIFESPAN_MS = 10000;
const CLEANUP_INTERVAL_MS = 500;
const TRAIL_MAX_LENGTH = 100;
const FADE_DURATION_SEC = 2.5;

interface TrailItem {
	id: number;
	text: string;
	x: number;
	y: number;
}

export default function TextTrail() {
	const [trail, setTrail] = useState<TrailItem[]>([]);
	const [index, setIndex] = useState(0);
	const [isActive, setIsActive] = useState(false);
	const isActiveRef = useRef(false);

	const trackingRef = useRef<HTMLDivElement>(null);
	const overlayRef = useRef<HTMLDivElement>(null);

	const lastPos = useRef({ x: 0, y: 0 });
	const lastEmit = useRef(0);

	useEffect(() => {
		const delay = setTimeout(() => {
			isActiveRef.current = true;
			setIsActive(true);
		}, ACTIVATION_DELAY_MS);

		return () => clearTimeout(delay);
	}, []);

	useEffect(() => {
		const tracking = trackingRef.current;
		const overlay = overlayRef.current;
		if (!tracking || !overlay) return;

		const handleMouseMove = (e: MouseEvent) => {
			if (!isActiveRef.current) return;

			const rect = overlay.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;

			const dx = Math.abs(x - lastPos.current.x);
			const dy = Math.abs(y - lastPos.current.y);
			const movedEnough = dx > MIN_MOVE_DELTA || dy > MIN_MOVE_DELTA;

			const now = Date.now();

			if (movedEnough && now - lastEmit.current > MOUSE_MOVE_INTERVAL_MS) {
				lastEmit.current = now;
				lastPos.current = { x, y };

				setTrail((prev) => [
					...prev.slice(Math.max(0, prev.length - (TRAIL_MAX_LENGTH - 1))),
					{ id: now, text: STRINGS[index], x, y },
				]);
				setIndex((i) => (i + 1) % STRINGS.length);
			}
		};

		tracking.addEventListener("mousemove", handleMouseMove);
		return () => tracking.removeEventListener("mousemove", handleMouseMove);
	}, [index]);

	useEffect(() => {
		const cleanup = setInterval(() => {
			const cutoff = Date.now() - TRAIL_LIFESPAN_MS;
			setTrail((prev) => prev.filter((item) => item.id > cutoff));
		}, CLEANUP_INTERVAL_MS);
		return () => clearInterval(cleanup);
	}, []);

	return (
		<div className="relative h-full w-full">
			<div ref={trackingRef} className="absolute inset-0 z-10" />

			<div
				ref={overlayRef}
				className={`pointer-events-none absolute inset-0 z-20 transition-opacity duration-500 ${
					isActive ? "opacity-20" : "opacity-0"
				}`}
			>
				{trail.map((item) => (
					<motion.div
						key={item.id}
						initial={{ opacity: 1 }}
						animate={{ opacity: 0 }}
						transition={{ duration: FADE_DURATION_SEC, ease: "easeOut" }}
						style={{
							position: "absolute",
							left: item.x,
							top: item.y,
							translateX: "-50%",
							translateY: "-50%",
						}}
						className="overflow-hidden p-4 text-2xl font-medium tracking-tight whitespace-nowrap md:text-6xl"
					>
						{item.text}
					</motion.div>
				))}
			</div>
		</div>
	);
}
