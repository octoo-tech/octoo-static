<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar, initializeStores, Modal, getModalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';

	import EmailForm from '$lib/EmailForm.svelte';

	initializeStores();
	const modalStore = getModalStore();

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	function modalEmailForm(): void {
		const c: ModalComponent = { ref: EmailForm };
		const modal: ModalSettings = {
			type: 'component',
			component: c
		};
		modalStore.trigger(modal);
	}
</script>

<Modal transitionInParams={{ duration: 70 }} />

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">
					<enhanced:img src="/static/octo-o.png" alt="OCTOO" class="octoo-header" />
				</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<button class="btn btn-sm variant-ghost-surface" on:click={modalEmailForm}>Contact</button>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<svelte:fragment slot="footer">
		<div class="space-y-10 text-center flex flex-col items-center">
			<p class="code">&copy; OCTOO, 2025</p>
		</div>
	</svelte:fragment>
	<slot />
</AppShell>
