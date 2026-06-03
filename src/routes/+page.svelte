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
			af-text="Avtal och uppföljning - Forum"
		></digi-typography-heading-jumbo>
		<digi-typography-preamble>
			Här kan ni skicka in önskemål, ställa frågor om applikationen eller skapa buggrapporter.
		</digi-typography-preamble>
	</digi-layout-block>
</section>

<style>
	ul > li {
		list-style: disc;
	}
</style>
