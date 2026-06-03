<script lang="ts">
	import { Categories, type CategorySlug } from '$lib/posts.svelte';
	import { BadgeStatusType } from '@designsystem-se/af';

	let { text }: { text: CategorySlug } = $props();

	const badgeMap: Record<keyof typeof Categories, BadgeStatusType> = {
		ux: BadgeStatusType.APPROVED,
		frontend: BadgeStatusType.MISSING,
		backend: BadgeStatusType.PROMPT
	};
	const type = $derived(badgeMap[text]);
</script>

<digi-badge-status af-variation="secondary" af-type={type} af-text={text}></digi-badge-status>
