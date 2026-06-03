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

class Posts {
	#posts: Post[] = $state([]);

	constructor() {}

	get getAll() {
		return this.#posts;
	}

	getByCategory(category: string) {
		return this.#posts.filter((post) => post.category === category);
	}

	create(post: Omit<Post, 'id' | 'date'>) {
		const payload = {
			...post,
			date: new Date(),
			id: crypto.randomUUID()
		};

		this.#posts.push(payload);
	}
}

export const posts = new Posts();
