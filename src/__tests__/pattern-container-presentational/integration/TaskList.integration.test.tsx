import TaskList from '@/components/pattern-container-presentational/task-list';
import { render, screen } from '@testing-library/react';

// 'shows "No tasks yet!" when tasks is empty'
// 'renders tasks when tasks exist'
// 'does not show "no tasks" when tasks exist'

const useStoreMock = jest.fn();

jest.mock('@/store/tasks.store', () => ({
	useStore: () => useStoreMock(),
}));

const tasks = [
	{ id: '1', title: 'task 1', completed: false },
	{ id: '2', title: 'task 2', completed: true },
	{ id: '3', title: 'task 3', completed: false },
];

describe('TaskList Integration Tests', () => {
	// beforeEach(() => {
	// 	useStoreMock.mockReturnValue({
	// 		tasks: [],
	// 	});
	// });

	test('shows "No tasks yet!" when tasks is empty', () => {
		useStoreMock.mockReturnValue({ tasks: [] });
		render(<TaskList />);

		expect(screen.getByTestId('no-tasks')).toBeInTheDocument();
	});

	test('renders tasks when tasks exist', () => {
		useStoreMock.mockReturnValue({ tasks });

		render(<TaskList />);

		expect(screen.getAllByTestId('task-item')).toHaveLength(3);
	});

	test('does not show "no tasks" when tasks exist', () => {
		useStoreMock.mockReturnValue({ tasks });
		render(<TaskList />);

		expect(screen.queryByTestId('no-tasks')).toBeNull();
	});
});
