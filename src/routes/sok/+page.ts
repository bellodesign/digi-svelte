const API_BASE = 'https://jobsearch.api.jobtechdev.se/search';

export async function load({ fetch, url }) {
	const q = url.searchParams.get('q');

	if (!q) {
		return {
			jobs: [],
			query: '',
			total: 0
		};
	}

	const offset = url.searchParams.get('offset') || '0';
	const limit = url.searchParams.get('limit') || '10';

	const params = new URLSearchParams({ q, offset, limit });
	const res = await fetch(`${API_BASE}?${params}`);
	const data = await res.json();

	return {
		jobs: data.hits,
		query: q,
		total: data.total?.value ?? 0
	};
}
