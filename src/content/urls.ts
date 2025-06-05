export interface URLMetadata {
	url: string;
	site: string;
	handle?: string;
	short?: string;
}

export const URLS: Record<string, URLMetadata> = {
	STUDIO_MAKAI: {
		url: "https://www.studiomakai.net",
		site: "Studio Makai",
		short: "SM",
	},
	TOKO_MAKAI: {
		url: "https://www.instagram.com/tokomakai/",
		site: "Instagram",
		handle: "@tokomakai",
		short: "TM",
	},
	MAX_FUNG: {
		url: "https://www.instagram.com/fungkadelic/",
		site: "Instagram",
		handle: "@fungkadelic",
		short: "MF",
	},
	GITHUB: {
		url: "https://github.com/mxfng",
		site: "GitHub",
		handle: "mxfng",
		short: "GH",
	},
	LINKEDIN: {
		url: "https://linkedin.com/in/maxfung",
		site: "LinkedIn",
		handle: "in/maxfung",
		short: "LI",
	},
} as const;
