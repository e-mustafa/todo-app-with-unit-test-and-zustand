import TaskForm from '@/components/pattern-single-component/task-form';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('2. TaskForm Component', () => {
	test('2.1 should update input value when typing', async () => {
		render(<TaskForm addTask={() => {}} />);
		const input = screen.getByTestId('task-input');

		// Simulate user typing
		await userEvent.type(input, 'hello');

		// Verify input value
		expect(input).toHaveValue('hello');
	});

	test('2.2 should show error message if submitting empty task', async () => {
		const mockFn = jest.fn();
		render(<TaskForm addTask={mockFn} />);

		// Click add button without typing
		await userEvent.click(screen.getByTestId('task-add-btn'));

		// Validate
		const input = screen.getByTestId('task-input');
		expect(input).toBeInvalid();
		expect(screen.getByTestId('error-message')).toBeInTheDocument();
		expect(mockFn).not.toHaveBeenCalled();
	});

	test('2.3 should call addTask when entering a valid task', async () => {
		const mockFn = jest.fn();
		render(<TaskForm addTask={mockFn} />);

		const input = screen.getByTestId('task-input');

		// Type valid text
		await userEvent.type(input, 'new task');
		await userEvent.click(screen.getByTestId('task-add-btn'));

		// Verify callback
		expect(mockFn).toHaveBeenCalledWith('new task');
	});

	test('2.4 should clear input after adding a task', async () => {
		const mockFn = jest.fn();
		render(<TaskForm addTask={mockFn} />);

		const input = screen.getByTestId('task-input');

		// Type and submit
		await userEvent.type(input, 'new task');
		await userEvent.click(screen.getByTestId('task-add-btn'));

		// Input should be cleared
		expect(input).toHaveValue('');
	});
});
