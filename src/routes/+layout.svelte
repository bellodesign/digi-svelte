<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	// import { ModeWatcher, toggleMode } from 'mode-watcher';
	import './layout.css';

	import { defineCustomElements } from '@designsystem-se/af/loader';
	defineCustomElements();

	let { children } = $props();
</script>

<!-- <ModeWatcher />

<p>Lite text o grejer</p>

<digi-button onafOnClick={toggleMode}>Toggla tema</digi-button> -->

<digi-typography>
	<div class="grid min-h-dvh grid-rows-[auto_1fr_auto]">
		<Header />
		<main>{@render children()}</main>
		<Footer />
	</div>
</digi-typography>
