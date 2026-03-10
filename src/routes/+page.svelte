<script lang="ts">
	import SvelteLogo from '$lib/images/svelte-logo.svg';
	import { SITE_NAME } from '$lib/constants';
</script>

<svelte:head>
	<title>Start - {SITE_NAME}</title>
	<meta name="description" content={SITE_NAME} />
</svelte:head>

<section>
	<digi-layout-block af-vertical-padding={true}>
		<digi-typography-heading-jumbo af-text="Digi i Svelte"></digi-typography-heading-jumbo>
		<digi-typography-preamble>
			En POC för att utvärdera integrationen av Digi-komponenter i Svelte.
		</digi-typography-preamble>
		<div class="flex items-center gap-8">
			<digi-logo></digi-logo>
			<img src={SvelteLogo} alt="Svelte logo" width="80" height="80" />
		</div>
	</digi-layout-block>

	<digi-layout-block af-vertical-padding={true}>
		<h2>Varför Svelte?</h2>
		<p>
			Digi-komponenterna är byggda med Stencil som web components och går att använda i Svelte utan
			större problem.
		</p>
		<ul>
			<li>Enklare att rekrytera för och onboarda nya utvecklare på</li>
			<li>Mindre boilerplate ger snabbare leverans</li>
			<li>Lägre inlärningströskel jämfört med Angular utan att tappa designsystemets värde</li>
			<li>
				Web components-arkitekturen i Digi är designad för ramverksoberoende — vi nyttjar det som
				det är tänkt
			</li>
		</ul>

		<h3>Tekniskt</h3>
		<ul>
			<li>
				Läs in <code>defineCustomElements()</code>
				i root
				<code>+layout.svelte</code>
			</li>
			<li>Inaktivera SSR tills Digi har stöd för det</li>
			<li>Events fungerar med Sveltes syntax direkt (bevisat i denna POC)</li>
			<li>
				För att få bra stöd för intellisense behövde vi generare dessa från Digi-paketet via skript.
				Förslag att det flyttas till designsystemet i förlängningen.
			</li>
			<li>
				Tailwind v4-integration fungerar genom att generera <code>@theme</code>
				med digi-tokens. Team som vill använda Tailwind för layout och grid laddar in den filen i sin
				applikation. Förslagsvis flyttas detta också till designsystemet i förlängningen.
			</li>
			<li>Formulärkomponenter fungerar med validering och felhantering (bevisat i denna POC)</li>
		</ul>

		<h3>Fördelar</h3>
		<ul>
			<li>Enkelt att komma igång</li>
			<li>Digi-teamet äger och förvaltar fortfarande allt</li>
			<li>Automatisk uppdatering när Digi släpper nya versioner</li>
			<li>Ingen risk för divergens mot designsystemet</li>
		</ul>

		<h3>Risker</h3>
		<ul>
			<li>SSR-begränsningen finns kvar tills vidare</li>
			<li>
				Events från web components har ibland quirks, hanterbara men kräver kännedom om hur Stencil
				emittar events
			</li>
		</ul>
	</digi-layout-block>
</section>

<style>
	ul > li {
		list-style: disc;
	}
</style>
