"use client";

import { TRIANGLE, SQUARE, CIRCLE } from "./path-data";

export default function StaticHarmony() {
	return (
		<svg width="100%" height="100%" viewBox="-14.5 0 54.5 24" preserveAspectRatio="xMidYMid meet">
			<g transform="translate(-23.8 0.8)">
				<path stroke="#ffffff" d={TRIANGLE} className="fill-none" />
			</g>
			<g transform="translate(0 0.8)">
				<path stroke="#ffffff" d={CIRCLE} className="fill-none" />
			</g>
			<g transform="translate(27.5 0.8)">
				<path stroke="#ffffff" d={SQUARE} className="fill-none" />
			</g>
		</svg>
	);
}
