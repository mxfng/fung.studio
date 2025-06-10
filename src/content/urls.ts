export interface URLMetadata {
	url: string;
	site: string;
	handle?: string;
	short?: string;
}

export const URLS: Record<string, URLMetadata> = {
	INSTAGRAM_TOKO_MAKAI: {
		url: "https://www.instagram.com/tokomakai/",
		site: "Instagram",
		handle: "@tokomakai",
		short: "TM",
	},
	INSTAGRAM_MAX_FUNG: {
		url: "https://www.instagram.com/maxhfung/",
		site: "Instagram",
		handle: "@maxhfung",
		short: "IG",
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
	YOUTUBE: {
		url: "https://www.youtube.com/c/MaxFung",
		site: "YouTube",
		handle: "MaxFung",
		short: "YT",
	},
	TIKTOK_MAX_FUNG: {
		url: "https://www.tiktok.com/@maxhfung",
		site: "TikTok",
		handle: "@maxhfung",
		short: "TT",
	},
	TIKTOK_TOKO_MAKAI: {
		url: "https://www.tiktok.com/@tokomakai",
		site: "TikTok",
		handle: "@tokomakai",
		short: "TT",
	},
	SPOTIFY_MAX_FUNG: {
		url: "https://open.spotify.com/artist/3DWcOzpr7BX9t9BAP4xMvH",
		site: "Spotify",
		handle: "Max Fung",
		short: "SP",
	},
	SPOTIFY_TOKO_MAKAI: {
		url: "https://open.spotify.com/artist/6wed8Wb3ajHGgZoNDtRyiI",
		site: "Spotify",
		handle: "Toko Makai",
		short: "SP",
	},
	APPLE_MUSIC_MAX_FUNG: {
		url: "https://music.apple.com/ca/artist/max-fung/1453112532",
		site: "Apple Music",
		handle: "Max Fung",
		short: "AM",
	},
	APPLE_MUSIC_TOKO_MAKAI: {
		url: "https://music.apple.com/ca/artist/toko-makai/1765892640",
		site: "Apple Music",
		handle: "Toko Makai",
		short: "AM",
	},
	YOUTUBE_MUSIC_MAX_FUNG: {
		url: "https://music.youtube.com/channel/UCS2N8nVKcb2W6u2_HWbKG0Q?si=yVS3P3GnnAGw3K_N",
		site: "YouTube Music",
		handle: "Max Fung",
		short: "YTM",
	},
	YOUTUBE_MUSIC_TOKO_MAKAI: {
		url: "https://music.youtube.com/channel/UCi4nhgYTFRtFzLgwxVwJVzQ?si=vwd0tu3oiaR3fA9P",
		site: "YouTube Music",
		handle: "Toko Makai",
		short: "YTM",
	},
	X: {
		url: "https://x.com/maxhfung",
		site: "X",
		handle: "@maxhfung",
		short: "X",
	},
} as const;
