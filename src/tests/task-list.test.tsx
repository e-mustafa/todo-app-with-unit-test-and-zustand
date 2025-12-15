import TaskList from '@/components/task-list';
import { render, screen } from '@testing-library/react';

const listData = [
	{ id: '1', title: 'task 1', completed: false },
	{ id: '2', title: 'task 2', completed: true },
	{ id: '3', title: 'task 3', completed: false },
];
const actions = { deleteTask: jest.fn(), completeTask: jest.fn(), editTask: jest.fn() };

describe('3. TaskList Component', () => {
	// 1. show "no tasks" when list is empty
	test('1. should show "no tasks" when list is empty', () => {
		render(<TaskList listData={[]} actions={actions} />);

		expect(screen.getByTestId('no-tasks')).toBeInTheDocument();
	});

	// 2. hide "no tasks" when tasks exist
	test('2. should hide "no tasks" when tasks exist', () => {
		render(<TaskList listData={listData} actions={actions} />);
		expect(screen.queryByTestId('no-tasks')).toBeNull();
	});

	// 3. render 3 items when list has 3 items
	test('3. should render 3 items when list has 3 items', () => {
		render(<TaskList listData={listData} actions={actions} />);
		expect(screen.getAllByTestId('task-item')).toHaveLength(listData.length);
	});
});
