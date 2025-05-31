"use client";

import { motion, useAnimation } from "motion/react";
import { useEffect } from "react";

interface FadeInProps {
	delay: number;
	duration?: number;
	children: React.ReactNode;
}

export function FadeIn({ delay, duration = 1.5, children }: FadeInProps) {
	const controls = useAnimation();

	useEffect(() => {
		const timer = setTimeout(() => {
			controls.start(
				{
					opacity: 1,
				},
				{
					duration,
					ease: "easeOut",
				},
			);
		}, delay);

		return () => clearTimeout(timer);
	}, [controls, delay, duration]);

	return (
		<motion.div initial={{ opacity: 0 }} animate={controls}>
			{children}
		</motion.div>
	);
}
