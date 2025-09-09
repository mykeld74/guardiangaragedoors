<script>
	let formData = $state({
		name: '',
		subject: '',
		phone: '',
		email: '',
		serviceType: '',
		message: ''
	});

	let isSubmitting = $state(false);
	let submitMessage = $state('');

	const serviceTypes = ['Replacement/New Installation', 'Repair', 'Opener', 'Free Estimate'];

	async function handleSubmit() {
		if (isSubmitting) return;

		isSubmitting = true;
		submitMessage = '';

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			});

			if (response.ok) {
				submitMessage = 'Thank you! Your message has been sent successfully.';
				formData = {
					name: '',
					subject: '',
					phone: '',
					email: '',
					serviceType: '',
					message: ''
				};
			} else {
				submitMessage = 'Sorry, there was an error sending your message. Please try again.';
			}
		} catch (error) {
			submitMessage = 'Sorry, there was an error sending your message. Please try again.';
		} finally {
			isSubmitting = false;
		}
	}
</script>

<div class="contactForm">
	<form onsubmit={handleSubmit}>
		<div class="formGroup">
			<input type="text" id="name" bind:value={formData.name} placeholder="Name" required />
		</div>

		<div class="formGroup">
			<input
				type="text"
				id="subject"
				bind:value={formData.subject}
				placeholder="Subject"
				required
			/>
		</div>

		<div class="formGroup">
			<input
				type="tel"
				id="phone"
				bind:value={formData.phone}
				placeholder="Phone Number"
				required
			/>
		</div>

		<div class="formGroup">
			<input type="email" id="email" bind:value={formData.email} placeholder="Email" required />
		</div>

		<div class="formGroup">
			<label for="serviceType" class="serviceLabel"> ✓ Type of service: </label>
			<select id="serviceType" bind:value={formData.serviceType} required>
				<option value="">Select a service type</option>
				{#each serviceTypes as type}
					<option value={type}>{type}</option>
				{/each}
			</select>
		</div>

		<div class="formGroup">
			<textarea
				id="message"
				bind:value={formData.message}
				placeholder="Your message..."
				rows="6"
				required
			></textarea>
		</div>

		<button type="submit" disabled={isSubmitting} class="submitButton">
			{isSubmitting ? 'Sending...' : 'Submit'}
		</button>

		{#if submitMessage}
			<div class="submitMessage" class:error={submitMessage.includes('error')}>
				{submitMessage}
			</div>
		{/if}
	</form>
</div>

<style>
	.contactForm {
		background-color: var(--formBackground, #2c2c2c);
		padding: 2rem;
		border-radius: 8px;
		max-width: 600px;
		margin: 0 auto;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.6);
		margin-top: 2rem;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.formGroup {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	input,
	select,
	textarea {
		font-family: 'Maven Pro', sans-serif;
		padding: 0.75rem;
		border: 1px solid var(--inputBorder, #555);
		border-radius: 4px;
		background-color: white;
		font-size: 1.3rem;
		transition: border-color 0.3s ease;
	}

	input:focus,
	select:focus,
	textarea:focus {
		outline: none;
		border-color: var(--primaryColor, #e74c3c);
	}

	.serviceLabel {
		font-family: 'Maven Pro', sans-serif;
		color: white;
		font-size: 1.3rem;
	}

	textarea {
		resize: vertical;
		min-height: 120px;
	}

	.submitButton {
		background-color: var(--submitColor, #e74c3c);
		color: white;
		border: none;
		padding: 1rem 2rem;
		font-size: 1.1rem;
		font-weight: bold;
		border-radius: 4px;
		cursor: pointer;
		transition: background-color 0.3s ease;
		align-self: flex-start;
	}

	.submitButton:hover:not(:disabled) {
		background-color: var(--submitHover, #c0392b);
	}

	.submitButton:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.submitMessage {
		padding: 1rem;
		border-radius: 4px;
		text-align: center;
		font-weight: 500;
		background-color: var(--successBackground, #d4edda);
		color: var(--successColor, #155724);
		border: 1px solid var(--successBorder, #c3e6cb);
	}

	.submitMessage.error {
		background-color: var(--errorBackground, #f8d7da);
		color: var(--errorColor, #721c24);
		border-color: var(--errorBorder, #f5c6cb);
	}

	@media (max-width: 768px) {
		.contactForm {
			padding: 1.5rem;
			margin: 0 1rem;
		}
	}
</style>
