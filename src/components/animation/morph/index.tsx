"use client";

import { motion, useMotionValue, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";
import { useFlubber } from "./use-flubber";
import { PATHS, COLORS } from "./path-data";

interface PathMorphingProps {
	type: keyof typeof PATHS;
	progress?: MotionValue<number>;
}

export default function PathMorphing({ type, progress: external }: PathMorphingProps) {
	const internal = useMotionValue(0);
	const progress = external || internal;
	const paths = PATHS[type];
	const stroke = useTransform(
		progress,
		paths.map((_, i) => i),
		COLORS,
	);
	const d = useFlubber(progress, paths);

	return (
		<svg
			width="100%"
			height="100%"
			className="absolute inset-0 z-10"
			viewBox="0 0 24 24"
			preserveAspectRatio="xMidYMid meet"
		>
			<g transform="translate(1.5 0.8)">
				<motion.path stroke={stroke} className="fill-none" d={d} />
			</g>
		</svg>
	);
}
