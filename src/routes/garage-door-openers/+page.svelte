<script>
	import { OpenerCard } from '$lib/components';
	import garageDoorOpeners from '$lib/data/garageDoorOpeners.json';
	import { revealOnScroll } from '$lib';
	const reveal = revealOnScroll;
</script>

<svelte:head>
	<title>Garage Door Openers | Guardian Repairs</title>
	<meta
		name="description"
		content="Professional garage door opener installation and repair. MyQ WiFi openers with battery backup, video monitoring, and smartphone control."
	/>
</svelte:head>
<section>
	<div class="container">
		<h1>Garage Door Openers</h1>

		<p>
			When it comes to openers, we stand behind the unsurpassed functionality, ease of use,
			dependability, longevity, and quality of LiftMaster Brand Products.
		</p>

		<p>Many LiftMaster Products feature MyQ which:</p>

		<ul>
			<li>Allow you to Open/Close your garage door from your phone, anywhere you have service.</li>
			<li>
				Gives you access to Amazon Key to allow Amazon to deliver your packages safely in your
				garage
			</li>
			<li>Set “time to close” option so door closes after your preference of time, every time.</li>
		</ul>
		<p>
			For more information about <a href="https://www.myq.com/" target="_blank">MyQ click here</a>.
		</p>

		<div
			class="openersContainer"
			use:reveal={{ targets: '.openerCard', y: 75, duration: 0.3, stagger: 0.08 }}
		>
			<h2>Featured Openers:</h2>
			{#each garageDoorOpeners as opener}
				<OpenerCard {opener} />
			{/each}
		</div>
	</div>
</section>

<style>
	.openersContainer {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		margin-top: 4rem;
	}
	.container {
		max-width: 1400px;
	}
</style>
