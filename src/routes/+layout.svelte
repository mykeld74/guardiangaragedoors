<script lang="ts">
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import favicon from '$lib/assets/favicon.png';
	import '$lib/css/reset.css';
	import '$lib/css/styles.css';
	import { Nav } from '$lib/components';
	const year = new Date().getFullYear();

	let innerWidth = $state(0);
	let isMobile = $state(false);

	let checkIsMobile = () => {
		if (innerWidth < 1150) {
			isMobile = true;
		} else {
			isMobile = false;
		}
	};

	let { children, data } = $props();
	console.log(data);
	let title = $derived(data.pathname.split('/').pop());
	onMount(() => {
		innerWidth = window.innerWidth;
		checkIsMobile();
	});
</script>

<svelte:window bind:innerWidth on:resize={checkIsMobile} />

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Guardian Garage Doors - Repair, Replacement & Installation</title>
	<meta
		name="description"
		content="Professional garage door repair, replacement, and installation services. Over 14 years experience. Free estimates available."
	/>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Maven+Pro:wght@400..900&family=Oswald:wght@200..700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<!-- Header -->
<header class="header">
	<a href="/" class="brandLink">
		<div class="brand">
			<div class="logo">
				<svg viewBox="0 0 100.1 69.9">
					<g>
						<path
							class="st0"
							d="M50.1,0.1l-49.8,31v37.5v0.1v1.1h15.4v-1.2h0v-14l-8-7.3h8h34.6h1h34.3h8.3l-8.3,7.3v3.9v11.3h14.4V31.2 L50.1,0.1z M15.7,43.2v-7.1h69.9v7.1H15.7z"
							style="fill: rgb(255, 255, 255);"
						></path>
					</g>
				</svg>
			</div>
			<div class="brandText">
				<h1>Guardian</h1>
				<h2>Garage Doors</h2>
			</div>
			<div class="fish">
				<svg viewBox="0 0 1280 640">
					<g
						transform="translate(0.000000,640.000000) scale(0.100000,-0.100000)"
						fill="#fff"
						stroke="none"
					>
						<path
							d="M4740 5724 c-25 -2 -103 -8 -175 -14 -1487 -119 -2892 -721 -4000 -1713 -151 -134 -350 -335 -432 -434 -116 -141 -157 -304 -118 -472 32 -135 106 -234 364 -491 707 -702 1633 -1266 2613 -1591 552 -183 1117 -291 1726 -330 237 -15 720 -7 902 15 1205 147 2528 707 4093 1733 109 71 194 120 200 116 61 -37 464 -345 742 -567 443 -354 766 -633 1148 -989 143 -133 262 -243 267 -245 4 -2 153 151 331 340 177 189 340 361 361 383 l38 41 -258 241 c-293 274 -457 420 -727 649 -281 237 -688 564 -895 719 -36 26 -75 57 -87 68 l-22 19 157 121 c580 444 1066 856 1579 1335 l253 236 -34 36 c-18 19 -178 189 -355 377 -177 188 -326 345 -331 348 -11 7 -33 -12 -288 -251 -449 -424 -1051 -926 -1627 -1360 -132 -99 -245 -183 -252 -187 -6 -4 -105 55 -230 136 -1394 917 -2690 1490 -3778 1671 -301 50 -402 58 -770 61 -192 1 -370 1 -395 -1z m820 -1078 c969 -137 2035 -586 3338 -1406 28 -18 52 -36 52 -40 0 -8 -53 -41 -335 -213 -1060 -646 -2042 -1058 -2866 -1202 -230 -40 -404 -55 -649 -55 -1182 0 -2325 367 -3300 1058 -138 99 -386 294 -475 376 l-50 46 45 41 c82 74 323 264 445 351 561 400 1219 709 1870 879 319 83 676 145 970 168 77 6 156 13 175 15 97 11 672 -3 780 -18z"
						></path>
					</g>
				</svg>
			</div>
		</div>
	</a>
	<Nav {isMobile} />
</header>
{#key data.pathname}
	<main
		in:fade={{ duration: 150, delay: 155 }}
		out:fade={{ duration: 150 }}
		class={title || 'home'}
	>
		{@render children?.()}
	</main>
{/key}

<!-- Footer -->
<footer class="footer">
	<div class="container">
		<p>&copy; {year} Guardian Garage Doors</p>
	</div>
</footer>
