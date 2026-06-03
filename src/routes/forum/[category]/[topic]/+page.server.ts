import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params }) => {
	return {
		category: params.category,
		id: params.topic
	};
};
