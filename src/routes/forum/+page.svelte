<script lang="ts">
	import { posts } from '$lib/posts.svelte';
	import { resolve } from '$app/paths';

	// posts.create({
	// 	title: 'Cool stuff',
	// 	author: 'Nelson Mandela',
	// 	content: 'Lorem ipsum dolor.'
	// });
</script>

<digi-layout-block af-vertical-padding={true}>
	<h1 class="mb-4">Forum</h1>

	<h2>Kategorier</h2>
	<p class="flex gap-6">
		<a href={resolve('/forum/ux', {})}>UX</a>
		<a href={resolve('/forum/frontend', {})}>Frontend</a>
		<a href={resolve('/forum/backend', {})}>Backend</a>
	</p>

	<div class=" mt-8 flex max-w-[600px] flex-col gap-4 border-t-2 border-gray-200">
		{#each posts.getAll as post (post.id)}
			<div data-id={post.id} class="border-b border-gray-300 p-4">
				<h2 class="text-lg font-semibold">{post.title}</h2>
				<p>Kategori: {post.category}</p>
				<p>{post.content}</p>
				<small>{post.author}</small>
			</div>
		{/each}
	</div>
</digi-layout-block>
