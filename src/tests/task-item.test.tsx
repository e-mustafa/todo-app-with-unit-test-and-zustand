import TaskItem from '@/components/task-item';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const actions = {
	deleteTask: jest.fn(),
	completeTask: jest.fn(),
	editTask: jest.fn(),
};

const task = { id: '1', title: 'Test Task', completed: false };

const clickEditButton = async () => {
	render(<TaskItem task={task} actions={actions} />);

	const editButton = screen.getByTestId('edit-btn');
	await userEvent.click(editButton);
};

describe('A. Render TaskItem Component', () => {
	// 1. task div should render
	test('1. renders task div', () => {
		render(<TaskItem task={task} actions={actions} />);
		const taskDiv = screen.getByTestId('task-div');
		expect(taskDiv).toBeInTheDocument();
	});

	// 2. Render task elements correctly (checkbox, title, edit, delete buttons)
	test('2. renders task elements correctly', () => {
		render(<TaskItem task={task} actions={actions} />);

		expect(screen.getByTestId('task-checkbox')).toBeInTheDocument();
		expect(screen.getByTestId('task-title')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
	});
});

describe('B. Checkbox Interactions', () => {
	// 3. checkbox unchecked if task uncompleted
	test('1. checkbox unchecked if task uncompleted', () => {
		render(<TaskItem task={task} actions={actions} />);
		const checkbox = screen.getByTestId('task-checkbox'); // as HTMLInputElement;
		expect(checkbox).not.toBeChecked();
	});

	// 4. checkbox checked if task completed
	test('2. checkbox checked if task completed', () => {
		render(<TaskItem task={{ ...task, completed: true }} actions={actions} />);
		const checkbox = screen.getByTestId('task-checkbox'); // as HTMLInputElement;
		expect(checkbox).toBeChecked();
	});

	// 5. checkbox should call completeTask action on change
	test('3. checkbox should call completeTask action on change', async () => {
		render(<TaskItem task={task} actions={actions} />);

		const checkbox = screen.getByTestId('task-checkbox');

		await userEvent.click(checkbox);

		expect(actions.completeTask).toHaveBeenCalledWith(task.id);
	});
});

describe('C. Edit Task Functionality', () => {
	// 6. Edit button should switch to editing mode
	test('1. edit button should switch to editing mode', async () => {
		await clickEditButton();

		expect(screen.getByTestId('edit-input')).toBeInTheDocument();
		expect(screen.getByTestId('apply-btn')).toBeInTheDocument();

		expect(screen.queryByTestId('task-title')).not.toBeInTheDocument();
		expect(screen.queryByTestId('edit-btn')).not.toBeInTheDocument();
	});

	// 7. input should get focus when converting to editing mode
	test('2. input should get focus when converting to editing mode', async () => {
		// render(<TaskItem task={task} actions={actions} />);
		// const editButton = screen.getByTestId('edit-btn');

		// await userEvent.click(editButton);
		await clickEditButton();

		const input = screen.getByTestId('edit-input');
		expect(input).toHaveFocus();
	});

	// 8. typing in input should update its value
	test('3. typing in input should update its value', async () => {
		await clickEditButton();

		const input = screen.getByTestId('edit-input') as HTMLInputElement;
		await userEvent.clear(input);
		await userEvent.type(input, 'Updated Task Title');

		expect(input).toHaveValue('Updated Task Title');
	});

	// 9. Apply button should save changes
	test('4. apply button should save changes', async () => {
		await clickEditButton();

		const input = screen.getByTestId('edit-input') as HTMLInputElement;
		await userEvent.clear(input);
		await userEvent.type(input, 'Updated Task Title');

		const applyButton = screen.getByTestId('apply-btn');
		await userEvent.click(applyButton);

		expect(actions.editTask).toHaveBeenCalledWith(task.id, 'Updated Task Title');
	});

	// 10. editing mode should exit after applying changes
	test('5. editing mode should exit after applying changes', async () => {
		await clickEditButton();

		const input = screen.getByTestId('edit-input') as HTMLInputElement;
		await userEvent.clear(input);
		await userEvent.type(input, 'Updated Task Title');

		const applyButton = screen.getByTestId('apply-btn');
		await userEvent.click(applyButton);

		expect(screen.queryByTestId('edit-input')).not.toBeInTheDocument();
		expect(screen.getByTestId('edit-btn')).toBeInTheDocument();
	});

	// 11. applying empty title should delete the task
	test('6. applying empty title should delete the task', async () => {
		await clickEditButton();
		const input = screen.getByTestId('edit-input');
		const applyBtn = screen.getByRole('button', { name: /apply/i });
		await userEvent.clear(input);
		await userEvent.click(applyBtn);

		expect(actions.deleteTask).toHaveBeenCalledWith(task.id);
	});
});

describe('D. Delete task Functionality', () => {
	// 12. Delete button should call deleteTask action
	test('1. Delete button should call deleteTask action ', async () => {
		render(<TaskItem task={task} actions={actions} />);

		const deleteBtn = screen.getByRole('button', { name: /delete/i });
		await userEvent.click(deleteBtn);

		expect(actions.deleteTask).toHaveBeenNthCalledWith(1, task.id);
	});
});
