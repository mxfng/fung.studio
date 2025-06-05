import { EMAIL } from "./email";

interface SocialLink {
	label: string;
	short: string;
	href: string;
	description: string;
}

const SOCIAL_LINKS: SocialLink[] = [
	{
		href: "https://github.com/mxfng",
		label: "GitHub",
		short: "GH",
		description: "mxfng",
	},
	{
		href: "https://twitter.com/mxfng",
		label: "Twitter",
		short: "TW",
		description: "@mxfng",
	},
	{
		href: "https://linkedin.com/in/mxfng",
		label: "LinkedIn",
		short: "LI",
		description: "mxfng",
	},
	{
		href: `mailto:${EMAIL}`,
		label: "Email",
		short: "EM",
		description: EMAIL,
	},
] as const;

export default SOCIAL_LINKS;
