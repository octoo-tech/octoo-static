<script lang="ts">
	import type { SvelteComponent } from 'svelte';

	// Stores
	import { getModalStore } from '@skeletonlabs/skeleton';

	// Props
	/** Exposes parent props to this component. */
	export let parent: SvelteComponent;

	const modalStore = getModalStore();

	// Form Data
	const formData = {
		name: '',
		email: '',
		text: ''
	};

	// We've created a custom submit function to pass the response and close the modal.
	const FORMSPARK_ACTION_URL = 'https://submit-form.com/mzNITeDuV';
	async function onFormSubmit(): void {
		console.log(formData);

		try {
			var submitting = true;
			await fetch(FORMSPARK_ACTION_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
				body: JSON.stringify(formData)
			});
		} finally {
			submitting = false;
		}

		modalStore.close();
	}

	// Base Classes
	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
	const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';
</script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}
	<div class="modal-example-form {cBase}">
		<header class={cHeader}>Contact Us</header>
		<!-- Enable for debugging: -->
		<form class="modal-form {cForm}">
			<label class="label">
				<span>Name</span>
				<input class="input" type="text" bind:value={formData.name} placeholder="Your name..." />
			</label>
			<label class="label">
				<span>Email</span>
				<input
					class="input"
					type="email"
					bind:value={formData.email}
					placeholder="Your email address..."
				/>
			</label>
			<label class="label">
				<span>Text</span>
				<textarea
					class="textarea"
					rows="4"
					bind:value={formData.text}
					placeholder="Please, enter your message here..."
				/>
			</label>
		</form>
		<!-- prettier-ignore -->
		<footer class="modal-footer {parent.regionFooter}">
			<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
			<button class="btn {parent.buttonPositive}" on:click={onFormSubmit}>Submit</button>
		</footer>
	</div>
{/if}
