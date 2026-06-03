<script lang="ts">
	import { posts } from '$lib/posts.svelte.ts';

	// posts.create({
	// 	title: 'Cool stuff',
	// 	author: 'Nelson Mandela',
	// 	content: 'Lorem ipsum dolor.'
	// });
</script>

<digi-layout-block>
	<h1>Forum</h1>

	<div class="flex flex-col gap-4">
		{#each posts.getAll as post (post.id)}
			<div data-id={post.id} class="bg-gray-200">
				<h2 class="text-lg font-semibold">{post.title}</h2>
				<p>{post.content}</p>
				<small>{post.author}</small>
			</div>
		{/each}
	</div>
</digi-layout-block>
