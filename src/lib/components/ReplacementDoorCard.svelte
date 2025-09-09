<script>
	let { door } = $props();
	import { Image } from '$lib/components';
	import DoorModal from './DoorModal.svelte';

	let isModalOpen = $state(false);

	function openModal() {
		isModalOpen = true;
	}

	function closeModal() {
		isModalOpen = false;
	}
</script>

<button class="replacementDoorCard" onclick={openModal}>
	<div class="replacementDoorCardImage">
		<Image source={door.image} altTag={door.name} />
	</div>
	<div class="replacementDoorCardContent">
		<h3>{door.name}</h3>
		<p>Learn More</p>
	</div>
</button>

<DoorModal {door} isOpen={isModalOpen} onClose={closeModal} />

<style>
	.replacementDoorCard {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		background: #eeeeee;
		overflow: hidden;
		border-radius: 10px;
		box-shadow: 5px 5px 10px 0 rgba(0, 0, 0, 0.4);
		border: none;
		cursor: pointer;
		transition:
			box-shadow 300ms ease-in-out,
			transform 300ms ease-in-out;
		&:hover {
			box-shadow: 5px 5px 10px 0 rgba(0, 0, 0, 0);
			transform: translate(2px, 2px);
		}
	}
	.replacementDoorCardContent {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 0 1rem 1rem 1rem;
		h3 {
			font-size: clamp(24px, 2.8vw, 28px);
			margin: 0;
		}
		p {
			font-size: clamp(20px, 2.8vw, 28px);
			margin: 0;
		}
	}
</style>
