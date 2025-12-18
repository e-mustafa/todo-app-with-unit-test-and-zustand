import TaskForm from '@/components/pattern-container-presentational/task-form';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// 1. error + focus if input empty and click add
// 2. error disappears when typing
// 3. addTask is called and input is cleared

const testTask = 'test task';
const mockAddTask = jest.fn();

jest.mock('@/store/tasks.store', () => ({
	useStore: () => ({
		addTask: mockAddTask,
	}),
}));

describe('2.TaskForm integration test', () => {
	test('user can add a task successfully', async () => {
		render(<TaskForm />);

		// 1. error + focus if input empty and click add
		const input = screen.getByTestId('task-input');
		const addBtn = screen.getByRole('button', { name: /add/i });

		await userEvent.click(addBtn);

		expect(input).toBeInvalid();
		expect(input).toHaveFocus();

		const errorMsg = screen.getByTestId('error-message');

		expect(errorMsg).toBeInTheDocument();

		// 2. error disappears when typing
		await userEvent.type(input, testTask);

		expect(input).not.toBeInvalid();

		expect(screen.queryByTestId('error-message')).toBeNull();

		// 3. addTask is called and input is cleared
		await userEvent.click(addBtn);

		expect(mockAddTask).toHaveBeenNthCalledWith(1, testTask);
		expect(input).toHaveValue('');
	});
});
