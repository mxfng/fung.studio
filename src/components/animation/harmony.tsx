"use client";

import { motion } from "motion/react";
import Morph from "./morph";
import { useHarmony } from "./use-harmony";
import { SQUARE, TRIANGLE } from "./morph/path-data";
import { FadeIn } from "./fade-in";

export default function Harmony() {
	const { progress } = useHarmony();

	return (
		<div className="grid h-full w-full grid-cols-2 grid-rows-2 items-center justify-center gap-4">
			<FadeIn delay={2000}>
				<div className="absolute inset-0">
					<svg width="100%" height="100%" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
						<g transform="translate(-22.5 0.8)">
							<motion.path stroke="#ffffff" d={TRIANGLE} className="fill-none" />
						</g>
					</svg>
				</div>
			</FadeIn>
			{(["outline", "center", "left", "right"] as const).map((type) => (
				<Morph key={type} type={type} progress={progress} />
			))}
			<FadeIn delay={3000}>
				<div className="absolute inset-0">
					<svg width="100%" height="100%" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
						<g transform="translate(28.5 0.8)">
							<motion.path stroke="#ffffff" d={SQUARE} className="fill-none" />
						</g>
					</svg>
				</div>
			</FadeIn>
		</div>
	);
}
