<script lang="ts">
	import { onMount } from 'svelte';
	import AktivitetsTabell from '$lib/components/AktivitetsTabell.svelte';
	import { SITE_NAME } from '$lib/constants';
	import { KOMMANDE_AKTIVITETER } from '$lib/constants/tabeller';

	let visarFilter = $state(false);
	let visarSparaVy = $state(false);

	let datumFilter = $state('');
	let aktivitetFilter = $state('');
	let ansvarigFilter = $state('Alla');
	let statusFilter = $state('Alla');
	let nyVyNamn = $state('');
	let valdVyId = $state('');
	let sparadeVyer = $state<SparadVy[]>([]);

	type FilterNyckel = 'datum' | 'aktivitet' | 'ansvarig' | 'status';
	type FilterState = {
		datumFilter: string;
		aktivitetFilter: string;
		ansvarigFilter: string;
		statusFilter: string;
	};
	type SparadVy = {
		id: string;
		name: string;
		filters: FilterState;
	};

	const STORAGE_KEY = 'tabeller:kommande-aktiviteter:sparade-vyer';
	const LAST_SELECTED_VIEW_KEY = 'tabeller:kommande-aktiviteter:senast-vald-vy';

	const ansvariga = [...new Set(KOMMANDE_AKTIVITETER.map((rad) => rad.ansvarig))];
	const statusar = [...new Set(KOMMANDE_AKTIVITETER.map((rad) => rad.status))];

	const filtreradeAktiviteter = $derived(
		KOMMANDE_AKTIVITETER.filter((rad) => {
			const matcharDatum = rad.datum.toLowerCase().includes(datumFilter.trim().toLowerCase());
			const matcharAktivitet = rad.aktivitet
				.toLowerCase()
				.includes(aktivitetFilter.trim().toLowerCase());
			const matcharAnsvarig = ansvarigFilter === 'Alla' || rad.ansvarig === ansvarigFilter;
			const matcharStatus = statusFilter === 'Alla' || rad.status === statusFilter;

			return matcharDatum && matcharAktivitet && matcharAnsvarig && matcharStatus;
		})
	);

	const aktivaFilter = $derived.by(() => {
		const filter: Array<{ key: FilterNyckel; label: string }> = [];

		if (datumFilter.trim()) {
			filter.push({ key: 'datum', label: `Datum: ${datumFilter.trim()}` });
		}

		if (aktivitetFilter.trim()) {
			filter.push({ key: 'aktivitet', label: `Aktivitet: ${aktivitetFilter.trim()}` });
		}

		if (ansvarigFilter !== 'Alla') {
			filter.push({ key: 'ansvarig', label: `Ansvarig: ${ansvarigFilter}` });
		}

		if (statusFilter !== 'Alla') {
			filter.push({ key: 'status', label: `Status: ${statusFilter}` });
		}

		return filter;
	});

	const vyHarAndrats = $derived.by(() => {
		if (!valdVyId) return false;
		const vy = sparadeVyer.find((v) => v.id === valdVyId);
		if (!vy) return false;
		const nuvarande = hamtaFilterState();
		return (
			nuvarande.datumFilter !== vy.filters.datumFilter ||
			nuvarande.aktivitetFilter !== vy.filters.aktivitetFilter ||
			nuvarande.ansvarigFilter !== vy.filters.ansvarigFilter ||
			nuvarande.statusFilter !== vy.filters.statusFilter
		);
	});

	function nollstallFilter() {
		datumFilter = '';
		aktivitetFilter = '';
		ansvarigFilter = 'Alla';
		statusFilter = 'Alla';
		valdVyId = '';
		sparaValdVyId('');
	}

	function taBortFilter(key: FilterNyckel) {
		if (key === 'datum') datumFilter = '';
		if (key === 'aktivitet') aktivitetFilter = '';
		if (key === 'ansvarig') ansvarigFilter = 'Alla';
		if (key === 'status') statusFilter = 'Alla';
	}

	function hamtaFilterState(): FilterState {
		return {
			datumFilter,
			aktivitetFilter,
			ansvarigFilter,
			statusFilter
		};
	}

	function appliceraFilterState(filters: FilterState) {
		datumFilter = filters.datumFilter;
		aktivitetFilter = filters.aktivitetFilter;
		ansvarigFilter = filters.ansvarigFilter;
		statusFilter = filters.statusFilter;
	}

	function sparaVyerIStorage(vyer: SparadVy[]) {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(vyer));
	}

	function sparaValdVyId(vyId: string) {
		if (vyId) {
			localStorage.setItem(LAST_SELECTED_VIEW_KEY, vyId);
			return;
		}

		localStorage.removeItem(LAST_SELECTED_VIEW_KEY);
	}

	function sparaVy() {
		const namn = nyVyNamn.trim();
		if (!namn) return;

		const befintligVy = sparadeVyer.find((vy) => vy.name.toLowerCase() === namn.toLowerCase());

		if (befintligVy) {
			const uppdateradeVyer = sparadeVyer.map((vy) =>
				vy.id === befintligVy.id ? { ...vy, filters: hamtaFilterState() } : vy
			);
			sparadeVyer = uppdateradeVyer;
			sparaVyerIStorage(uppdateradeVyer);
			valdVyId = befintligVy.id;
			sparaValdVyId(befintligVy.id);
		} else {
			const nyVy: SparadVy = {
				id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
				name: namn,
				filters: hamtaFilterState()
			};
			const uppdateradeVyer = [...sparadeVyer, nyVy];
			sparadeVyer = uppdateradeVyer;
			sparaVyerIStorage(uppdateradeVyer);
			valdVyId = nyVy.id;
			sparaValdVyId(nyVy.id);
		}

		nyVyNamn = '';
		visarSparaVy = false;
	}

	function uppdateraVy() {
		if (!valdVyId) return;

		const uppdateradeVyer = sparadeVyer.map((vy) =>
			vy.id === valdVyId ? { ...vy, filters: hamtaFilterState() } : vy
		);
		sparadeVyer = uppdateradeVyer;
		sparaVyerIStorage(uppdateradeVyer);
	}

	function taBortVy() {
		if (!valdVyId) return;

		const uppdateradeVyer = sparadeVyer.filter((vy) => vy.id !== valdVyId);
		sparadeVyer = uppdateradeVyer;
		sparaVyerIStorage(uppdateradeVyer);
		valdVyId = '';
		sparaValdVyId('');
		nollstallFilter();
	}

	function valjVy(vyId: string) {
		valdVyId = vyId;
		sparaValdVyId(vyId);

		if (!vyId) {
			nollstallFilter();
			return;
		}

		const vy = sparadeVyer.find((item) => item.id === vyId);
		if (!vy) return;

		appliceraFilterState(vy.filters);
	}

	onMount(() => {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return;

		try {
			const parsed = JSON.parse(raw);
			if (Array.isArray(parsed)) {
				sparadeVyer = parsed as SparadVy[];

				const senastValdVyId = localStorage.getItem(LAST_SELECTED_VIEW_KEY) ?? '';
				if (senastValdVyId && sparadeVyer.some((vy) => vy.id === senastValdVyId)) {
					valjVy(senastValdVyId);
				} else if (senastValdVyId) {
					sparaValdVyId('');
				}
			}
		} catch {
			sparadeVyer = [];
			sparaValdVyId('');
		}
	});
</script>

<svelte:head>
	<title>Tabeller - {SITE_NAME}</title>
	<meta name="description" content={`Exempel på tabeller i ${SITE_NAME}`} />
</svelte:head>

<section>
	<digi-layout-block af-vertical-padding={true}>
		<digi-typography-heading-jumbo af-text="Tabeller"></digi-typography-heading-jumbo>
		<digi-typography-preamble>
			Exempel på hur tabeller kan presenteras med semantisk HTML i Digi-layout.
		</digi-typography-preamble>
	</digi-layout-block>

	<digi-layout-block af-vertical-padding={true}>
		<div class="table-header-row">
			<h2>Kommande aktiviteter</h2>
			<digi-button onafOnClick={() => (visarFilter = !visarFilter)} af-variation="function">
				<digi-icon-filter slot="icon"></digi-icon-filter>
				{visarFilter ? 'Dölj filter' : 'Filtrera'}
			</digi-button>
		</div>

		{#if visarFilter}
			<div
				id="tabell-filterpanel"
				class="filter-panel"
				role="region"
				aria-label="Filter för tabell"
			>
				<digi-button
					af-variation="function"
					onafOnClick={() => (visarFilter = false)}
					class="absolute top-2 right-2"
				>
					<digi-icon-x slot="icon"></digi-icon-x>
					Stäng
				</digi-button>

				<div class="saved-views-row">
					{#if sparadeVyer.length > 0}
						<digi-form-select
							af-label="Välj filtrering"
							af-value={valdVyId}
							onafOnChange={(e) => valjVy((e.target as HTMLElement & { value: string }).value)}
							class="min-w-55"
						>
							<option value="">Välj filter</option>

							{#each sparadeVyer as vy (vy.id)}
								<option value={vy.id}>{vy.name}</option>
							{/each}
						</digi-form-select>

						{#if valdVyId}
							<digi-button af-variation="function" onafOnClick={taBortVy}>
								<digi-icon-trash slot="icon"></digi-icon-trash>
								Ta bort
							</digi-button>
							{#if vyHarAndrats}
								<digi-button af-variation="function" onafOnClick={uppdateraVy}>
									<digi-icon-update slot="icon"></digi-icon-update>
									Uppdatera filter
								</digi-button>
							{/if}
						{/if}
					{/if}

					{#if aktivaFilter.length > 0}
						<digi-button onafOnClick={() => (visarSparaVy = !visarSparaVy)} af-variation="function">
							<digi-icon-plus slot="icon"></digi-icon-plus>
							Spara filter
						</digi-button>
					{/if}
				</div>

				{#if visarSparaVy}
					<div class="save-view-panel" role="region" aria-label="Spara filter">
						<digi-form-input
							af-label="Namn på filter"
							af-value={nyVyNamn}
							onafOnInput={(e) => {
								nyVyNamn = ((e as CustomEvent).detail as InputEvent)?.target
									? (((e as CustomEvent).detail as InputEvent).target as HTMLInputElement).value
									: '';
							}}
						></digi-form-input>
						<div class="save-view-actions">
							<digi-button onafOnClick={sparaVy}>Spara</digi-button>
							<digi-button af-variation="secondary" onafOnClick={() => (visarSparaVy = false)}>
								Avbryt
							</digi-button>
						</div>
					</div>
				{/if}

				<div class="filter-panel-header">
					<h3 class="sr-only">Filter</h3>
				</div>

				<div class="filter-grid">
					<digi-form-input
						af-label="Datum"
						af-value={datumFilter}
						onafOnInput={(e) => {
							datumFilter = ((e as CustomEvent).detail as InputEvent)?.target
								? (((e as CustomEvent).detail as InputEvent).target as HTMLInputElement).value
								: '';
						}}
					></digi-form-input>
					<digi-form-input
						af-label="Aktivitet"
						af-value={aktivitetFilter}
						onafOnInput={(e) => {
							aktivitetFilter = ((e as CustomEvent).detail as InputEvent)?.target
								? (((e as CustomEvent).detail as InputEvent).target as HTMLInputElement).value
								: '';
						}}
					></digi-form-input>
					<digi-form-select
						af-label="Ansvarig"
						af-value={ansvarigFilter}
						onafOnChange={(e) => {
							ansvarigFilter = (e.target as HTMLElement & { value: string }).value;
						}}
					>
						<option value="Alla">Alla</option>
						{#each ansvariga as ansvarig (ansvarig)}
							<option value={ansvarig}>{ansvarig}</option>
						{/each}
					</digi-form-select>
					<digi-form-select
						af-label="Status"
						af-value={statusFilter}
						onafOnChange={(e) => {
							statusFilter = (e.target as HTMLElement & { value: string }).value;
						}}
					>
						<option value="Alla">Alla</option>
						{#each statusar as status (status)}
							<option value={status}>{status}</option>
						{/each}
					</digi-form-select>
				</div>
			</div>
		{/if}

		{#if aktivaFilter.length > 0}
			<div class="active-filters" aria-live="polite">
				<digi-button onafOnClick={nollstallFilter} af-variation="function">
					<digi-icon-trash slot="icon"></digi-icon-trash>
					Rensa filtrering ({aktivaFilter.length})
				</digi-button>

				<div class="filter-tags" role="list" aria-label="Valda filter">
					{#each aktivaFilter as filter (filter.key)}
						<digi-tag
							af-size="small"
							af-text={filter.label}
							onafOnClick={() => taBortFilter(filter.key)}
						></digi-tag>
					{/each}
				</div>
			</div>
		{/if}

		<AktivitetsTabell rows={filtreradeAktiviteter} />
	</digi-layout-block>
</section>

<style>
	h2 {
		margin: 0;
	}

	.table-header-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	.saved-views-row {
		display: flex;
		align-items: flex-end;
		gap: 0.5rem;
		flex-wrap: wrap;

		&:not(:empty) {
			margin-bottom: 1rem;
		}
	}

	.save-view-panel {
		display: grid;
		max-width: 300px;
		gap: 0.75rem;
		background: var(--digi--global--color--neutral--grayscale--lightest-3);
		margin-block: 1rem;
	}

	.save-view-actions {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.filter-panel {
		background: var(--digi--color--background--interactive--default--tertiary);
		padding: 1rem;
		margin-bottom: 1.5rem;
		position: relative;
	}

	.filter-panel h3 {
		margin: 0;
	}

	.filter-grid {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 1rem;
	}

	.active-filters {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		flex-wrap: wrap;
		margin-bottom: 1rem;
	}

	.filter-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	@media (max-width: 900px) {
		.filter-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (max-width: 640px) {
		.table-header-row,
		.filter-panel-header {
			flex-direction: column;
			align-items: stretch;
		}

		.saved-views-row {
			align-items: stretch;
		}

		.filter-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
