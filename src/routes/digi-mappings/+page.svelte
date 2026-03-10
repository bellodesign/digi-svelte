<script lang="ts">
	import { SITE_NAME } from '$lib/constants';
	import type { PageData } from './$types';
	import { SvelteSet } from 'svelte/reactivity';

	let { data }: { data: PageData } = $props();

	const exportType = {
		Exportera: 'approved',
		Valfri: 'missing',
		'Ej nödvändig': 'neutral'
	} as const satisfies Record<string, 'approved' | 'missing' | 'neutral'>;

	type ExportKey = keyof typeof exportType;
	const exportKeys = Object.keys(exportType) as ExportKey[];

	const activeFilters = new SvelteSet<ExportKey>(exportKeys);

	function handleCheckboxChange(key: ExportKey, e: CustomEvent) {
		const checked = ((e.detail as Event).target as HTMLInputElement).checked;
		if (checked) activeFilters.add(key);
		else activeFilters.delete(key);
	}

	const filteredGroups = $derived(
		data.colorGroups
			.map((g) => ({
				...g,
				tokens: g.tokens.filter((t) => activeFilters.has(t.export as ExportKey))
			}))
			.filter((g) => g.tokens.length > 0)
	);

	const showPrimitives = $derived(activeFilters.has('Exportera'));

	function isLight(hex: string): boolean {
		const clean = hex.replace('#', '');
		if (clean.length < 6) return true;
		const r = parseInt(clean.slice(0, 2), 16);
		const g = parseInt(clean.slice(2, 4), 16);
		const b = parseInt(clean.slice(4, 6), 16);
		return r * 0.299 + g * 0.587 + b * 0.114 > 150;
	}
</script>

<svelte:head>
	<title>Digi Mappings - {SITE_NAME}</title>
</svelte:head>

<section>
	<digi-layout-block af-vertical-padding={true}>
		<digi-typography-heading-jumbo af-text="Digi Mappings"></digi-typography-heading-jumbo>
		<digi-typography-preamble>
			Mappning mellan digi-styles tokens och Tailwind-klasser. Visar vilka tokens som lämpar sig för
			export, vilka som kan förenklas med alias, och vilka som inte är nödvändiga i en
			Tailwind-integration.
		</digi-typography-preamble>
	</digi-layout-block>

	<digi-layout-block af-vertical-padding={true}>
		<strong>Export-rekommendation:</strong>
		<dl class="grid grid-cols-[auto_1fr] items-center gap-2">
			<dt>
				<digi-badge-status
					af-type="approved"
					af-variation="secondary"
					af-text="Exportera"
					af-size="small"
				></digi-badge-status>
			</dt>
			<dd>— lämplig som fristående Tailwind-klass</dd>
			<dt>
				<digi-badge-status
					af-type="missing"
					af-variation="secondary"
					af-text="Valfri"
					af-size="small"
				></digi-badge-status>
			</dt>
			<dd>— situationsanpassad, inkludera vid behov</dd>
			<dt>
				<digi-badge-status
					af-type="neutral"
					af-variation="secondary"
					af-text="Ej nödvändig"
					af-size="small"
				></digi-badge-status>
			</dt>
			<dd>— komponentspecifik eller primitiv, undvik i export</dd>
		</dl>
	</digi-layout-block>

	<digi-layout-block af-vertical-padding={true}>
		<div class="flex flex-wrap gap-6">
			{#each exportKeys as key (key)}
				<digi-form-checkbox
					af-label={key}
					af-checked={activeFilters.has(key)}
					onafOnChange={(e) => handleCheckboxChange(key, e)}
				></digi-form-checkbox>
			{/each}
		</div>
	</digi-layout-block>

	<digi-layout-block af-vertical-padding={true}>
		<h2>Semantiska färgtokens — web-AF25.json</h2>
		<p>
			Varje <code>--color-*</code>
			-variabel i
			<code>@theme</code>
			genererar klasser för
			<strong>alla</strong>
			färgegenskaper. Exempel:
		</p>
		<p class="example-line">
			<code>text--primary</code>
			→
			<code>--color-text-primary</code>
			→
			<code>text-text-primary</code>
			,
			<code>bg-text-primary</code>
			,
			<code>border-text-primary</code>
			,
			<code>ring-text-primary</code>
			…
		</p>
	</digi-layout-block>

	{#each filteredGroups as group (group.category)}
		<digi-layout-block af-vertical-padding={true}>
			<h3>
				{group.label}
				<span class="count">({group.tokens.length})</span>
			</h3>
			<div class="table-wrap">
				<table>
					<thead>
						<tr>
							<th>Token</th>
							<th>CSS-variabel</th>
							<th>Tailwind-variabel</th>
							<th>Värde</th>
							<th>Alias-förslag</th>
							<th>Export</th>
						</tr>
					</thead>
					<tbody>
						{#each group.tokens as token (token.key)}
							<tr>
								<td class="token-key">{token.key}</td>
								<td class="mono small">{token.cssVar}</td>
								<td class="mono small">{token.tailwindVar}</td>
								<td>
									<div class="swatch-cell">
										<span
											class="swatch"
											style:background-color={token.value}
											style:border-color={isLight(token.value) ? '#CACACA' : 'transparent'}
										></span>
										<span class="mono small">{token.value}</span>
									</div>
								</td>
								<td>
									{#if token.alias}
										<code class="alias">{token.alias}</code>
									{/if}
								</td>
								<td>
									<digi-badge-status
										af-type={exportType[token.export]}
										af-variation="secondary"
										af-text={token.export}
										af-size="small"
									></digi-badge-status>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</digi-layout-block>
	{/each}

	{#if showPrimitives}
		<digi-layout-block af-vertical-padding={true}>
			<h2>Icke-färgtokens — web.json</h2>
			<p>
				Border-radius från det semantiska aliasskiktet (
				<code>--digi--border-radius--*</code>
				). Spacing och typsnittsstorlekar från det globala primitiva tokenlagret — inget semantiskt aliasskikt
				finns för dessa. Alla genereras i Tailwind-exporten.
			</p>
		</digi-layout-block>

		<digi-layout-block af-vertical-padding={true}>
			<h3>
				Spacing <span class="count">({data.spacing.length})</span>
			</h3>
			<p>
				Varje <code>--spacing-*</code>
				-variabel genererar klasser för
				<strong>alla</strong>
				avståndegenskaper. Exempel:
			</p>
			<p class="example-line">
				<code>base</code>
				→
				<code>--spacing-base</code>
				→
				<code>p-base</code>
				,
				<code>m-base</code>
				,
				<code>gap-base</code>
				,
				<code>w-base</code>
				,
				<code>h-base</code>
				,
				<code>top-base</code>
				…
			</p>
			<div class="note mb-base flex items-start gap-3">
				<digi-icon-notification-warning
					style="--digi--icon--width: 1rem"
				></digi-icon-notification-warning>
				<p>
					Skalan innehåller 23 tokens med namn som
					<code>largest-10</code>
					och
					<code>smallest-7</code>
					. Namnen bär ingen semantisk kontext — ett team måste känna till skalan för att veta vilket
					värde de väljer.
				</p>
			</div>
			<div class="table-wrap">
				<table>
					<thead>
						<tr>
							<th>Token</th>
							<th>CSS-variabel</th>
							<th>Tailwind-variabel</th>
							<th>Värde</th>
							<th>Exempelklasser</th>
						</tr>
					</thead>
					<tbody>
						{#each data.spacing as token (token.key)}
							<tr>
								<td class="token-key">{token.key}</td>
								<td class="mono small">{token.cssVar}</td>
								<td class="mono small">{token.tailwindVar}</td>
								<td class="mono small">{token.value}</td>
								<td class="mono small">{token.exampleClass}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</digi-layout-block>

		<digi-layout-block af-vertical-padding={true}>
			<h3>
				Border-radius <span class="count">({data.radius.length})</span>
			</h3>
			<p>
				Varje <code>--radius-*</code>
				-variabel genererar
				<strong>enbart</strong>
				<code>rounded-*</code>
				-klasser. Exempel:
			</p>
			<p class="example-line">
				<code>secondary</code>
				→
				<code>--radius-secondary</code>
				→
				<code>rounded-secondary</code>
			</p>
			<div class="note mb-base flex items-start gap-3">
				<digi-icon-notification-warning
					style="--digi--icon--width: 1rem"
				></digi-icon-notification-warning>
				<p>
					Namn som
					<code>complementary-1</code>
					och
					<code>complementary-2</code>
					är inte självförklarande utanför designsystemets kontext. Dessutom saknar ett antal primitiva
					värden (0.25 rem, 0.5 rem) en alias-motsvarighet och ingår inte i exporten.
				</p>
			</div>
			<div class="table-wrap">
				<table>
					<thead>
						<tr>
							<th>Token</th>
							<th>CSS-variabel</th>
							<th>Tailwind-variabel</th>
							<th>Värde</th>
							<th>Exempelklass</th>
						</tr>
					</thead>
					<tbody>
						{#each data.radius as token (token.key)}
							<tr>
								<td class="token-key">{token.key}</td>
								<td class="mono small">{token.cssVar}</td>
								<td class="mono small">{token.tailwindVar}</td>
								<td class="mono small">{token.value}</td>
								<td class="mono small">{token.exampleClass}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</digi-layout-block>

		<digi-layout-block af-vertical-padding={true}>
			<h3>
				Typsnittsstorlekar <span class="count">({data.fontSizes.length})</span>
			</h3>
			<p>
				Varje <code>--text-*</code>
				-variabel genererar
				<strong>enbart</strong>
				<code>text-*</code>
				-klasser för
				<code>font-size</code>
				— inte textfärg. Exempel:
			</p>
			<p class="example-line">
				<code>base</code>
				→
				<code>--text-base</code>
				→
				<code>text-base</code>
				(font-size: 1rem)
			</p>
			<div class="note mb-base flex items-start gap-3">
				<digi-icon-notification-warning
					style="--digi--icon--width: 1rem"
				></digi-icon-notification-warning>
				<p>
					<code>--text-*</code>
					-namnen delar namnrymd med Tailwinds inbyggda typsnittsskala (
					<code>text-sm</code>
					,
					<code>text-base</code>
					,
					<code>text-lg</code>
					…). Digi-tokenet
					<code>text-base</code>
					råkar ha samma värde (1rem) men det är en tillfällighet — vid framtida uppdateringar kan detta
					kollidera och åsidosätta Tailwinds standardvärden.
				</p>
			</div>
			<div class="table-wrap">
				<table>
					<thead>
						<tr>
							<th>Token</th>
							<th>CSS-variabel</th>
							<th>Tailwind-variabel</th>
							<th>Värde</th>
							<th>Exempelklass</th>
						</tr>
					</thead>
					<tbody>
						{#each data.fontSizes as token (token.key)}
							<tr>
								<td class="token-key">{token.key}</td>
								<td class="mono small">{token.cssVar}</td>
								<td class="mono small">{token.tailwindVar}</td>
								<td class="mono small">{token.value}</td>
								<td class="mono small">{token.exampleClass}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</digi-layout-block>
	{/if}
</section>

<style lang="postcss">
	@reference '$lib/styles/tailwind.css';

	.count {
		@apply text-sm font-normal;
		color: var(--digi--color--text--description);
	}

	.example-line {
		@apply rounded px-3 py-2 font-mono text-sm;
		background-color: var(--digi--color--background--secondary);
	}

	.note {
		@apply text-sm;
		color: var(--digi--color--text--description);
	}

	.table-wrap {
		@apply overflow-x-auto;
	}

	table {
		@apply w-full border-collapse text-sm;
	}

	thead tr {
		background-color: var(--digi--color--background--secondary);
	}

	th {
		@apply px-3 py-2 text-left font-semibold;
		border-bottom: 1px solid var(--digi--color--divider--primary);
		white-space: nowrap;
	}

	td {
		@apply px-3 py-2 align-middle;
		border-bottom: 1px solid var(--digi--color--divider--secondary);
	}

	tr:last-child td {
		border-bottom: none;
	}

	.token-key {
		@apply font-mono text-xs;
		color: var(--digi--color--text--interactive--primary);
	}

	.mono {
		@apply font-mono;
	}

	.small {
		@apply text-xs;
	}

	.swatch-cell {
		@apply flex items-center gap-2;
	}

	.swatch {
		@apply inline-block h-5 w-5 shrink-0 rounded;
		border-width: 1px;
		border-style: solid;
	}

	.alias {
		@apply rounded bg-background-brand-primary px-1.5 py-0.5 text-xs;
		color: var(--digi--color--text--secondary);
	}
</style>
