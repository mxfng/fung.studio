"use client";

import { motion } from "framer-motion";

const words = [
	{ text: "I'm a", muted: true },
	{ text: "Musician", muted: false },
	{ text: ",", muted: true, margin: "-ml-[0.2em]" },
	{ text: "Software Developer", muted: false },
	{ text: ", and", muted: true, margin: "-ml-[0.2em]" },
	{ text: "Designer", muted: false },
	{ text: "living in", muted: true },
	{ text: "Los Angeles", muted: false },
	{ text: ". This is my", muted: true, margin: "-ml-[0.2em]" },
	{ text: " archive of", muted: true },
	{ text: "work", muted: false },
	{ text: ",", muted: true, margin: "-ml-[0.2em]" },
	{ text: "ideas", muted: false },
	{ text: ", and", muted: true, margin: "-ml-[0.2em]" },
	{ text: "experiments", muted: false },
	{ text: ".", muted: true, margin: "-ml-[0.2em]" },
];

const container = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
			delayChildren: 3.2,
		},
	},
};

const item = {
	hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
	show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export default function HeroText() {
	return (
		<motion.h1
			variants={container}
			initial="hidden"
			animate="show"
			className="pointer-events-none text-center text-2xl font-medium tracking-tight md:text-4xl xl:text-5xl"
			onAnimationComplete={() => {
				document.querySelector("h1")?.classList.remove("pointer-events-none");
			}}
		>
			{words.map((word, index) => (
				<motion.span
					key={index}
					variants={item}
					transition={{ duration: 0.8, ease: "easeOut" }}
					className={`${word.muted ? "text-muted-foreground" : ""} ${word.margin || ""}`}
				>
					{word.text}{" "}
				</motion.span>
			))}
		</motion.h1>
	);
}
