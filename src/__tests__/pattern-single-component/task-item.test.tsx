// Tests for TaskItem component (edit, delete, complete, UI state).

import TaskItem from '@/components/pattern-single-component/task-item';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const task = { id: '1', title: 'Task 1', completed: false };
const completedTask = { ...task, completed: true };

describe('3. TaskItem Component', () => {
	let actions: any;

	beforeEach(() => {
		// Mock all action handlers
		actions = {
			deleteTask: jest.fn(),
			completeTask: jest.fn(),
			editTask: jest.fn(),
		};
	});

	test('3.1 should render the task item correctly', () => {
		render(<TaskItem task={task} actions={actions} />);
		expect(screen.getByTestId('task-div')).toBeInTheDocument();
	});

	test('3.2 should render checkbox, title, edit and delete buttons', () => {
		render(<TaskItem task={task} actions={actions} />);

		expect(screen.getByTestId('task-checkbox')).toBeInTheDocument();
		expect(screen.getByTestId('task-title')).toHaveTextContent(task.title);
		expect(screen.getByTestId('edit-btn')).toBeInTheDocument();
		expect(screen.getByTestId('delete-btn')).toBeInTheDocument();
	});

	test('3.3 checkbox should be checked if task is completed', () => {
		render(<TaskItem task={completedTask} actions={actions} />);
		expect(screen.getByTestId('task-checkbox')).toBeChecked();
	});

	test('3.4 clicking edit should switch to edit mode', async () => {
		render(<TaskItem task={task} actions={actions} />);

		await userEvent.click(screen.getByTestId('edit-btn'));

		expect(screen.getByTestId('edit-input')).toBeInTheDocument();
		expect(screen.getByTestId('apply-btn')).toBeInTheDocument();
		expect(screen.getByTestId('edit-input')).toHaveFocus();
	});

	test('3.5 input value should update while editing', async () => {
		render(<TaskItem task={task} actions={actions} />);

		await userEvent.click(screen.getByTestId('edit-btn'));
		const input = screen.getByTestId('edit-input');

		await userEvent.type(input, ' new');
		expect(input).toHaveValue('Task 1 new');
	});

	test('3.6 clicking Apply should save and exit edit mode', async () => {
		render(<TaskItem task={task} actions={actions} />);

		// Enter edit mode
		await userEvent.click(screen.getByTestId('edit-btn'));

		// Modify text
		await userEvent.type(screen.getByTestId('edit-input'), ' updated');

		// Confirm changes
		await userEvent.click(screen.getByTestId('apply-btn'));

		// Validate callback
		expect(actions.editTask).toHaveBeenCalledWith(task.id, 'Task 1 updated');

		// Ensure UI returned back
		expect(screen.queryByTestId('edit-input')).toBeNull();
		expect(screen.getByTestId('edit-btn')).toBeInTheDocument();
	});

	test('3.7 clicking delete should call deleteTask', async () => {
		render(<TaskItem task={task} actions={actions} />);

		await userEvent.click(screen.getByTestId('delete-btn'));
		expect(actions.deleteTask).toHaveBeenCalledWith(task.id);
	});

	test('3.8 clicking checkbox should call completeTask', async () => {
		render(<TaskItem task={task} actions={actions} />);

		await userEvent.click(screen.getByTestId('task-checkbox'));
		expect(actions.completeTask).toHaveBeenCalledWith(task.id);
	});
});
