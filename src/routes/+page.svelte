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
			<div class="flex items-center gap-4">
				<digi-button>Primär</digi-button>
				<digi-button af-variation="secondary">Sekundär</digi-button>
				<digi-button af-variation="tertiary">Tertiär</digi-button>
			</div>
			<div class="flex items-center gap-4">
				<div class="bg-background-primary border border-border-accent-primary w-12 h-12 rounded-smaller"></div>
				<div class="bg-background-secondary border border-border-accent-primary w-12 h-12 rounded-smaller"></div>
			</div>
		</div>
	</digi-layout-block>

</section>
