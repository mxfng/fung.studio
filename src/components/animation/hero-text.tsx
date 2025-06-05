"use client";

import { motion } from "framer-motion";
import type { HeroTextChunk } from "@/content/hero-text";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const heroTextVariants = cva("pointer-events-none", {
	variants: {
		size: {
			default: "text-mega",
			lg: "text-ultra",
		},
	},
	defaultVariants: {
		size: "default",
	},
});

const MOTION_SPAN_VARIANTS = {
	hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
	show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

interface HeroTextProps {
	chunks: HeroTextChunk[];
	className?: string;
	size?: "default" | "lg";
	animate?: boolean;
}

export default function HeroText({ chunks, className, size, animate = true }: HeroTextProps) {
	const containerVariants = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
			},
		},
	};

	return (
		<motion.h1
			variants={containerVariants}
			initial={animate ? "hidden" : "show"}
			animate="show"
			className={cn(heroTextVariants({ size }), className)}
			onAnimationComplete={() => {
				document.querySelector("h1")?.classList.remove("pointer-events-none");
			}}
		>
			{chunks.map((chunk, index) => (
				<motion.span
					key={index}
					variants={MOTION_SPAN_VARIANTS}
					transition={{ duration: 0.8, ease: "easeOut" }}
					className={cn(chunk.muted && "text-muted-foreground")}
					suppressHydrationWarning
				>
					{chunk.text}
				</motion.span>
			))}
		</motion.h1>
	);
}
