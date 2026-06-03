<script lang="ts">
	import { posts } from '$lib/posts.svelte';
	import { resolve } from '$app/paths';
	import CategoryBadge from '$lib/components/forum/CategoryBadge.svelte';

	let { data } = $props();
</script>

<digi-layout-block af-vertical-padding={true}>
	<h1>{data.category}</h1>

	<a href={resolve(`/forum/form?category=${data.category}`, {})}>Skapa inlägg</a>

	<div class=" mt-8 flex max-w-150 flex-col gap-4 border-t-2 border-gray-200">
		{#each posts.getByCategory(data.category) as post (post.id)}
			<article data-id={post.id} class="border-b border-gray-300 p-4">
				<header class="flex justify-between">
					<h2 class="text-lg font-semibold">{post.title}</h2>
					<CategoryBadge text={post.category}></CategoryBadge>
				</header>
				<p>{post.content}</p>
				<small>{post.author}</small>
			</article>
		{/each}
	</div>
</digi-layout-block>
