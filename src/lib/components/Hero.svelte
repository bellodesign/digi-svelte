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
	<digi-layout-container>
		
	{#if breadcrumb}
		<div class="hero__breadcrumb">
			{@render breadcrumb()}
		</div>
	{/if}

	<div class="hero__grid">
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
		<div class="hero__image">
			<digi-media-image af-src={imageSrc} af-alt={imageAlt} af-fullwidth={true}></digi-media-image>
		</div>
	</div>
	
	</digi-layout-container>

</div>

<style lang="postcss">
	@reference "$lib/styles/tailwind.css";

	.hero {
		@apply flex flex-col gap-base bg-background-brand-primary text-grayscale-0;
		--digi--color--text--primary: var(--digi--color--grayscale--0);
	}
	
	.hero :global(digi-navigation-breadcrumbs) {
    --digi--navigation-breadcrumbs--item--color: var(--digi--color--text--primary);
    --digi--navigation-breadcrumbs--link--visited--color: var(--digi--color--grayscale--0);
    --digi--navigation-breadcrumbs--link--hover--focus--color: var(--digi--color--grayscale--0);
    --digi--navigation-breadcrumbs--link--color: var(--digi--color--grayscale--0);
	}

	.hero__breadcrumb {
		@apply my-large;
	}

	.hero__grid {
		@apply grid gap-base items-center md:grid-cols-[2fr_1fr];
	}

	.hero__content {
		@apply flex flex-col gap-base mb-largest-3;
	}

	.hero__actions {
		@apply flex flex-wrap gap-small;
	}

	.hero__image {
		@apply hidden md:block;
	}
</style>
