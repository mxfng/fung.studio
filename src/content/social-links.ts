interface SocialLink {
	label: string;
	short: string;
	href: string;
	description: string;
}

const SOCIAL_LINKS: SocialLink[] = [
	{
		label: "Email",
		short: "EM",
		href: "mailto:max@fung.studio",
		description: "max@fung.studio",
	},
	{
		label: "LinkedIn",
		short: "LI",
		href: "https://www.linkedin.com/in/maxfung/",
		description: "in/maxfung",
	},
	{
		label: "Instagram",
		short: "IG",
		href: "https://www.instagram.com/fungkadelic/",
		description: "@fungkadelic",
	},
	{
		label: "GitHub",
		short: "GH",
		href: "https://www.github.com/mxfng",
		description: "mxfng",
	},
] as const;

export default SOCIAL_LINKS;
