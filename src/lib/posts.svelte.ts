export type Post = {
	id: string;
	author: string;
	title: string;
	content: string;
	date: Date;
	category: Categories;
};

export enum Categories {
	'ux' = 'UX',
	'frontend' = 'Frontend',
	'backend' = 'Backend'
}

const STORAGE_KEY = 'forum-posts';

class Posts {
	#posts: Post[] = $state([]);

	constructor() {
		if (typeof localStorage === 'undefined') return;
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			this.#posts = JSON.parse(stored).map((p: Post) => ({
				...p,
				date: new Date(p.date)
			}));
		}
	}

	get getAll() {
		return this.#posts;
	}

	getByCategory(category: string) {
		return this.#posts.filter((post) => post.category === category);
	}

	getById(id: string) {
		return this.#posts.find((post) => post.id === id);
	}

	create(post: Omit<Post, 'id' | 'date'>) {
		const payload = {
			...post,
			date: new Date(),
			id: crypto.randomUUID()
		};

		this.#posts.push(payload);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(this.#posts));
	}
}

export const posts = new Posts();
