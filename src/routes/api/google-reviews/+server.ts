import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const placeId = url.searchParams.get('placeId');
	const apiKey = url.searchParams.get('apiKey');

	if (!placeId || !apiKey) {
		return json({ error: 'Missing placeId or apiKey parameter' }, { status: 400 });
	}

	try {
		const googleUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`;

		const response = await fetch(googleUrl);

		if (!response.ok) {
			const errorText = await response.text();
			console.error('Google API error:', response.status, errorText);
			return json({ error: `Google API error: ${response.status}` }, { status: response.status });
		}

		const data = await response.json();

		if (data.status !== 'OK') {
			console.error('Google API status error:', data.status, data.error_message);
			return json(
				{ error: `Google API error: ${data.status} - ${data.error_message || 'Unknown error'}` },
				{ status: 400 }
			);
		}

		const reviews =
			data.result.reviews?.map((review: any, index: number) => ({
				id: `google-${index}`,
				platform: 'google',
				author: review.author_name,
				rating: review.rating,
				text: review.text,
				date: new Date(review.time * 1000).toISOString().split('T')[0],
				url: `https://www.google.com/maps/place/?q=place_id:${placeId}&hl=en&gl=us`,
				avatar: review.profile_photo_url
			})) || [];

		return json({ reviews });
	} catch (error) {
		console.error('Error fetching Google reviews:', error);
		return json({ error: 'Failed to fetch Google reviews' }, { status: 500 });
	}
};
