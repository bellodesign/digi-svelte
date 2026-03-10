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

<div
	class="flex flex-col gap-base bg-background-brand-primary text-grayscale-0"
	style="--digi--color--text--primary: var(--digi--color--grayscale--0);"
>
	<digi-layout-container>
		{#if breadcrumb}
			<div class="my-large">
				{@render breadcrumb()}
			</div>
		{/if}

		<div class="grid items-center gap-base md:grid-cols-[2fr_1fr]">
			<div class="mb-largest-3 flex flex-col gap-base">
				<digi-typography-heading-jumbo
					af-text={heading}
					af-level={headingLevel}
					af-variation="secondary"
				></digi-typography-heading-jumbo>
				<digi-typography-preamble>{preamble}</digi-typography-preamble>
				{#if actions}
					<div class="flex flex-wrap gap-small">
						{@render actions()}
					</div>
				{/if}
			</div>
			<div class="hidden md:block">
				<digi-media-image
					af-src={imageSrc}
					af-alt={imageAlt}
					af-fullwidth={true}
				></digi-media-image>
			</div>
		</div>
	</digi-layout-container>
</div>

<style>
	div :global(digi-navigation-breadcrumbs) {
		--digi--navigation-breadcrumbs--item--color: var(--digi--color--text--primary);
		--digi--navigation-breadcrumbs--link--visited--color: var(--digi--color--grayscale--0);
		--digi--navigation-breadcrumbs--link--hover--focus--color: var(--digi--color--grayscale--0);
		--digi--navigation-breadcrumbs--link--color: var(--digi--color--grayscale--0);
	}
</style>
