import { TaskListView } from '@/components/pattern-container-presentational/task-list';
import { render, screen } from '@testing-library/react';

// import { useStore } from '@/store/tasks.store';
// jest.mock('@/store/tasks.store');
// const mockUseStore = useStore as jest.MockedFunction<typeof useStore>;

// 1. show "no tasks" when list is empty
// 2. hide "no tasks" when tasks exist
// 3. render 3 items when list has 3 items

const tasks = [
	{ id: '1', title: 'task 1', completed: false },
	{ id: '2', title: 'task 2', completed: true },
	{ id: '3', title: 'task 3', completed: false },
];

describe('3. TaskList Component', () => {
	test('1. should show "no tasks" when list is empty', () => {
		render(<TaskListView tasks={[]} />);

		expect(screen.getByTestId('no-tasks')).toBeInTheDocument();
	});

	test('2. should hide "no tasks" when tasks exist', () => {
		render(<TaskListView tasks={tasks} />);
		expect(screen.queryByTestId('no-tasks')).toBeNull();
	});

	test('3. should render 3 items when list has 3 items', () => {
		render(<TaskListView tasks={tasks} />);
		expect(screen.getAllByTestId('task-item')).toHaveLength(tasks.length);
	});
});
