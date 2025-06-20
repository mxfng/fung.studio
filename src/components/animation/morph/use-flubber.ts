import { interpolate } from "flubber";
import { useTransform } from "motion/react";
import type { MotionValue } from "motion/react";

export function useFlubber(progress: MotionValue<number>, paths: string[]) {
	return useTransform(
		progress,
		paths.map((_, i) => i),
		paths,
		{
			mixer: (a, b) => interpolate(a, b, { maxSegmentLength: 0.1 }),
		},
	);
}
