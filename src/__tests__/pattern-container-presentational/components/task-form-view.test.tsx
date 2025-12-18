import { TaskFormView } from '@/components/pattern-container-presentational/task-form-view';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// 1. renders input and button
// 2. input has correct value
// 3. renders error message when isError is true
// 4. does not render error message when isError is false
// 5. sets aria-invalid when isError is true
// 6. calls onInputChange when typing
// 7. calls onSubmit when clicking add

const addTask = jest.fn();
const inputChange = jest.fn();

const testTask = 'test task';

const renderForm = ({ value = testTask, isError = false }) => {
	render(<TaskFormView value={value} isError={isError} onInputChange={inputChange} onSubmit={addTask} />);
	const input = screen.getByTestId('task-input');
	const addBtn = screen.getByRole('button', { name: /add/i });
	return { input, addBtn };
};

describe('TaskFormView component', () => {
	test('1. renders input and button', () => {
		const { input, addBtn } = renderForm({});

		expect(input).toBeInTheDocument();
		expect(addBtn).toBeInTheDocument();
	});

	test('2. input has correct value', () => {
		const { input } = renderForm({});
		expect(input).toHaveValue(testTask);
	});

	test('3. renders error message when isError is true', () => {
		renderForm({ value: '', isError: true });

		const errorMsg = screen.getByTestId('error-message');
		expect(errorMsg).toBeInTheDocument();
	});

	test('4. does not render error message when isError is false', () => {
		renderForm({ value: testTask, isError: false });

		const errorMsg = screen.queryByTestId('error-message');
		expect(errorMsg).toBeNull();
	});

	test('5. sets aria-invalid when isError is true', () => {
		const { input } = renderForm({ isError: true });

		expect(input).toHaveAttribute('aria-invalid', 'true');
	});

	test('6. calls onInputChange when typing', async () => {
		const { input } = renderForm({ isError: true });

		await userEvent.type(input, testTask);

		expect(inputChange).toHaveBeenCalled();
	});

	test('7. calls onSubmit when clicking add', async () => {
		const { addBtn } = renderForm({});

		await userEvent.click(addBtn);

		expect(addTask).toHaveBeenCalledTimes(1);
	});
});
