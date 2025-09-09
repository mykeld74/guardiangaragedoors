<script>
	import { Image } from '$lib/components';
</script>

<svelte:head>
	<title>Repair | Guardian Garage Doors</title>
	<meta
		name="description"
		content="Professional garage door repair services. Over 19 years experience. Free estimates available."
	/>
</svelte:head>

<section>
	<div class="container">
		<h1>Repair</h1>
		<div class="repairContainer">
			<div class="repairContent">
				<p>
					Parts wear out and accidental damage happens. Either way, Guardian has you covered! We can
					walk you through the best option for your unique situation. We would be happy to provide
					you with a FREE and HONEST estimate! Don’t wait for your problem to get worse. Reach out
					today!
				</p>

				<h2>Great reasons to schedule a service call today!</h2>
				<ul>
					<li>Broken Springs</li>
					<li>Worn/frayed/broken cables</li>
					<li>Worn rollers</li>
					<li>Squeaky Hinges</li>
					<li>Loud/Rough operation</li>
					<li>Popping/Grinding/Clunking</li>
				</ul>
			</div>
			<div class="repairImage">
				<Image source="doorRepair" altTag="Worker repairing a garage door" />
			</div>
		</div>
	</div>
</section>

<style>
	.repairContainer {
		display: grid;
		grid-template-columns: 2fr 1fr;
		gap: 2rem;
		@media (max-width: 768px) {
			grid-template-columns: 1fr;
		}
	}
</style>
