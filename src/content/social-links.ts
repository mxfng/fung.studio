interface SocialLink {
	label: string;
	href: string;
	description: string;
}

const SOCIAL_LINKS: SocialLink[] = [
	{
		label: "Email",
		href: "mailto:max@studiomakai.net",
		description: "max@studiomakai.net",
	},
	{
		label: "LinkedIn",
		href: "https://www.linkedin.com/in/maxfung/",
		description: "in/maxfung",
	},
	{
		label: "Instagram",
		href: "https://www.instagram.com/fungkadelic/",
		description: "@fungkadelic",
	},
	{
		label: "GitHub",
		href: "https://www.github.com/mxfng",
		description: "mxfng",
	},
] as const;

export default SOCIAL_LINKS;
