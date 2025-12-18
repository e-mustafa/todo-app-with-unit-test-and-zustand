import App from '@/App';
import { render, screen } from '@testing-library/react';

describe('1. App Component', () => {
	test('1.1 should render title', () => {
		// Render main app
		render(<App />);

		// Check UI elements
		expect(screen.getByTestId('app-title')).toBeInTheDocument();
		expect(screen.getByTestId('task-input')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
	});
});
