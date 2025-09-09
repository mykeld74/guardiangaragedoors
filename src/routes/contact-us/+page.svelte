<script>
	import ContactForm from '$lib/components/ContactForm.svelte';
</script>

<svelte:head>
	<title>Contact Us | Guardian Repairs</title>
	<meta
		name="description"
		content="Get a free, accurate estimate for your garage door repair, replacement, or opener installation needs."
	/>
</svelte:head>

<div class="container">
	<div class="content">
		<h1>Contact Us</h1>
		<p class="intro">
			Have a question or want more information? We would love to hear from you. Complete the form
			below or call or text: <a href="tel:+13039490688">303.949.0688</a>.
		</p>

		<ContactForm />
	</div>
</div>

<style>
	a {
		color: var(--primaryColor);
		text-decoration: none;
	}
</style>
