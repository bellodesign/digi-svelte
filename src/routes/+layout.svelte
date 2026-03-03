<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import './layout.css';

	import { defineCustomElements } from '@designsystem-se/af/loader';
	defineCustomElements();

	let { children } = $props();
</script>

<digi-typography>
	<div class="grid min-h-screen grid-rows-[auto_1fr_auto]">
		<Header />
		<main>{@render children()}</main>
		<Footer />
	</div>
</digi-typography>
