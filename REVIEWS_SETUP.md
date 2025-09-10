# Reviews Component Setup

The Reviews component pulls customer reviews from Google. Here's how to set it up:

## API Setup

### Google Places API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Enable the Places API
3. Create credentials (API Key)
4. Restrict the API key to your domain
5. Add the API key to your environment variables

## Environment Variables

Add these to your `.env` file:

```env
VITE_GOOGLE_PLACES_API_KEY=your_google_api_key_here
VITE_GOOGLE_PLACE_ID=your_google_place_id_here
```

## Usage

```svelte
<script>
	import { Reviews } from '$lib/components';
</script>

<Reviews
	googlePlaceId={import.meta.env.VITE_GOOGLE_PLACE_ID}
	googleApiKey={import.meta.env.VITE_GOOGLE_PLACES_API_KEY}
	maxReviews={6}
	showPlatformIcons={true}
/>
```

## Props

- `googlePlaceId` (string): Google Place ID for your business
- `googleApiKey` (string): Google Places API key
- `maxReviews` (number): Maximum number of reviews to display (default: 6)
- `showPlatformIcons` (boolean): Whether to show platform icons (default: true)

## Finding Your Business ID

### Google Place ID

1. Go to [Google Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id)
2. Search for your business
3. Copy the Place ID

## Styling

The component uses CSS custom properties that can be customized:

```css
:root {
	--primaryColor: #1e40af;
	--contrastColor: #1e3a8a;
	--backgroundColor: #f8fafc;
}
```

## Important Notes

### Review Links

- Google Places API doesn't provide direct links to individual reviews
- Links will take users to the business page on Google Maps where they can see all reviews
- This is a limitation of Google's API, not the component

### Mock Data

When API keys are not provided, the component falls back to mock data for development and testing purposes.
