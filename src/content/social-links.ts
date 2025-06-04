interface SocialLink {
	label: string;
	href: string;
	description: string;
}

const SOCIAL_LINKS: SocialLink[] = [
	{
		label: "Email",
		href: "mailto:max@fung.studio",
		description: "max@fung.studio",
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
