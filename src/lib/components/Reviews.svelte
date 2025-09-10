<script lang="ts">
	import { onMount } from 'svelte';
	import ReviewsService from '../services/reviewsService.js';

	let {
		googlePlaceId = '',
		googleApiKey = '',
		maxReviews = 6,
		showPlatformIcons = true
	} = $props();

	let reviews = $state<any[]>([]);
	let loading = $state(true);
	let error = $state('');
	let reviewsService: ReviewsService;

	// Platform configurations
	const platforms = {
		google: {
			name: 'Google',
			icon: '🔍',
			color: '#4285F4'
		}
	};

	// Load all reviews
	async function loadReviews() {
		loading = true;
		error = '';

		try {
			reviewsService = new ReviewsService({
				googlePlaceId,
				googleApiKey
			});

			const allReviews = await reviewsService.fetchAllReviews();

			reviews = allReviews.slice(0, maxReviews);
		} catch (err) {
			error = 'Failed to load reviews. Please try again later.';
			console.error('Error loading reviews:', err);
		} finally {
			loading = false;
		}
	}

	// Format date
	function formatDate(dateString: string) {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	}

	// Render stars
	function renderStars(rating: number) {
		return '★'.repeat(rating) + '☆'.repeat(5 - rating);
	}

	onMount(() => {
		loadReviews();
	});
</script>

<div class="reviewsContainer">
	{#if loading}
		<div class="loading">
			<div class="spinner"></div>
			<p>Loading reviews...</p>
		</div>
	{:else if error}
		<div class="error">
			<p>{error}</p>
			<button onclick={loadReviews}>Try Again</button>
		</div>
	{:else if reviews.length === 0}
		<div class="noReviews">
			<p>No reviews available at this time.</p>
		</div>
	{:else}
		<div class="reviewsGrid">
			{#each reviews as review}
				<div class="reviewCard">
					<div class="reviewHeader">
						<div class="authorInfo">
							{#if review.avatar}
								<img src={review.avatar} alt={review.author} class="avatar" />
							{:else}
								<div class="avatarPlaceholder">
									{review.author.charAt(0)}
								</div>
							{/if}
							<div class="authorDetails">
								<h4 class="authorName">{review.author}</h4>
								<div class="platformInfo">
									{#if showPlatformIcons}
										<span
											class="platformIcon"
											style="color: {platforms[review.platform as keyof typeof platforms]?.color ||
												'#666'}"
										>
											{platforms[review.platform as keyof typeof platforms]?.icon || '⭐'}
										</span>
									{/if}
									<span class="platformName"
										>{platforms[review.platform as keyof typeof platforms]?.name ||
											review.platform}</span
									>
								</div>
							</div>
						</div>
						<div class="rating">
							<span class="stars">{renderStars(review.rating)}</span>
							<span class="ratingNumber">{review.rating}/5</span>
						</div>
					</div>

					<div class="reviewContent">
						<p class="reviewText">{review.text}</p>
						<div class="reviewFooter">
							<span class="reviewDate">{formatDate(review.date)}</span>
							{#if review.url}
								<a href={review.url} target="_blank" rel="noopener noreferrer" class="reviewLink">
									View on Google
								</a>
							{/if}
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.reviewsContainer {
		width: 90%;

		margin: 0 auto;
		padding: 2rem 1rem;
	}

	.loading,
	.error,
	.noReviews {
		text-align: center;
		padding: 3rem 1rem;
	}

	.spinner {
		width: 40px;
		height: 40px;
		border: 4px solid var(--backgroundColor, #f3f3f3);
		border-top: 4px solid var(--primaryColor, #007bff);
		border-radius: 50%;
		animation: spin 1s linear infinite;
		margin: 0 auto 1rem;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	.error button {
		background: var(--primaryColor, #007bff);
		color: white;
		border: none;
		padding: 0.5rem 1rem;
		border-radius: 4px;
		cursor: pointer;
		margin-top: 1rem;
	}

	.reviewsGrid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: 1.5rem;
	}

	.reviewCard {
		background: white;
		border-radius: 12px;
		padding: 1.5rem;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		border: 1px solid #e5e7eb;
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
	}

	.reviewCard:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
	}

	.reviewHeader {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 1rem;
	}

	.authorInfo {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.avatar {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		object-fit: cover;
	}

	.avatarPlaceholder {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: var(--primaryColor, #007bff);
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: bold;
		font-size: 1.1rem;
	}

	.authorDetails {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.authorName {
		margin: 0;
		font-size: 1rem;
		font-weight: 600;
		color: #1f2937;
	}

	.platformInfo {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.875rem;
		color: #6b7280;
	}

	.platformIcon {
		font-size: 1rem;
	}

	.platformName {
		font-weight: 500;
	}

	.rating {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 0.25rem;
	}

	.stars {
		color: #fbbf24;
		font-size: 1.1rem;
		letter-spacing: 1px;
	}

	.ratingNumber {
		font-size: 0.875rem;
		font-weight: 600;
		color: #6b7280;
	}

	.reviewContent {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.reviewText {
		margin: 0;
		line-height: 1.6;
		color: #374151;
		font-size: 0.95rem;
	}

	.reviewFooter {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 0.875rem;
		color: #6b7280;
	}

	.reviewDate {
		font-weight: 500;
	}

	.reviewLink {
		color: var(--primaryColor);
		text-decoration: none;
		font-weight: 500;
		transition: color 0.3s ease;
		&:hover {
			color: var(--accentColor);
		}
	}

	@media (max-width: 768px) {
		.reviewHeader {
			flex-direction: column;
			align-items: flex-start;
			gap: 1rem;
		}

		.rating {
			align-items: flex-start;
		}

		.reviewFooter {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.5rem;
		}
	}
</style>
