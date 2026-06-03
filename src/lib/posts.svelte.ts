type Post = {
	id: string;
	author: string;
	title: string;
	content: string;
	date: Date;
};

class Posts {
	#posts: Post[] = $state([]);

	constructor() {}

	get getAll() {
		return this.#posts;
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
