<script lang="ts">
	import type { KommandeAktivitet } from '$lib/constants/tabeller';

	let {
		caption = 'Planering för april 2026',
		rows
	}: {
		caption?: string;
		rows: KommandeAktivitet[];
	} = $props();
</script>

<digi-table>
	<table>
		<caption>{caption}</caption>
		<thead>
			<tr>
				<th scope="col">Datum</th>
				<th scope="col">Aktivitet</th>
				<th scope="col">Ansvarig</th>
				<th scope="col">Status</th>
			</tr>
		</thead>
		<tbody>
			{#if rows.length === 0}
				<tr>
					<td class="empty-state" colspan="4">Inga träffar för valda filter.</td>
				</tr>
			{:else}
				{#each rows as rad (rad.datum)}
					<tr>
						<td>{rad.datum}</td>
						<td>{rad.aktivitet}</td>
						<td>{rad.ansvarig}</td>
						<td>{rad.status}</td>
					</tr>
				{/each}
			{/if}
		</tbody>
	</table>
</digi-table>

<style>
	table {
		width: 100%;
		border-collapse: collapse;
		min-width: 40rem;
	}

	caption {
		text-align: left;
		font-weight: 600;
		margin-bottom: 0.5rem;
	}

	th,
	td {
		border: 1px solid var(--digi--global--color--neutral--grayscale--lighter);
		padding: 0.625rem 0.75rem;
		text-align: left;
	}

	thead th {
		background: var(--digi--global--color--neutral--grayscale--lightest-2);
	}

	tbody tr:nth-child(even) {
		background: var(--digi--global--color--neutral--grayscale--lightest-3);
	}

	.empty-state {
		font-style: italic;
	}
</style>
