<script lang="ts">
	import type { Categories } from '$lib/posts.svelte';

	let { text }: { text: Categories } = $props();
</script>

<digi-badge-status af-type="neutral" af-text={text}></digi-badge-status>
