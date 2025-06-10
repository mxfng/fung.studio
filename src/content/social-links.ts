import { EMAIL } from "./email";
import { URLS } from "./urls";
import type { URLMetadata } from "./urls";

const SOCIAL_LINKS: URLMetadata[] = [
	URLS.INSTAGRAM_MAX_FUNG,
	URLS.GITHUB,
	URLS.LINKEDIN,
	{
		url: `mailto:${EMAIL}`,
		site: "Email",
		short: "EM",
	},
];

export default SOCIAL_LINKS;
