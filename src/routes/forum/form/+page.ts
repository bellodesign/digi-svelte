import type { PageLoad } from './$types';

export const load: PageLoad = ({ url }) => {
	return {
		category: url.searchParams.get('category') ?? ''
	};
};
