<script lang="ts">
	import SvelteLogo from '$lib/images/svelte-logo.svg';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<digi-layout-block af-vertical-padding={true}>
		<digi-typography-heading-jumbo af-text="Digi i Svelte"></digi-typography-heading-jumbo>
	</digi-layout-block>
	<digi-layout-block af-vertical-padding={true}>
		<div class="flex items-center gap-8">
			<digi-logo></digi-logo>
			<img src={SvelteLogo} alt="Svelte logo" width="120" height="120" />
		</div>
	</digi-layout-block>
	
	<digi-layout-block af-vertical-padding={true}>
		<h1 class="text-3xl">Välkommen till Arbetsförmedlingen</h1>
		<h2>Välkommen till Arbetsförmedlingen</h2>
		<h3>Välkommen till Arbetsförmedlingen</h3>
		<h4>Välkommen till Arbetsförmedlingen</h4>
		<h5>Välkommen till Arbetsförmedlingen</h5>
		<h6>Välkommen till Arbetsförmedlingen</h6>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit auctor dui, a
			ultricies nisl. Sed at nunc ac nisl efficitur efficitur. Donec eget ligula a enim
			ultricies convallis. Curabitur in odio sed enim efficitur efficitur. Donec eget ligula
			a enim ultricies convallis.
		</p>
	</digi-layout-block>

	<digi-layout-block af-vertical-padding={true}>
		<div class="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-8">
			<div class="flex flex-col">
				<h2>Knappar</h2>
				<div class="flex flex-wrap gap-4">
					<digi-button>Primär</digi-button>
					<digi-button af-variation="secondary">Sekundär</digi-button>
					<digi-button af-variation="tertiary">Tertiär</digi-button>
				</div>
			</div>
			<div class="flex flex-col">
				<h2>Tailwind-exempel</h2>
				<p>Färger - bakgrund, ramlinje. Radius. Intellisense inkluderar digi.</p>
				<div class="flex gap-4">
					<div class="bg-background-primary border border-border-accent-primary w-12 h-12 rounded-smaller"></div>
					<div class="bg-background-secondary border border-border-accent-primary w-12 h-12 rounded-smaller"></div>
				</div>
			</div>
		</div>
	</digi-layout-block>

	<digi-layout-block af-vertical-padding={true}>
		<h2>Tailwind @apply + digi spacings</h2>
		<p>@apply inuti style-block i svelte kräver att man använder @reference för att undvika duplicering av klasser.</p>
		<p>Exempel på spacing</p>
		<div class="spacing-row">
			<div class="spacing-bar pr-largest"></div>
			<div class="spacing-bar pr-larger"></div>
			<div class="spacing-bar pr-large"></div>
			<div class="spacing-bar pr-base"></div>
			<div class="spacing-bar pr-small"></div>
			<div class="spacing-bar pr-smaller"></div>
			<div class="spacing-bar pr-smallest"></div>
		</div>
	</digi-layout-block>

</section>

<style lang="postcss">
	@reference "./layout.css";

	.spacing-row {
		@apply flex items-center gap-small;
	}

	.spacing-bar {
		@apply h-base bg-background-interactive-default-primary rounded-smaller;
	}
</style>
