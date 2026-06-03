<script lang="ts">
	import { posts } from '$lib/posts.svelte';

	let { data } = $props();

	const post = $derived(posts.getById(data.id));
</script>

<digi-layout-block af-vertical-padding={true}>
	{#if post}
		<article data-id={post}>
			<header class="flex justify-between">
				<h1 class="text-lg font-semibold">{post.title}</h1>
			</header>
			<p>{post.content}</p>
			<small>{post.author}</small>
		</article>
	{/if}
</digi-layout-block>
