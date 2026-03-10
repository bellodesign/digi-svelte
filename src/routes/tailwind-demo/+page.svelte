<script>
	import { SITE_NAME } from '$lib/constants';

	let gapValue = $state('larger');
	let spacingValue = $state('base');

	const gapOptions = [
		'smallest-7',
		'smallest-6',
		'smallest-5',
		'smallest-4',
		'smallest-3',
		'smallest-2',
		'smallest',
		'smaller',
		'small',
		'base',
		'large',
		'larger',
		'largest',
		'largest-2',
		'largest-3',
		'largest-3-5',
		'largest-4',
		'largest-5',
		'largest-6',
		'largest-7',
		'largest-8',
		'largest-9',
		'largest-10'
	];
</script>

<svelte:head>
	<title>Tailwind Demo - {SITE_NAME}</title>
</svelte:head>

<section>
	<digi-layout-block af-vertical-padding={true}>
		<digi-typography-heading-jumbo af-text="Tailwind Demo"></digi-typography-heading-jumbo>
		<digi-typography-preamble>
			Sida för att testa Tailwind-klasser och se hur de fungerar tillsammans med digi-tokens
		</digi-typography-preamble>
	</digi-layout-block>

	<digi-layout-block af-vertical-padding={true}>
		<div class="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-8">
			<div class="flex flex-col">
				<h2>Knappar</h2>
				<p>Exempel på gap</p>
				<label class="mb-base flex items-center gap-small">
					gap:
					<select bind:value={gapValue}>
						{#each gapOptions as opt (opt)}
							<option value={opt}>{opt}</option>
						{/each}
					</select>
					<code class="text-sm">gap-{gapValue}</code>
				</label>
				<div class="flex flex-wrap gap-{gapValue}">
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
		<label class="mb-base flex items-center gap-small">
			mb:
			<select bind:value={spacingValue}>
				{#each gapOptions as opt (opt)}
					<option value={opt}>{opt}</option>
				{/each}
			</select>
			<code class="text-sm">mb-{spacingValue}</code>
		</label>
		<div class="flex flex-col">
			<div class="spacing-bar mb-{spacingValue}"></div>
			<div class="spacing-bar"></div>
		</div>

		<div
			class="mb-base mb-large mb-larger mb-largest mb-largest-2 mb-largest-3 mb-largest-3-5 mb-largest-4 mb-largest-5 mb-largest-6 mb-largest-7 mb-largest-8 mb-largest-9 mb-largest-10 mb-small mb-smaller mb-smallest mb-smallest-2 mb-smallest-3 mb-smallest-4 mb-smallest-5 mb-smallest-6 mb-smallest-7 hidden gap-base gap-large gap-larger gap-largest gap-largest-2 gap-largest-3 gap-largest-3-5 gap-largest-4 gap-largest-5 gap-largest-6 gap-largest-7 gap-largest-8 gap-largest-9 gap-largest-10 gap-small gap-smaller gap-smallest gap-smallest-2 gap-smallest-3 gap-smallest-4 gap-smallest-5 gap-smallest-6 gap-smallest-7"
		></div>
	</digi-layout-block>
</section>

<style lang="postcss">
	@reference "$lib/styles/tailwind.css";

	.spacing-bar {
		@apply h-largest-5 w-largest-5 rounded-tertiary bg-background-interactive-default-primary;
	}
</style>
