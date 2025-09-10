// Reviews Service - Handles API calls to Google, Yelp, and Nextdoor
// Note: These APIs require proper authentication and setup

export interface Review {
	id: string;
	platform: 'google';
	author: string;
	rating: number;
	text: string;
	date: string;
	url?: string;
	avatar?: string;
}

export interface ReviewsConfig {
	googlePlaceId?: string;
	googleApiKey?: string;
}

class ReviewsService {
	private config: ReviewsConfig = {};

	constructor(config: ReviewsConfig) {
		this.config = config;
	}

	// Google Places API - Reviews
	async fetchGoogleReviews(): Promise<Review[]> {
		if (!this.config.googlePlaceId || !this.config.googleApiKey) {
			console.warn('Google Place ID or API key not provided');
			return this.getMockGoogleReviews();
		}

		try {
			const url = `/api/google-reviews?placeId=${this.config.googlePlaceId}&apiKey=${this.config.googleApiKey}`;

			const response = await fetch(url);

			if (!response.ok) {
				const errorData = await response.json();
				console.error('Server API error:', errorData);
				throw new Error(`Server API error: ${response.status} - ${errorData.error}`);
			}

			const data = await response.json();

			const reviews = data.reviews || [];

			return reviews;
		} catch (error) {
			console.error('Error fetching Google reviews:', error);
			return this.getMockGoogleReviews();
		}
	}

	// Mock data for development/testing
	private getMockGoogleReviews(): Review[] {
		return [
			{
				id: 'google-1',
				platform: 'google',
				author: 'Sarah Johnson',
				rating: 5,
				text: 'Excellent service! They fixed my garage door quickly and professionally. The technician was knowledgeable and explained everything clearly.',
				date: '2024-01-15',
				url: 'https://www.google.com/maps/place/?q=place_id:ChIJN1t_tDeuEmsRUsoyG83frY4&hl=en&gl=us',
				avatar: 'https://via.placeholder.com/40/4285F4/ffffff?text=SJ'
			},
			{
				id: 'google-2',
				platform: 'google',
				author: 'Michael Chen',
				rating: 5,
				text: 'Outstanding work! My garage door opener was acting up and they had it working perfectly in no time. Highly recommend!',
				date: '2024-01-12',
				url: 'https://www.google.com/maps/place/?q=place_id:ChIJN1t_tDeuEmsRUsoyG83frY4&hl=en&gl=us',
				avatar: 'https://via.placeholder.com/40/4285F4/ffffff?text=MC'
			},
			{
				id: 'google-3',
				platform: 'google',
				author: 'Lisa Rodriguez',
				rating: 5,
				text: 'Great experience! They replaced our garage door springs and everything works perfectly now. Very professional and fair pricing.',
				date: '2024-01-10',
				url: 'https://www.google.com/maps/place/?q=place_id:ChIJN1t_tDeuEmsRUsoyG83frY4&hl=en&gl=us',
				avatar: 'https://via.placeholder.com/40/4285F4/ffffff?text=LR'
			},
			{
				id: 'google-4',
				platform: 'google',
				author: 'David Kim',
				rating: 4,
				text: 'Good service overall. They were on time and completed the work as promised. Would use them again.',
				date: '2024-01-08',
				url: 'https://www.google.com/maps/place/?q=place_id:ChIJN1t_tDeuEmsRUsoyG83frY4&hl=en&gl=us',
				avatar: 'https://via.placeholder.com/40/4285F4/ffffff?text=DK'
			}
		];
	}

	// Fetch all reviews from all platforms
	async fetchAllReviews(): Promise<Review[]> {
		const googleReviews = await this.fetchGoogleReviews();

		const allReviews = googleReviews.sort(
			(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
		);

		return allReviews;
	}
}

export default ReviewsService;
