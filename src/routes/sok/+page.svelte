<script lang="ts">
	import { goto } from '$app/navigation';

	let { data } = $props();

	function handleSubmitSearch(event: CustomEvent) {
		const searchTerm = event.detail;
		const params = new URLSearchParams({ q: searchTerm });
		goto(`?${params}`);
	}
</script>

<svelte:head>
	<title>Sök</title>
	<meta name="description" content="På den här sidan kan man testa sök..." />
</svelte:head>

<digi-layout-block af-vertical-padding={true}>
	<digi-typography-heading-jumbo af-text="Sök jobb"></digi-typography-heading-jumbo>

	<div class="grid grid-cols-12 gap-4">
		<digi-form-input-search
			af-label="Fritextsökning"
			af-variation="medium"
			af-type="search"
			af-button-text="Knapptext"
			af-value={data.query}
			onafOnSubmitSearch={handleSubmitSearch}
			class="col-span-8"
		>
		</digi-form-input-search>
	</div>
</digi-layout-block>
<digi-layout-block af-vertical-padding={true} af-variation="secondary">
	{#if data.jobs.length === 0 && data.query}
		<p class="py-4">Inga jobb hittades</p>
	{/if}
	{#if data.jobs.length > 0}
		<p class="search-result-info py-4">
			Visar <strong>{data.jobs.length} jobb</strong> av {data.total} totalt
		</p>
	{/if}

	<div class="result grid grid-cols-12 gap-4">
		<div class="col-span-8 flex flex-col gap-4">
			{#each data.jobs as job (job.id)}
				<div class="job bg-white p-6">
					<h2>{job.headline}</h2>
					<p>{job.workplace_address.municipality} | {job.occupation_group.label}</p>
					<p>
						{job.employer.name} | {#if job.application_details.url}
							<digi-link-external af-href={job.application_details.url} af-target="_blank"
								>Ansök på {job.employer.name}</digi-link-external
							>
						{/if}
					</p>
					<digi-expandable-accordion
						af-heading="Beskrivning"
					>
						<p>{@html job.description.text_formatted}</p>
					</digi-expandable-accordion>
				</div>
			{/each}
		</div>
	</div>
</digi-layout-block>

<style>
	.search-result-info {
		font-size: var(--digi--typography--heading-2--font-size--desktop);
	}

	.job h2 {
		margin-bottom: var(--digi--padding--smaller);
	}
</style>
