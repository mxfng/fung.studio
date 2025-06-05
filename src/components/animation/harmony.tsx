"use client";

import { motion, useTransform } from "motion/react";
import { useHarmony } from "./use-harmony";
import { SQUARE, TRIANGLE, PATHS, COLORS } from "./path-data";
import { useFlubber } from "./morph/use-flubber";

export default function Harmony() {
	const { progress } = useHarmony();

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
							<motion.path
								stroke="var(--foreground)"
								d={TRIANGLE}
								className="fill-none"
								suppressHydrationWarning
							/>
						</motion.g>
						{(["outline", "center", "left", "right"] as const).map((type) => {
							const paths = PATHS[type];
							const stroke = useTransform(
								progress,
								paths.map((_, i) => i),
								COLORS,
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
