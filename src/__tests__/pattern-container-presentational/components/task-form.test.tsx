import TaskForm from '@/components/pattern-container-presentational/task-form';
import { render, screen } from '@testing-library/react';

// 1. should render input and add button

// jest.mock('@/components/pattern-container-presentational/use-form-task', () => {
// 	const originalModule = jest.requireActual('@/components/pattern-container-presentational/use-form-task');
// 	return {
// 		__esModule: true,
// 		...originalModule,
// 		TaskFormView: jest.fn((props) => originalModule.TaskFormView(props)),
// 	};
// });

jest.mock('@/components/pattern-container-presentational/use-form-task', () => () => ({
	value: 'test',
	isError: false,
	onInputChange: jest.fn(),
	onSubmit: jest.fn(),
	inputRef: { current: null },
}));

describe('2.TaskForm (container)', () => {
	test('1. should render input and add button', () => {
		render(<TaskForm />);

		const input = screen.getByTestId('task-input');
		const addBtn = screen.getByRole('button', { name: /add/i });

		expect(input).toBeInTheDocument();
		expect(addBtn).toBeInTheDocument();
	});
});
