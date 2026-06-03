<script lang="ts">
	import { goto } from '$app/navigation';
	import { Categories, posts } from '$lib/posts.svelte';

	let { data } = $props();

	let title = $state('');
	let author = $state('');
	let content = $state('');
	let submitted = $state(false);

	const category = $derived(data.category as Categories);

	const titleError = $derived(submitted && !title.trim() ? 'Titel måste fyllas i' : null);
	const authorError = $derived(submitted && !author.trim() ? 'Författare måste fyllas i' : null);
	const contentError = $derived(submitted && !content.trim() ? 'Innehåll måste fyllas i' : null);
	const hasErrors = $derived(!!(titleError || authorError || contentError));

	const categoryHeading = $derived(Categories[data.category as keyof typeof Categories]);

	function handleSubmit() {
		submitted = true;

		if (hasErrors) {
			return;
		}

		posts.create({ title, author, content, category });
		title = '';
		author = '';
		content = '';
		submitted = false;

		goto(`/forum/${category}`);
	}

	function handleReset() {
		title = '';
		author = '';
		content = '';
		submitted = false;

		goto(`/forum/${category}`);
	}
</script>

<section>
	<digi-layout-block af-vertical-padding={true}>
		<h1>Nytt inlägg ({categoryHeading})</h1>

		<div class="grid grid-cols-12">
			<div class="col-span-12 flex flex-col gap-largest sm:col-span-12 md:col-span-8 lg:col-span-6">
				{#if submitted && hasErrors}
					<digi-form-error-list af-heading="Rätta följande fel">
						{#if titleError}
							<a href="#title-input">{titleError}</a>
						{/if}
						{#if authorError}
							<a href="#author-input">{authorError}</a>
						{/if}
						{#if contentError}
							<a href="#content-input">{contentError}</a>
						{/if}
					</digi-form-error-list>
				{/if}

				<digi-form-input
					af-id="title-input"
					af-label="Titel"
					af-required={true}
					af-required-text="obligatoriskt"
					af-value={title}
					af-validation={titleError ? 'error' : undefined}
					af-validation-text={titleError ?? undefined}
					onafOnInput={(e) => {
						title = ((e as CustomEvent).detail as InputEvent)?.target
							? (((e as CustomEvent).detail as InputEvent).target as HTMLInputElement).value
							: '';
					}}
				></digi-form-input>

				<digi-form-input
					af-id="author-input"
					af-label="Författare"
					af-required={true}
					af-required-text="obligatoriskt"
					af-value={author}
					af-validation={authorError ? 'error' : undefined}
					af-validation-text={authorError ?? undefined}
					onafOnInput={(e) => {
						author = ((e as CustomEvent).detail as InputEvent)?.target
							? (((e as CustomEvent).detail as InputEvent).target as HTMLInputElement).value
							: '';
					}}
				></digi-form-input>

				<digi-form-textarea
					af-id="content-input"
					af-label="Innehåll"
					af-required={true}
					af-required-text="obligatoriskt"
					af-value={content}
					af-validation={contentError ? 'error' : undefined}
					af-validation-text={contentError ?? undefined}
					onafOnInput={(e) => {
						content = ((e as CustomEvent).detail as InputEvent)?.target
							? (((e as CustomEvent).detail as InputEvent).target as HTMLTextAreaElement).value
							: '';
					}}
				></digi-form-textarea>

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
</section>
