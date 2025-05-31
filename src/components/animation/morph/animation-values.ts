import { useTransform, MotionValue, easeOut } from "motion/react";

export const ANIMATION_STEPS = [0, 1, 2, 3, 4, 5];

export const createOpacityTransform = (progress: MotionValue<number>, fadeInStep: number) => {
	return useTransform(
		progress,
		ANIMATION_STEPS,
		ANIMATION_STEPS.map((step) => (step >= fadeInStep ? 1 : 0)),
		{
			clamp: true,
			ease: easeOut,
		},
	);
};

export const createTranslateTransform = (
	progress: MotionValue<number>,
	startX: number,
	endX: number,
	moveStep: number,
) => {
	return useTransform(
		progress,
		ANIMATION_STEPS,
		ANIMATION_STEPS.map((step) => (step >= moveStep ? endX : startX)),
		{
			clamp: true,
			ease: (t: number) => {
				// Custom elastic-like easing
				const c4 = (2 * Math.PI) / 3;
				return t === 0
					? 0
					: t === 1
						? 1
						: Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
			},
		},
	);
};

export const ANIMATION_CONFIG = {
	triangle: {
		opacityStep: 3,
		translateX: {
			start: 1.5,
			end: -24.5,
			moveStep: 3,
		},
		translateY: 0.8,
	},
	square: {
		opacityStep: 4,
		translateX: {
			start: 1.5,
			end: 30.5,
			moveStep: 4,
		},
		translateY: 0.8,
	},
} as const;
