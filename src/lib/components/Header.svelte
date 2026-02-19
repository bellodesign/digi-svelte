<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { SITE_NAME } from '$lib/constants';
</script>

<digi-header af-system-name={SITE_NAME} af-hide-system-name="false" af-menu-button-text="Meny">
	<a slot="header-logo" aria-label="Designsystemets startsida" href={resolve('/')}></a>
	<div slot="header-content">
		<digi-header-avatar
			af-name="Linda Karlsson"
			af-signature="KALIA"
			af-hide-signature="true"
			af-show-placeholder-image="true"
		></digi-header-avatar>
	</div>

	<div slot="header-navigation">
		<digi-header-navigation
			af-close-button-text="Stäng"
			af-close-button-aria-label="Stäng meny"
			af-nav-aria-label="Huvudmeny"
		>
			<digi-header-navigation-item af-current-page={page.url.pathname === '/'}>
				<a href={resolve('/')}>Start</a>
			</digi-header-navigation-item>

			<digi-header-navigation-item af-current-page={page.url.pathname === '/om-sidan'}>
				<a href={resolve('/om-sidan')}>Om sidan</a>
			</digi-header-navigation-item>

			<digi-header-navigation-item af-current-page={page.url.pathname === '/sok'}>
				<a href={resolve('/sok')}>Sök</a>
			</digi-header-navigation-item>
		</digi-header-navigation>
	</div>
</digi-header>
