import App from '@/App';
import { render, screen } from '@testing-library/react';

// 1. title should be rendered

describe('1. App Component', () => {
	test('1.1 should render title', () => {
		// Render main app
		render(<App />);

		// Check UI elements
		const title = screen.getByTestId('app-title');
		expect(title).toBeInTheDocument();
	});
});
