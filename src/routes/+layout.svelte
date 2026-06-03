<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import './layout.css';

	import { browser } from '$app/environment';

	if (browser) {
		import('@designsystem-se/af/loader').then((m) => m.defineCustomElements());
	}

	let { children } = $props();
</script>

<digi-typography>
	<div class="grid min-h-dvh grid-rows-[auto_1fr_auto]">
		<Header />
		<main>{@render children()}</main>
		<Footer />
	</div>
</digi-typography>
