import TaskItem from '@/components/pattern-container-presentational/task-item';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// A. rendering
// 1. renders task elements

// B. checkbox behavior
// 2. checkbox reflects task completion state
// 3. clicking checkbox calls completeTask

// C. edit mode
// 4. enters edit mode when clicking edit
// 5. focuses input on edit mode
// 6. updates value while typing
// 7. applies changes on apply button click
// 8. empty title deletes task

// D. delete functionality
// 9. delete button calls deleteTask

const actions = {
	completeTask: jest.fn(),
	editTask: jest.fn(),
	deleteTask: jest.fn(),
};

jest.mock('@/store/tasks.store', () => ({
	useStore: () => actions,
}));

const testText = 'edit task';
const task = { id: '1', title: 'task 1', completed: false };

const setup = (overrideTask = task) => {
	const user = userEvent.setup();
	render(<TaskItem task={overrideTask} />);
	return { user };
};

beforeEach(() => jest.clearAllMocks());

describe('TaskItem Component', () => {
	describe('A. Rendering', () => {
		test('1. renders task elements', () => {
			setup();
			expect(screen.getByTestId('task-div')).toBeInTheDocument();
			expect(screen.getByRole('checkbox')).toBeInTheDocument();
			expect(screen.getByTestId('task-title')).toBeInTheDocument();
			expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();
			expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
		});
	});

	describe('B. checkbox behavior', () => {
		test('2. checkbox reflects task completion state', () => {
			setup({ ...task, completed: true });

			expect(screen.getByRole('checkbox')).toBeChecked();
		});

		test('3. clicking checkbox calls completeTask', async () => {
			const { user } = setup();

			await user.click(screen.getByRole('checkbox'));

			expect(actions.completeTask).toHaveBeenNthCalledWith(1, task.id);
		});
	});

	describe('C. edit mode', () => {
		test('4. enters edit mode when clicking edit', async () => {
			const { user } = setup();

			await user.click(screen.getByRole('button', { name: /edit/i }));

			expect(screen.getByTestId('edit-input')).toBeInTheDocument();
			expect(screen.getByRole('button', { name: /apply/i })).toBeInTheDocument();

			expect(screen.queryByTestId('task-title')).toBeNull();
			expect(screen.queryByRole('button', { name: /edit/i })).toBeNull();
		});

		test('5. focuses input on edit mode', async () => {
			const { user } = setup();

			await user.click(screen.getByRole('button', { name: /edit/i }));

			expect(screen.getByTestId('edit-input')).toHaveFocus();
		});

		test('6. updates value while typing', async () => {
			const { user } = setup();

			await user.click(screen.getByRole('button', { name: /edit/i }));
			const input = screen.getByTestId('edit-input');

			expect(input).toHaveFocus();

			await user.clear(input);
			await user.type(input, testText);

			expect(input).toHaveValue(testText);
		});

		test('7. applies changes on apply button click', async () => {
			const { user } = setup();

			await user.click(screen.getByRole('button', { name: /edit/i }));

			const input = screen.getByTestId('edit-input');
			await user.clear(input);
			await user.type(input, testText);

			await user.click(screen.getByRole('button', { name: /apply/i }));

			expect(actions.editTask).toHaveBeenCalledWith(task.id, testText);

			expect(screen.getByTestId('task-title')).toBeInTheDocument();
			expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();

			expect(screen.queryByTestId('edit-input')).toBeNull();
			expect(screen.queryByRole('button', { name: /apply/i })).toBeNull();
		});

		test('8. empty title deletes task', async () => {
			const { user } = setup();
			await user.click(screen.getByRole('button', { name: /edit/i }));
			const input = screen.getByTestId('edit-input');
			await user.clear(input);

			await user.type(input, '   ');

			expect(input).toHaveValue('   ');

			await user.click(screen.getByRole('button', { name: /apply/i }));
			expect(actions.deleteTask).toHaveBeenCalledWith(task.id);
		});
	});

	describe('D. delete functionality', () => {
		test('9. delete button calls deleteTask', async () => {
			const { user } = setup();

			await user.click(screen.getByRole('button', { name: /delete/i }));

			expect(actions.deleteTask).toHaveBeenNthCalledWith(1, task.id);
		});
	});
});
