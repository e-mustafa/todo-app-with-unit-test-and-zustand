// Tests for TaskList component (empty state, list rendering).

import TaskList from '@/components/pattern-single-component/task-list';
import { render, screen } from '@testing-library/react';

const actions = {
	deleteTask: jest.fn(),
	completeTask: jest.fn(),
	editTask: jest.fn(),
};

const items = [
	{ id: '1', title: 'task 1', completed: false },
	{ id: '2', title: 'task 2', completed: false },
	{ id: '3', title: 'task 3', completed: false },
];

describe('4. TaskList Component', () => {
	test('4.1 should show "no tasks" when list is empty', () => {
		render(<TaskList listData={[]} actions={actions} />);

		expect(screen.getByTestId('no-tasks')).toBeInTheDocument();
		expect(screen.queryAllByTestId('task-item')).toHaveLength(0);
	});

	test('4.2 should hide "no tasks" when tasks exist', () => {
		render(<TaskList listData={items} actions={actions} />);

		expect(screen.queryByTestId('no-tasks')).toBeNull();
	});

	test('4.3 should render the correct number of tasks', () => {
		render(<TaskList listData={items} actions={actions} />);

		expect(screen.getAllByTestId('task-item')).toHaveLength(3);
	});
});
