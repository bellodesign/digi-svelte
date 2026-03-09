<script lang="ts">
	import type { Snippet } from 'svelte';

	type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

	let {
		heading,
		headingLevel = 'h1',
		preamble,
		imageSrc,
		imageAlt = '',
		breadcrumb,
		actions
	}: {
		heading: string;
		headingLevel?: HeadingLevel;
		preamble: string;
		imageSrc?: string;
		imageAlt?: string;
		breadcrumb?: Snippet;
		actions?: Snippet;
	} = $props();
</script>

<div class="hero">
	{#if breadcrumb}
		<div class="hero__breadcrumb">
			{@render breadcrumb()}
		</div>
	{/if}

	{#if imageSrc}
		<div>
			<div class="hero__content">
				<digi-typography-heading-jumbo
					af-text={heading}
					af-level={headingLevel}
					af-variation="secondary"
				></digi-typography-heading-jumbo>
				<digi-typography-preamble>{preamble}</digi-typography-preamble>
				{#if actions}
					<div class="hero__actions">
						{@render actions()}
					</div>
				{/if}
			</div>
			<digi-media-image af-src={imageSrc} af-alt={imageAlt} af-fullwidth={true}></digi-media-image>
		</div>
	{:else}
		<div class="hero__content">
			<digi-typography-heading-jumbo
				af-text={heading}
				af-level={headingLevel}
				af-variation="secondary"
			></digi-typography-heading-jumbo>
			<digi-typography-preamble>{preamble}</digi-typography-preamble>
			{#if actions}
				<div class="hero__actions">
					{@render actions()}
				</div>
			{/if}
		</div>
	{/if}
</div>

<style lang="postcss">
	@reference "$lib/styles/tailwind-digi.css";

	.hero {
		@apply flex flex-col gap-base bg-background-brand-primary text-grayscale-0;
	}

	.hero__breadcrumb {
		@apply mb-small;
	}

	.hero__content {
		@apply flex flex-col gap-base;
	}

	.hero__actions {
		@apply flex flex-wrap gap-small;
	}
</style>
