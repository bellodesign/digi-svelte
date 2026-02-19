<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import './layout.css';

	import { defineCustomElements } from '@designsystem-se/af/loader';
	defineCustomElements();

	export const ssr = false;

	let { children } = $props();
</script>

<digi-typography>
	<div class="app">
		<Header />
		<main>{@render children()}</main>
		<Footer />
	</div>
</digi-typography>

<style>
	.app {
		display: grid;
		grid-template-rows: auto 1fr auto;
		min-height: 100vh;
	}
</style>
