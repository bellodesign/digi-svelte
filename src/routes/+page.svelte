<script lang="ts">
	import SvelteLogo from '$lib/images/svelte-logo.svg';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<digi-layout-block af-vertical-padding="true">
		<digi-typography-heading-jumbo af-text="Digi i Svelte"></digi-typography-heading-jumbo>
	</digi-layout-block>
	<digi-layout-block af-vertical-padding="true">
		<div class="flex items-center gap-8">
			<digi-logo></digi-logo>
			<img src={SvelteLogo} alt="Svelte logo" width="120" height="120" />
		</div>
	</digi-layout-block>
</section>
