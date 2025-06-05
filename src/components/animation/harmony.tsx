"use client";

import { motion, useTransform } from "motion/react";
import { useHarmony } from "./use-harmony";
import { SQUARE, TRIANGLE, PATHS } from "./path-data";
import { useFlubber } from "./morph/use-flubber";
import { useEffect, useState } from "react";

const LIGHT_COLORS = [
	"oklch(0.25 0.005 85)",
	"oklch(0.25 0.005 85)",
	"oklch(0.85 0.15 80)",
	"oklch(0.65 0.2 50)",
	"oklch(0.55 0.3 0)",
	"oklch(0.25 0.005 85)",
];

const DARK_COLORS = [
	"oklch(0.99 0 0)",
	"oklch(0.99 0 0)",
	"oklch(0.85 0.15 80)",
	"oklch(0.65 0.2 50)",
	"oklch(0.55 0.3 0)",
	"oklch(0.99 0 0)",
];

export default function Harmony() {
	const { progress } = useHarmony();
	const [colors, setColors] = useState<string[]>(LIGHT_COLORS);

	useEffect(() => {
		const isDark = document.documentElement.classList.contains("dark");
		setColors(isDark ? DARK_COLORS : LIGHT_COLORS);

		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				if (mutation.attributeName === "class") {
					const isDark = document.documentElement.classList.contains("dark");
					setColors(isDark ? DARK_COLORS : LIGHT_COLORS);
				}
			});
		});

		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"],
		});

		return () => observer.disconnect();
	}, []);

	return (
		<motion.div
			className="h-full w-full"
			initial={{ opacity: 1 }}
			animate={{ opacity: 0 }}
			transition={{
				opacity: {
					duration: 0.5,
					delay: 4.5,
					ease: "easeOut",
				},
			}}
		>
			<div className="relative h-full w-full">
				<div className="absolute inset-0 flex items-center justify-center">
					<svg className="h-full w-full" viewBox="-30 0 85 24" preserveAspectRatio="xMidYMid meet">
						<motion.g
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 1.5, delay: 2, ease: "easeOut" }}
							transform="translate(-23.8 0.8)"
						>
							<motion.path stroke="var(--foreground)" d={TRIANGLE} className="fill-none" />
						</motion.g>
						{(["outline", "center", "left", "right"] as const).map((type) => {
							const paths = PATHS[type];
							const stroke = useTransform(
								progress,
								paths.map((_, i) => i),
								colors,
							);
							const d = useFlubber(progress, paths);

							return (
								<g key={type} transform="translate(0 0.8)">
									<motion.path
										stroke={stroke}
										className="fill-none"
										d={d}
										suppressHydrationWarning
									/>
								</g>
							);
						})}
						<motion.g
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 1.5, delay: 3, ease: "easeOut" }}
							transform="translate(27.5 0.8)"
						>
							<motion.path
								stroke="var(--foreground)"
								d={SQUARE}
								className="fill-none"
								suppressHydrationWarning
							/>
						</motion.g>
					</svg>
				</div>
			</div>
		</motion.div>
	);
}
