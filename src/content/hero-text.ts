export interface HeroTextChunk {
	text: string;
	muted?: boolean;
}

export const LANDING_PAGE_HERO_TEXT: HeroTextChunk[] = [
	{ text: "Welcome." },
	{ text: "I make ", muted: true },
	{ text: "music," },
	{ text: " write ", muted: true },
	{ text: "code," },
	{ text: "and ", muted: true },
	{ text: "so much more. " },
	{ text: "This is my archive of ", muted: true },
	{ text: "work," },
	{ text: ", ", muted: true },
	{ text: "ideas," },
	{ text: " and ", muted: true },
	{ text: "experiments." },
	{ text: " All shared here to ", muted: true },
	{ text: "inspire you." },
];

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
