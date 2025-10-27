const DEFAULT_MEETING_URL = 'https://meetings-eu1.hubspot.com/emmanuel-schmidt-le-roi';
const DEFAULT_MEETINGS_SCRIPT_SRC = 'https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js';

const envMeetingUrl = process.env.NEXT_PUBLIC_HUBSPOT_MEETING_URL?.trim();
const MEETING_URL = envMeetingUrl && envMeetingUrl.length > 0 ? envMeetingUrl : DEFAULT_MEETING_URL;

type BuildHubspotMeetingUrlParams = Record<string, string | undefined>;

export function buildHubspotMeetingUrl(params: BuildHubspotMeetingUrlParams = {}, { embed = true }: { embed?: boolean } = {}) {
	try {
		const url = new URL(MEETING_URL);

		if (embed) {
			url.searchParams.set('embed', 'true');
		}

		for (const [key, value] of Object.entries(params)) {
			if (value) {
				url.searchParams.set(key, value);
			}
		}

		return url.toString();
	} catch (error) {
		if (process.env.NODE_ENV !== 'production') {
			console.error('Invalid HubSpot meeting URL provided:', MEETING_URL, error);
		}

		const query = new URLSearchParams();

		if (embed) {
			query.set('embed', 'true');
		}

		for (const [key, value] of Object.entries(params)) {
			if (value) {
				query.set(key, value);
			}
		}

		return `${DEFAULT_MEETING_URL}?${query.toString()}`;
	}
}

export function getHubspotMeetingsScriptSrc() {
	return DEFAULT_MEETINGS_SCRIPT_SRC;
}
