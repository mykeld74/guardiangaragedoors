<script>
	import { onMount } from 'svelte';
	let { isMobile } = $props();
	let isMobileMenuOpen = $state(false);

	const navLinks = [
		{
			label: 'Free Estimates',
			href: '/free-estimates'
		},
		{
			label: 'Repair',
			href: '/repair'
		},
		{
			label: 'Garage Door Openers',
			href: '/garage-door-openers'
		},
		{
			label: 'Replacements',
			href: '/replacement'
		},
		{
			label: 'Contact Us',
			href: '/contact-us'
		}
	];

	function toggleMobileMenu() {
		isMobileMenuOpen = !isMobileMenuOpen;
		document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
	}

	function closeMobileMenu() {
		isMobileMenuOpen = false;
		document.body.style.overflow = '';
	}
</script>

{#if isMobile}
	<button class="mobileMenuButton" onclick={toggleMobileMenu} aria-label="Toggle mobile menu">
		<div class="hamburger" class:active={isMobileMenuOpen}>
			<span></span>
			<span></span>
			<span></span>
		</div>
	</button>

	{#if isMobileMenuOpen}
		<div class="mobileNavOverlay">
			<div class="mobileNav" role="dialog" aria-modal="true" tabindex="0">
				<ul class="mobileNavLinks">
					<li>
						<a href="/" onclick={closeMobileMenu}>Home</a>
					</li>
					{#each navLinks as item}
						<li>
							<a href={item.href} onclick={closeMobileMenu}>
								{item.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	{/if}
{:else}
	<nav class="nav">
		<div class="navLinks">
			<ul>
				{#each navLinks as link}
					<li>
						<a href={link.href} class="navLink">{link.label}</a>
					</li>
				{/each}
			</ul>
		</div>
	</nav>
{/if}

<style>
	li:hover {
		background-color: var(--primaryColor);
		anchor-name: --hoveredLink;
		border-radius: 10px;
		transition: background-color 300ms ease-in-out;
		@supports (anchor-name: --test) {
			background-color: transparent;
		}
	}

	.nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: relative;
		padding: 1rem 0;

		&:after {
			content: '';
			position: absolute;
			top: calc(anchor(bottom) - 10px);
			left: calc(anchor(left) + 0.5rem);
			right: calc(anchor(right) + 0.5rem);
			bottom: calc(anchor(bottom) + 5px);
			z-index: -1;

			background-color: var(--primaryColor);
			border-radius: 10px;

			position-anchor: --hoveredLink;
			transition: ease-in-out 250ms;
		}

		&:has(a:hover)::after {
			top: anchor(top);
			left: anchor(left);
			right: anchor(right);
			bottom: anchor(bottom);
		}
	}

	.navLinks {
		display: flex;
		gap: 2rem;
		align-items: center;
		isolation: isolate;
		anchor-name: --hoveredLink;
	}
	ul {
		display: flex;
		gap: 1rem;
		align-items: center;
		list-style: none;
		margin-left: 0;
	}
	li {
		padding: 0.25rem 1.25rem 0.75rem;
		@media (max-width: 1200px) {
			padding: 0.25rem 0.5rem 0.75rem;
		}
	}

	.navLink {
		text-decoration: none;
		color: var(--contrastColor);
		font-weight: 500;
		transition: color 0.3s ease;
		font-size: 1.2rem;
		@supports (anchor) {
			color: #fff;
		}
	}
	.mobileMenuButton {
		position: fixed;
		top: 1rem;
		right: 1.5rem;
		z-index: 1000;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0.5rem;
	}

	.hamburger {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 32px;
		height: 26px;
	}

	.hamburger span {
		display: block;
		width: 100%;
		height: 4px;
		background-color: var(--contrastColor);
		transition: all 0.3s ease-in-out;
	}

	.hamburger.active span:nth-child(1) {
		transform: translateY(10px) rotate(45deg);
	}

	.hamburger.active span:nth-child(2) {
		opacity: 0;
	}

	.hamburger.active span:nth-child(3) {
		transform: translateY(-12px) rotate(-45deg);
	}

	.mobileNavOverlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 999;
	}

	.mobileNav {
		position: fixed;
		top: 0;
		right: 0;
		width: 80%;
		max-width: 400px;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.75);
		padding: 1rem;
		overflow-y: auto;
		animation: slideIn 0.3s ease-out;
	}

	@keyframes slideIn {
		from {
			transform: translateX(100%);
		}
		to {
			transform: translateX(0);
		}
	}

	.mobileNavLinks {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-top: 5rem;
	}

	.mobileNavLinks li {
		font-size: 1.5rem;
		margin-bottom: 0.25rem;
		padding: 0 1rem 0 0;
		width: 100%;
		text-align: right;
	}

	.mobileNavLinks a {
		color: var(--contrastColor);
		text-decoration: none;
		font-size: 1.2em;
		display: block;
		padding: 0.5rem 0;
		transition: color 0.3s ease;
	}
</style>
