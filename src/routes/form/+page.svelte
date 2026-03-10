<script lang="ts">
	import { SITE_NAME } from '$lib/constants';

	let name = $state('');
	let email = $state('');
	let role = $state('');
	let selectedDates = $state<Date[]>([]);
	// Problem 4-test: komplex prop (Date, Date[]) kan inte passas via attribut.
	// Kebab-case (af-min-date={date}) stringifieras via setAttribute → "[object Object]" (fungerar ej).
	// camelCase (afMinDate={date}) sätts som DOM-property → fungerar, men ger TS-fel.
	// Rätt lösning: bind:this + $effect för fullständig typsäkerhet.
	const minDate = new Date();
	let datepickerEl = $state<HTMLElement | null>(null);
	$effect(() => {
		if (!datepickerEl) return;
		(datepickerEl as HTMLElement & { afMinDate: Date }).afMinDate = minDate;
	});
	let submitted = $state(false);
	let result = $state<{ name: string; email: string; role: string; date: string } | null>(null);

	function isValidEmail(v: string): boolean {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
	}

	const nameError = $derived(submitted && !name.trim() ? 'Namn måste fyllas i' : null);
	const emailError = $derived(
		submitted && (!email.trim() || !isValidEmail(email)) ? 'Ange en giltig e-postadress' : null
	);
	const roleError = $derived(submitted && !role ? 'Du måste välja en roll' : null);
	const dateError = $derived(submitted && selectedDates.length === 0 ? 'Välj ett datum' : null);
	const hasErrors = $derived(!!(nameError || emailError || roleError || dateError));

	function handleSubmit() {
		submitted = true;
		if (!hasErrors) {
			result = {
				name,
				email,
				role,
				date: selectedDates[0]?.toLocaleDateString('sv-SE') ?? ''
			};
		}
	}

	function handleReset() {
		name = '';
		email = '';
		role = '';
		selectedDates = [];
		submitted = false;
		result = null;
	}
</script>

<svelte:head>
	<title>Formulärtest - {SITE_NAME}</title>
</svelte:head>

<section>
	<digi-layout-block af-vertical-padding={true}>
		<digi-typography-heading-jumbo af-text="Formulärtest"></digi-typography-heading-jumbo>
		<digi-typography-preamble>
			Testar digi-formulärkomponenter med validering och Svelte 5.
		</digi-typography-preamble>

		<div class="grid grid-cols-12">
			<div class="col-span-12 flex flex-col gap-largest sm:col-span-12 md:col-span-8 lg:col-span-6">
				{#if submitted && hasErrors}
					<digi-form-error-list af-heading="Rätta följande fel">
						{#if nameError}
							<a href="#name-input">{nameError}</a>
						{/if}
						{#if emailError}
							<a href="#email-input">{emailError}</a>
						{/if}
						{#if roleError}
							<a href="#role-group">{roleError}</a>
						{/if}
						{#if dateError}
							<a href="#date-picker">{dateError}</a>
						{/if}
					</digi-form-error-list>
				{/if}

				<digi-form-input
					af-id="name-input"
					af-label="Namn"
					af-required={true}
					af-required-text="obligatoriskt"
					af-value={name}
					af-validation={nameError ? 'error' : undefined}
					af-validation-text={nameError ?? undefined}
					onafOnInput={(e) => {
						name = ((e as CustomEvent).detail as InputEvent)?.target
							? (((e as CustomEvent).detail as InputEvent).target as HTMLInputElement).value
							: '';
					}}
				></digi-form-input>

				<digi-form-input
					af-id="email-input"
					af-label="E-post"
					af-type="email"
					af-required={true}
					af-required-text="obligatoriskt"
					af-value={email}
					af-validation={emailError ? 'error' : undefined}
					af-validation-text={emailError ?? undefined}
					onafOnInput={(e) => {
						email = ((e as CustomEvent).detail as InputEvent)?.target
							? (((e as CustomEvent).detail as InputEvent).target as HTMLInputElement).value
							: '';
					}}
				></digi-form-input>

				<digi-form-fieldset af-id="role-group" af-legend="Roll">
					<digi-form-radiogroup
						af-name="role"
						af-value={role}
						onafOnGroupChange={(e) => {
							role = (e.currentTarget as HTMLElement & { value: string }).value;
						}}
					>
						<digi-form-radiobutton
							af-label="Konsult"
							af-value="Konsult"
							af-validation={roleError ? 'error' : undefined}
						></digi-form-radiobutton>
						<digi-form-radiobutton
							af-label="Anställd"
							af-value="Anställd"
							af-validation={roleError ? 'error' : undefined}
						></digi-form-radiobutton>
					</digi-form-radiogroup>
					{#if roleError}
						<p style="color: var(--digi--color--text--error)">{roleError}</p>
					{/if}
				</digi-form-fieldset>

				<digi-calendar-datepicker
					af-id="date-picker"
					af-label="Datum"
					af-required={true}
					af-required-text="obligatoriskt"
					af-close-on-select={true}
					af-open-calendar-aria-label="Öppna kalender"
					af-close-calendar-aria-label="Stäng kalender"
					af-validation={dateError ? 'error' : undefined}
					af-validation-text={dateError ?? undefined}
					bind:this={datepickerEl}
					onafOnDateChange={(e) => {
						selectedDates = (e as CustomEvent<Date[]>).detail ?? [];
					}}
				></digi-calendar-datepicker>

				<div class="mt-larger flex gap-large">
					<digi-button af-variation="secondary" af-type="button" onafOnClick={handleReset}>
						Avbryt
					</digi-button>
					<digi-button af-variation="primary" af-type="button" onafOnClick={handleSubmit}>
						Skicka in
					</digi-button>
				</div>
			</div>
		</div>
	</digi-layout-block>

	{#if result}
		<digi-layout-block af-vertical-padding={true} af-variation="secondary">
			<h2>Inskickade uppgifter</h2>
			<pre>{JSON.stringify(result, null, 2)}</pre>
		</digi-layout-block>
	{/if}
</section>
