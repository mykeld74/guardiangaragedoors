<script>
	import { fly } from 'svelte/transition';
	import { Image } from '$lib/components';

	let { door = null, isOpen = false, onClose } = $props();

	function closeModal() {
		if (onClose) {
			onClose();
		}
	}

	function handleBackdropClick(event) {
		if (event.target === event.currentTarget) {
			closeModal();
		}
	}
</script>

{#if isOpen && door}
	<div
		class="modalBackdrop"
		role="button"
		onclick={handleBackdropClick}
		onkeydown={handleBackdropClick}
		tabindex="0"
	>
		<div
			class="modalContent"
			onclick={closeModal}
			onkeydown={closeModal}
			role="button"
			tabindex="0"
			transition:fly={{ y: 400, duration: 500 }}
		>
			<div class="modalHeader">
				<div class="doorImage">
					<Image source={door.image} altTag={door.name} />
				</div>
				<div class="doorInfo">
					<h2 class="doorName">{door.name}</h2>

					<div class="doorFeatures">
						{#each door.features as feature}
							<span class="featureTag">{feature}</span>
						{/each}
					</div>
				</div>
			</div>

			<div class="modalBody">
				<div class="customizationSection">
					<h3 class="sectionTitle">Available Colors</h3>
					<div class="colorGrid">
						{#each door.colors as color}
							<div class="colorOption">
								<div class="colorSwatch">
									<Image source={color.img} altTag={color.colorName} />
								</div>
								<p class="colorName">{color.colorName}</p>
							</div>
						{/each}
					</div>
				</div>
				{#if door.windowOptions.length > 0}
					<div class="customizationSection">
						<h3 class="sectionTitle">Window Options</h3>
						<div class="windowGrid">
							{#each door.windowOptions as window}
								<div class="windowOption">
									<div class="windowPreview">
										<Image source={window.img} altTag={window.optionName} />
									</div>
									<span class="windowName">{window.optionName}</span>
								</div>
							{/each}
						</div>
					</div>
				{/if}
				{#if door.glassOptions.length > 0}
					<div class="customizationSection">
						<h3 class="sectionTitle">Glass Options</h3>
						<div class="glassGrid">
							{#each door.glassOptions as glass}
								<div class="glassOption">
									<Image source={glass.img} altTag={glass.optionName} />
									<p class="glassName">{glass.optionName}</p>
								</div>
							{/each}
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}

<style>
	.modalBackdrop {
		position: fixed;
		inset: 0;
		background-color: rgba(0, 0, 0, 0.8);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
		padding: 2rem 4rem;
	}

	.modalContent {
		background: white;
		border-radius: 12px;
		width: 100%;
		max-height: 90vh;
		overflow-y: auto;
		position: relative;
		box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
	}

	.modalHeader {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
		padding: 2rem;
		border-bottom: 1px solid #e5e7eb;
	}
	.sectionTitle {
		color: var(--primaryColor);
	}

	.doorImage {
		aspect-ratio: 16/9;
		border-radius: 8px;
		overflow: hidden;
	}

	.doorImage :global(img) {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.doorInfo {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.doorName {
		font-size: 2rem;
		font-weight: 700;
		color: var(--textColor);
		margin: 0;
	}

	.doorFeatures {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.featureTag {
		background: var(--primaryColor);
		color: white;
		padding: 0.25rem 0.75rem;
		border-radius: 20px;
		font-size: 0.875rem;
		font-weight: 500;
	}

	.modalBody {
		padding: 2rem;
	}

	.customizationSection {
		margin-bottom: 3rem;
		padding-bottom: 3rem;
		border-bottom: 1px solid rgba(0, 0, 0, 0.2);
	}

	.customizationSection:last-child {
		margin-bottom: 0;
		border-bottom: none;
	}

	.colorGrid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: 3rem;
		padding: 2rem;
		place-items: self-start;
	}

	.colorOption {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}

	.colorSwatch {
		width: 80%;
		height: 80%;
		border-radius: 50%;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
		overflow: hidden;
		aspect-ratio: 1/1;
		max-width: 200px;
	}

	.colorName,
	.windowName,
	.glassName {
		font-weight: 500;
		text-align: center;
	}

	.windowGrid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(600px, 1fr));
		gap: 1.5rem;
		@media (max-width: 768px) {
			grid-template-columns: 1fr;
		}
	}
	.glassGrid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: 1.5rem;
	}

	.windowOption,
	.glassOption {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
		width: 100%;
		:global(img) {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}

	@media (max-width: 768px) {
		.modalBackdrop {
			padding: 1rem;
		}

		.modalHeader {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}
	}
</style>
