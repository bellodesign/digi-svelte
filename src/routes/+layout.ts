import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const ssr = false;
export const prerender = false;

export const load: LayoutLoad = ({ url }) => {
	if (url.pathname !== '/' && !url.pathname.startsWith('/tabeller')) {
		redirect(302, '/tabeller');
	}
};
