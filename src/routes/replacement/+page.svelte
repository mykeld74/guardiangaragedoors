<script>
	import { ReplacementDoorCard } from '$lib/components';
	import ReplacementDoors from '$lib/data/replacementDoors.json';
	import { revealOnScroll } from '$lib';

	let RaisedPanel = ReplacementDoors.categories.find((category) => category.id === 'raised-panel');
	let CarriageHouse = ReplacementDoors.categories.find(
		(category) => category.id === 'carriage-house'
	);
	let FlushPanel = ReplacementDoors.categories.find((category) => category.id === 'flush-panel');

	const reveal = revealOnScroll;
</script>

<svelte:head>
	<title>Replacement | Guardian Garage Doors</title>
	<meta
		name="description"
		content="Professional garage door replacement and new installation services. Over 14 years experience. Free estimates available."
	/>
</svelte:head>
<section>
	<div class="container">
		<h1>Garage Door Replacement and New Installation</h1>
		<p>
			We’ve got you covered, with a wide range of doors to choose from, whether you are looking for
			simple or fancy we have an option for you. Just click the buttons below to see the available
			styles and options. Not finding the door or insulation/R-value you’re looking for? No Problem!
			We have other distributors and can get nearly any style!
		</p>
	</div>
</section>
<section>
	<div class="container">
		<div class="doorContainer raisedPanel" use:reveal={{ targets: '.replacementDoorCard' }}>
			<h2>Raised Panel</h2>
			<div class="doorCardContainer">
				{#each RaisedPanel?.doors ?? [] as door}
					<ReplacementDoorCard {door} />
				{/each}
			</div>
		</div>

		<div class="doorContainer carriageHouse" use:reveal={{ targets: '.replacementDoorCard' }}>
			<h2>Carriage House</h2>
			<div class="doorCardContainer">
				{#each CarriageHouse?.doors ?? [] as door}
					<ReplacementDoorCard {door} />
				{/each}
			</div>
		</div>

		<div class="doorContainer flushPanel" use:reveal={{ targets: '.replacementDoorCard' }}>
			<h2>Flush Panel</h2>
			<div class="doorCardContainer">
				{#each FlushPanel?.doors ?? [] as door}
					<ReplacementDoorCard {door} />
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.container {
		max-width: 1400px;
	}
	.doorCardContainer {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 2rem;
		@media (max-width: 900px) {
			grid-template-columns: repeat(2, 1fr);
		}
		@media (max-width: 768px) {
			grid-template-columns: 1fr;
		}
	}
	.doorContainer {
		padding-bottom: 3rem;
		margin-top: 3rem;
		&:not(:last-child) {
			border-bottom: 1px solid var(--textColor);
		}
	}
</style>
