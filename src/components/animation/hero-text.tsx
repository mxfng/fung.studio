"use client";

import { motion } from "framer-motion";
import type { HeroTextChunk } from "@/content/hero-text";
import { cn } from "@/lib/utils";

const MOTION_SPAN_VARIANTS = {
	hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
	show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

interface HeroTextProps {
	chunks: HeroTextChunk[];
	delayFadeIn?: boolean;
	className?: string;
}

export default function HeroText({ chunks, delayFadeIn = false, className }: HeroTextProps) {
	const containerVariants = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
				delayChildren: delayFadeIn ? 3.2 : 0,
			},
		},
	};

	return (
		<motion.h1
			variants={containerVariants}
			initial="hidden"
			animate="show"
			className={cn(
				"pointer-events-none text-2xl font-medium tracking-tight md:text-4xl xl:text-5xl",
				className,
			)}
			onAnimationComplete={() => {
				document.querySelector("h1")?.classList.remove("pointer-events-none");
			}}
		>
			{chunks.map((chunk, index) => (
				<motion.span
					key={index}
					variants={MOTION_SPAN_VARIANTS}
					transition={{ duration: 0.8, ease: "easeOut" }}
					className={`${chunk.muted ? "text-muted-foreground" : ""} ${chunk.kernStart && "ml-[-0.2em]"}`}
				>
					{chunk.text}{" "}
				</motion.span>
			))}
		</motion.h1>
	);
}
