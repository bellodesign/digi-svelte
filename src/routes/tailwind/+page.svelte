<script lang="ts">
	import { SITE_NAME } from '$lib/constants';

	const themeCode = `/* Genereras av scripts/generate-tailwind-theme.js */
@theme {
  /* Färger — från web-AF25.json via digiCSSVariable */
  --color-text-primary:             var(--digi--color--text--primary);
  --color-background-brand-primary: var(--digi--color--background--brand-primary);

  /* Spacing — från web.json (global/spacing) */
  --spacing-base:  var(--digi--global--spacing--base);
  --spacing-large: var(--digi--global--spacing--large);

  /* Border radius — från web.json (alias layer) */
  --radius-secondary: var(--digi--border-radius--secondary);
}`;

	const tokenJsonCode = `/* web-AF25.json — faktisk struktur (förenklad) */
{
  "text--primary": {
    "digiName": "text--primary",
    "digiCSSVariable": "--digi--color--text--primary",
    "digiRecursiveValue": "#333333",
    "resolvedType": "COLOR",

    /* Förslag: lägg till detta fält */
    "tailwind": true
  }
}`;

	const aliasCode = `/* Förslag: tailwindAlias-fält i web-AF25.json */
{
  "text--primary": {
    "digiCSSVariable": "--digi--color--text--primary",
    "tailwind": true,
    "tailwindAlias": "text"   // genererar text-text (alias) + text-text-primary (standard)
  },
  "background--brand-primary": {
    "digiCSSVariable": "--digi--color--background--brand-primary",
    "tailwind": true,
    "tailwindAlias": "brand"  // genererar bg-brand (alias) + bg-background-brand-primary (standard)
  }
}`;
</script>

<svelte:head>
	<title>Tailwind + Digi - {SITE_NAME}</title>
</svelte:head>

<section>
	<digi-layout-block af-vertical-padding={true}>
		<digi-typography-heading-jumbo af-text="Digi + Tailwind CSS v4"></digi-typography-heading-jumbo>
		<digi-typography-preamble>
			En utforskning av hur digi-styles tokens kan erbjudas för användning med Tailwind v4.
		</digi-typography-preamble>
	</digi-layout-block>

	<digi-layout-block af-vertical-padding={true}>
		<h2>1. Bakgrund och mål</h2>
		<p>
			Designsystemet (digi-styles) levererar semantiska design-tokens men saknar
			Tailwind-integration. Team som vill använda Tailwind för layout, grid, flexbox och spacing
			saknar i dag en officiell brygga.
		</p>
		<p>
			Idén är att man skulle kunna leverera en <code>@theme</code>
			-fil i npm-paketet som mappar digi-styles tokens till Tailwind v4-klasser. Team väljer själva att
			importera den, team som inte använder Tailwind påverkas inte.
		</p>

		<h2>2. Hur bryggan fungerar</h2>
		<p>
			Filen är en ren CSS-brygga utan hårdkodade värden. Varje token pekar tillbaka på sin
			digi-styles CSS-variabel:
		</p>
		<digi-code-block af-code={themeCode} af-language="css"></digi-code-block>
		<p>
			Tailwind v4 läser <code>@theme</code>
			och genererar utility-klasser automatiskt:
			<code>text-text-primary</code>
			,
			<code>bg-background-brand-primary</code>
			,
			<code>p-base</code>
			,
			<code>rounded-secondary</code>
			och så vidare.
		</p>
		<p>
			<strong>Nyckelfördel:</strong>
			om digi-styles uppdaterar ett tokenvärde uppdateras alla Tailwind-klasser som bygger på det automatiskt.
			Den enda källan till sanning bevaras.
		</p>

		<h2>3. Tokenurval via JSON-taggar</h2>
		<p>
			Alla tokens i <code>web-AF25.json</code>
			lämpar sig inte som Tailwind-klasser. Komponentspecifika tokens som
			<code>misc--skeleton</code>
			eller
			<code>spinner--path</code>
			används sällan på egen hand.
		</p>
		<h3>Föreslagen lösning</h3>
		<p>
			Lägg till en <code>tailwind</code>
			-tagg i token-JSON som genereringsskriptet läser. Endast taggade tokens inkluderas i
			<code>@theme</code>
			-utdata.
		</p>
		<digi-code-block af-code={tokenJsonCode} af-language="javascript"></digi-code-block>
		<h3>Varför detta är rätt tillvägagångssätt</h3>
		<ul>
			<li>Designsystemteamet behåller kontroll över vad som exponeras</li>
			<li>Minskar mängden klasser — endast meningsfulla tokens inkluderas</li>
			<li>Självdokumenterande — taggen signalerar avsikt för framtida förvaltare</li>
			<li>En tumregel: tagga en token om en utvecklare skulle använda den som fristående klass</li>
		</ul>

		<h2>4. Tokennamn i Tailwind</h2>
		<p>
			Det finns en avvägning mellan att behålla exakt samma namn som i designsystemets dokumentation
			och att optimera för DX (utvecklarupplevelsen).
		</p>
		<h3>Behåll identiska namn (rekommenderat)</h3>
		<ul>
			<li>
				Ingen kognitiv overhead — <code>bg-background-brand-primary</code>
				matchar dokumentationen exakt
			</li>
			<li>Ingen risk för förvirring mellan klassnamn och dokumenterade tokennamn</li>
			<li>Skriptet förblir enkelt och mekaniskt utan mappningslogik</li>
		</ul>
		<h3>Tillåt alias (valfri utökning)</h3>
		<p>
			Ett <code>tailwindAlias</code>
			-fält i JSON kan generera en förkortad klass vid sidan av den standardiserade.
		</p>
		<digi-code-block af-code={aliasCode} af-language="javascript"></digi-code-block>
		<p>
			Skriptet genererar då båda: <code>bg-background-brand-primary</code>
			(standard) och
			<code>bg-brand</code>
			(alias) för
			<code>background--brand-primary</code>
			. Team kan använda vilket som helst.
		</p>
		<h3>Risk att hantera</h3>
		<p>
			Om alias används kan en utvecklare se <code>bg-brand</code>
			i kodbasen, söka i dokumentationen och inte hitta det. Motverka detta med tydlig dokumentation av
			alias, en genererad referenssida och genom att begränsa alias till de vanligast använda tokens.
		</p>

		<h2>5. Genereringsskript</h2>
		<p>
			Filen <code>@theme</code>
			genereras automatiskt av
			<code>scripts/generate-tailwind-theme.js</code>
			utifrån digi-styles token-JSON och ska aldrig redigeras manuellt.
		</p>
		<h3>Rekommendationer</h3>
		<ul>
			<li>Kör skriptet i CI så att filen hålls synkroniserad när digi-styles får nya tokens</li>
			<li>Checka in den genererade filen i repot så att den är tillgänglig utan ett byggsteg</li>
			<li>Lägg till en checksumma eller hash-kommentar överst för att enkelt upptäcka avdrift</li>
			<li>
				Låt CI misslyckas om genererad utdata skiljer sig från incheckad fil — likt en
				lockfile-kontroll
			</li>
		</ul>

		<h2>6. Tailwind v4 som beroende</h2>
		<p>
			<code>@theme</code>
			är en Tailwind v4-exklusiv funktion och fungerar inte i v3. npm-paketet bör:
		</p>
		<ul>
			<li>
				Deklarera <code>tailwindcss &gt;= 4.0.0</code>
				som peer dependency
			</li>
			<li>Dokumentera detta tydligt i README</li>
			<li>Överväga att lägga till ett tydligt felmeddelande vid användning med v3</li>
		</ul>

		<h2>7. Sammanfattning och nästa steg</h2>
		<h3>Vad som ska byggas</h3>
		<ul>
			<li>
				Lägg till ett <code>tailwind</code>
				-fält (booleskt eller typad sträng) i token-schemat
			</li>
			<li>
				Uppdatera <code>generate-tailwind-theme.js</code>
				för att filtrera på det fältet
			</li>
			<li>
				Lägg till stöd för <code>tailwindAlias</code>
				för förkortad klassgenerering
			</li>
			<li>
				Leverera den genererade <code>@theme</code>
				-filen som en del av digi-styles npm-paketet
			</li>
			<li>Lägg till en CI-kontroll för att hålla den genererade filen synkroniserad</li>
		</ul>
		<h3>Vad som ska dokumenteras</h3>
		<ul>
			<li>Vilka tokens som taggats och varför — etablera tydliga kriterier</li>
			<li>Aliasmappningar om alias införs</li>
			<li>Kravet på Tailwind v4 som peer dependency</li>
			<li>
				Hur man importerar <code>@theme</code>
				-filen i ett projekt
			</li>
		</ul>
	</digi-layout-block>
</section>

<style>
	ul > li {
		list-style: disc;
	}
</style>
