<script lang="ts">
	import { resolve } from '$app/paths';

	import Hero from '$lib/components/Hero.svelte';
	import { SITE_NAME } from '$lib/constants';
</script>

<svelte:head>
	<title>Komponenter - {SITE_NAME}</title>
</svelte:head>

<section>
	<Hero
		heading="Hitta ditt nästa jobb (Hero.svelte)"
		preamble="Vi hjälper dig att hitta rätt jobb, utbildning eller stöd – oavsett var du befinner dig i arbetslivet."
		imageSrc="https://picsum.photos/id/1/360/240"
		imageAlt="Hero bild"
	>
		{#snippet breadcrumb()}
			<digi-navigation-breadcrumbs af-current-page="Nuvarande sida">
				<a href={resolve('/', {})}>Start</a>
				<a href={resolve('/om-sidan/', {})}>Undersida 1</a>
			</digi-navigation-breadcrumbs>
		{/snippet}
		{#snippet actions()}
			<digi-link-button af-href="#" af-variation="primary-alt">
				Jag är en länkknapp
			</digi-link-button>
			<digi-link-button af-href="#" af-variation="secondary-alt">
				Jag är en länkknapp
			</digi-link-button>
		{/snippet}
	</Hero>

	<digi-layout-block af-vertical-padding={true}>
		<digi-typography-heading-jumbo af-text="Komponenter"></digi-typography-heading-jumbo>
		<digi-typography-preamble>
			Testar att ta fram nya komponenter baserat på Digi
		</digi-typography-preamble>
		<p>Sida för att testa av hur det är att bygga komponenter med Digi i Svelte.</p>
	</digi-layout-block>
</section>
