export interface HeroTextChunk {
	text: string;
	muted?: boolean;
}

export const ABOUT_PAGE_HERO_TEXT: HeroTextChunk[] = [
	{ text: "I'm a ", muted: true },
	{ text: "Musician,", muted: true },
	{ text: " ", muted: true },
	{ text: "Software Developer," },
	{ text: " and ", muted: true },
	{ text: "Designer", muted: true },
	{ text: " living in ", muted: true },
	{ text: "Los Angeles, California." },
];

export const WRITING_PAGE_HERO_TEXT: HeroTextChunk[] = [
	{ text: "Here is a ", muted: true },
	{ text: "collection", muted: true },
	{ text: " of ", muted: true },
	{ text: " my ", muted: true },
	{ text: " personal ", muted: true },
	{ text: "writing", muted: true },
	{ text: " on ", muted: true },
	{ text: "various topics", muted: true },
	{ text: " that ", muted: true },
	{ text: "interest me.", muted: true },
	{ text: " ", muted: true },
	{ text: "Enjoy." },
];
