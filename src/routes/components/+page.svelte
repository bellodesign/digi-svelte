<script lang="ts">
	import { resolve } from '$app/paths';

	import Hero from '$lib/components/Hero.svelte';
</script>

<svelte:head>
	<title>Komponenter</title>
</svelte:head>

<section>
	<Hero
		heading="Hitta ditt nästa jobb (Hero.svelte)"
		preamble="Vi hjälper dig att hitta rätt jobb, utbildning eller stöd – oavsett var du befinner dig i arbetslivet."
		imageSrc="/images/hero-example.jpg"
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
	</digi-layout-block>
</section>
