# Guardian Repairs - Garage Door Services

A modern, responsive website for Guardian Repairs, a professional garage door service company with over 18 years of experience serving customers with repair, replacement, and opener installation services.

## 🚪 About Guardian Repairs

Guardian Repairs specializes in keeping your garage door operating exceptionally! With over 18 years of experience, we're ready to serve any of your garage door needs - from a tune-up to a complete replacement and everything in between.

### Our Services

- **🔧 Repair Services** - Professional garage door repair for all makes and models
- **🚪 Door Replacement** - Complete garage door replacement and new installation
- **📱 Opener Installation** - LiftMaster garage door openers with MyQ technology
- **💰 Free Estimates** - No-obligation, honest estimates for all services

### Why Choose Guardian Repairs?

- ✅ Over 18 years of experience
- ✅ Free, honest estimates
- ✅ Quality work at fair prices
- ✅ Excellent customer service
- ✅ Professional LiftMaster products
- ✅ MyQ smart technology integration

## 🛠️ Technology Stack

This website is built with modern web technologies:

- **Framework**: Svelte 5 with SvelteKit
- **Language**: TypeScript
- **Styling**: CSS with custom properties and OKLCH color space
- **Animations**: GSAP for complex animations
- **Email**: Nodemailer for contact form submissions
- **Images**: Cloudinary for optimized image delivery
- **Package Manager**: pnpm
- **Deployment**: Netlify

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm package manager

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd guardianrepairs
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm format` - Format code with Prettier
- `pnpm lint` - Run ESLint and Prettier checks
- `pnpm test` - Run tests

## 📁 Project Structure

```
src/
├── lib/
│   ├── components/          # Reusable Svelte components
│   │   ├── ContactForm.svelte
│   │   ├── DoorModal.svelte
│   │   ├── Image.svelte
│   │   ├── OpenerCard.svelte
│   │   └── ReplacementDoorCard.svelte
│   ├── css/                # Global styles
│   │   ├── reset.css
│   │   └── styles.css
│   ├── data/               # JSON data files
│   │   ├── garageDoorOpeners.json
│   │   └── replacementDoors.json
│   └── assets/             # Static assets
├── routes/                 # SvelteKit pages
│   ├── +layout.svelte      # Main layout
│   ├── +page.svelte        # Homepage
│   ├── contact-us/         # Contact page
│   ├── free-estimates/     # Free estimates page
│   ├── garage-door-openers/ # Openers page
│   ├── repair/             # Repair services page
│   └── replacement/        # Door replacement page
└── app.html               # HTML template
```

## 🎨 Design System

The website follows a consistent design system:

- **Colors**: Custom CSS properties with OKLCH color space
- **Typography**: Responsive typography using `clamp()`
- **Layout**: CSS Grid for layouts, minimal Flexbox usage
- **Components**: Card-based design with consistent styling
- **Animations**: CSS keyframes for simple animations, GSAP for complex ones
- **Accessibility**: Proper ARIA labels and keyboard navigation

## 📱 Features

### Homepage

- Hero section with compelling messaging
- Service selection with interactive buttons
- Contact modal with form submission
- Responsive design for all devices

### Service Pages

- **Repair**: Detailed repair services and common issues
- **Replacement**: Door styles and options (Raised Panel, Carriage House, Flush Panel)
- **Openers**: LiftMaster opener products with MyQ features
- **Free Estimates**: Contact form for service quotes

### Contact System

- Modal contact form on homepage
- Dedicated contact page
- Email integration with Nodemailer
- Form validation and success messaging

## 🔧 Configuration

### Environment Variables

Create a `.env` file for email configuration:

```env
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_USER=your-email@domain.com
SMTP_PASS=your-email-password
```

### Email Setup

The contact form uses Nodemailer for email delivery. Configure your SMTP settings in the environment variables.

## 🚀 Deployment

This project is configured for deployment on Netlify:

1. Build the project: `pnpm build`
2. Deploy the `build` directory to Netlify
3. Configure environment variables in Netlify dashboard
4. Set up form handling for the contact form

## 📞 Contact Information

- **Phone**: 303.949.0688
- **Services**: Garage door repair, replacement, and opener installation
- **Coverage**: Local service area
- **Estimates**: Free estimates available

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is private and proprietary to Guardian Repairs.

---

Built with ❤️ for Guardian Repairs - Keeping Your Door Operating Exceptionally!
