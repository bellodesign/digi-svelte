<script lang="ts">
	import { SITE_NAME } from '$lib/constants';
</script>

<svelte:head>
	<title>Start - {SITE_NAME}</title>
	<meta name="description" content={SITE_NAME} />
</svelte:head>

<section>
	<digi-layout-block af-vertical-padding={true}>
		<digi-typography-heading-jumbo
			af-text="Arbetsförmedlingens forum"
		></digi-typography-heading-jumbo>
		<digi-typography-preamble>
			En POC för att utvärdera om vi kan skapa ett eget forum baserat på Svelte.
		</digi-typography-preamble>
	</digi-layout-block>
</section>

<style>
	ul > li {
		list-style: disc;
	}
</style>
