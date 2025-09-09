<script>
	import { Image } from '$lib/components';
	let { opener } = $props();
</script>

<div class="openerCard">
	<div class="openerCardContent">
		<h3>{opener.title}</h3>
		<p>{opener.description}</p>
	</div>
	<div class="openerCardImage"><Image source={opener.image} altTag={opener.title} /></div>
</div>

<style>
	.openerCard {
		display: grid;
		grid-template-columns: 2.5fr 1fr;
		gap: 2rem;
		align-items: center;

		justify-content: center;
		border: 1px solid var(--primaryColor);
		border-radius: 10px;
		padding: 2rem;
		box-shadow: 5px 5px 10px 0 rgba(0, 0, 0, 0.4);
		@media (max-width: 768px) {
			grid-template-columns: 1fr;
		}
	}
</style>
