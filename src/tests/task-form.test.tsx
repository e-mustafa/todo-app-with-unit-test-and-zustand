import TaskForm from '@/components/task-form';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const addTask = jest.fn();
const testTask = 'test task';

const renderForm = () => {
	render(<TaskForm addTask={addTask} />);
	const input = screen.getByTestId('task-input');
	const addBtn = screen.getByRole('button', { name: /add/i });
	return { input, addBtn };
};

describe('2.TaskForm Component', () => {
	// 1. should render input and add button
	test('1. should render input and add button', () => {
		const { input, addBtn } = renderForm();

		expect(input).toBeInTheDocument();
		expect(addBtn).toBeInTheDocument();
	});

	// 2. should update input value when typing
	test('2. should update input value when typing', async () => {
		const { input } = renderForm();
		await userEvent.type(input, testTask);
		expect(input).toHaveValue(testTask);
	});

	// 3. should show error message if submitting empty task
	test('3. should show error message if submitting empty task', async () => {
		const { input, addBtn } = renderForm();

		// click add button without typing
		await userEvent.click(addBtn);

		expect(input).toBeInvalid();

		// error message should be visible
		const errorMessage = screen.getByTestId('error-message');
		expect(errorMessage).toBeInTheDocument();
	});

	// 4. should input focused on error
	test('4. should input focused on error', async () => {
		const { input, addBtn } = renderForm();
		await userEvent.click(addBtn);
		expect(input).toHaveFocus();
	});

	// 5. type in invalid input remove invalid and show error message
	test('5. type in invalid input remove invalid and show error message', async () => {
		const { input, addBtn } = renderForm();

		await userEvent.click(addBtn);
		await userEvent.type(input, testTask);

		expect(input).not.toBeInvalid();

		// error message should be hidden
		const errorMessage = screen.queryByTestId('error-message');
		expect(errorMessage).toBeNull();
	});

	// 6. should call addTask when entering a valid task
	test('6. should call addTask when entering a valid task', async () => {
		const { input, addBtn } = renderForm();
		await userEvent.type(input, testTask);
		await userEvent.click(addBtn);

		expect(addTask).toHaveBeenCalledWith(testTask);
	});

	// 7. should clear and focus input after adding a task
	test('7. should clear and focus input after adding a task', async () => {
		const { input, addBtn } = renderForm();

		// type and submit
		await userEvent.type(input, testTask);
		await userEvent.click(addBtn);

		// input cleared and focused
		expect(input).toHaveValue('');
		expect(input).toHaveFocus();
	});
});
