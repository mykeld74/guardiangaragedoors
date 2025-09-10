type RevealOptions = {
	targets?: string;
	stagger?: number;
	duration?: number;
	y?: number;
	once?: boolean;
	triggerPoint?: string;
};

export function revealOnScroll(node: HTMLElement, options: RevealOptions = {}) {
	const {
		targets = undefined,
		stagger = 0.08,
		duration = 0.3,
		y = 100,
		once = false,
		triggerPoint = '0px 0px -5% 0px'
	} = options;

	const elements = targets ? Array.from(node.querySelectorAll<HTMLElement>(targets)) : [node];
	const animatedElements = new Set<HTMLElement>();

	// Set initial state
	elements.forEach((element) => {
		// Add reveal transition class with custom duration
		element.classList.add('revealTransition', 'revealHidden');
		element.style.setProperty('--reveal-duration', `${duration}s`);
		element.style.setProperty('--reveal-y', `${y}px`);
	});

	// Check if elements are already in viewport on load
	const checkInitialViewport = () => {
		elements.forEach((element, index) => {
			const rect = element.getBoundingClientRect();
			const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

			if (isInViewport && !animatedElements.has(element)) {
				setTimeout(
					() => {
						element.classList.remove('revealHidden');
						element.classList.add('revealVisible');
						animatedElements.add(element);
					},
					index * stagger * 1000
				);
			}
		});
	};

	// Check immediately and after a delay
	checkInitialViewport();
	setTimeout(checkInitialViewport, 100);

	// Create intersection observer
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				const element = entry.target as HTMLElement;
				const index = elements.indexOf(element);

				if (entry.isIntersecting && !animatedElements.has(element)) {
					// Animate in with stagger
					setTimeout(
						() => {
							element.classList.remove('revealHidden');
							element.classList.add('revealVisible');
							animatedElements.add(element);
						},
						index * stagger * 1000
					);

					if (once) {
						observer.unobserve(element);
					}
				} else if (!entry.isIntersecting && !once && animatedElements.has(element)) {
					// Animate out with reverse stagger
					const reverseIndex = elements.length - 1 - index;
					setTimeout(
						() => {
							element.classList.remove('revealVisible');
							element.classList.add('revealHidden');
							animatedElements.delete(element);
						},
						reverseIndex * stagger * 1000
					);
				}
			});
		},
		{
			threshold: 0.1,
			rootMargin: triggerPoint
		}
	);

	// Observe all elements
	elements.forEach((element) => {
		observer.observe(element);
	});

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
