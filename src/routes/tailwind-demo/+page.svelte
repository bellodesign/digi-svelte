<svelte:head>
	<title>Tailwind Demo</title>
</svelte:head>

<section>
	<digi-layout-block af-vertical-padding={true}>
		<digi-typography-heading-jumbo af-text="Tailwind Demo"></digi-typography-heading-jumbo>
		<digi-typography-preamble>
			Interaktiva exempel på Tailwind-klasser med digi-tokens.
		</digi-typography-preamble>
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
					<div
						class="h-12 w-12 rounded-tertiary border border-border-accent-primary bg-background-primary"
					></div>
					<div
						class="h-12 w-12 rounded-tertiary border border-border-accent-primary bg-background-secondary"
					></div>
				</div>
			</div>
		</div>
	</digi-layout-block>

	<digi-layout-block af-vertical-padding={true}>
		<h2>Tailwind @apply + digi spacings</h2>
		<p>
			@apply inuti style-block i svelte kräver att man använder @reference för att undvika
			duplicering av klasser.
		</p>
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
	@reference "$lib/styles/tailwind.css";

	.spacing-row {
		@apply flex items-center gap-small;
	}

	.spacing-bar {
		@apply h-base rounded-tertiary bg-background-interactive-default-primary;
	}
</style>
