import { useEffect, useState } from "react";
import { useMotionValue, animate } from "motion/react";
import type { MotionValue } from "motion/react";
import { PATHS } from "./morph/path-data";

const SPRING_CONFIG = {
	type: "spring" as const,
	stiffness: 100,
	damping: 15,
	mass: 0.5,
};

export function useHarmony(): { progress: MotionValue<number>; startAnimation: () => void } {
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

		// Animate morphing with spring physics
		const morphAnim = animate(progress, index, {
			...SPRING_CONFIG,
			onComplete: () => {
				setTimeout(() => {
					const next = (index + 1) % PATHS.outline.length;
					if (next === 0) {
						setIsAnimating(false);
					} else {
						setIndex(next);
					}
				}, 200);
			},
		});

		return () => {
			morphAnim.stop();
		};
	}, [index, progress, isAnimating]);

	return {
		progress,
		startAnimation,
	};
}
