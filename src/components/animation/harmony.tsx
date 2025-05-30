"use client";

import { useEffect, useState } from "react";
import { useMotionValue, animate } from "motion/react";
import Morph from "./morph";
import { PATHS } from "./morph/path-data";

export default function LayeredPathMorphing() {
	const progress = useMotionValue(0);
	const [index, setIndex] = useState(0);
	const [isAnimating, setIsAnimating] = useState(false);
	const [hasInitialAnimation, setHasInitialAnimation] = useState(false);

	const startAnimation = () => {
		if (isAnimating) return;
		setIsAnimating(true);
		setIndex(1);
		progress.set(0);
	};

	// Initial animation on page load
	useEffect(() => {
		if (!hasInitialAnimation) {
			setHasInitialAnimation(true);
			startAnimation();
		}
	}, [hasInitialAnimation]);

	useEffect(() => {
		if (!isAnimating) return;

		const morphAnim = animate(progress, index, {
			duration: 1.5,
			ease: "easeInOut",
			onComplete: () => {
				setTimeout(() => {
					const next = (index + 1) % PATHS.outline.length;
					if (next === 0) {
						setIsAnimating(false);
					} else {
						setIndex(next);
					}
				}, 500);
			},
		});

		return () => {
			morphAnim.stop();
		};
	}, [index, progress, isAnimating]);

	return (
		<div className="h-full w-full" onClick={startAnimation}>
			{(["outline", "center", "left", "right"] as const).map((type) => (
				<Morph key={type} type={type} progress={progress} />
			))}
		</div>
	);
}
