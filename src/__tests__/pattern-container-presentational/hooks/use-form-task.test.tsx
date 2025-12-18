// 1. check initial state
import useTaskForm from '@/components/pattern-container-presentational/use-form-task';
import { act, renderHook } from '@testing-library/react';

// { value, isError, onInputChange, onSubmit, inputRef, };

// mock useStore
const addTaskMock = jest.fn();

jest.mock('@/store/tasks.store', () => ({
	useStore: () => ({
		addTask: addTaskMock,
	}),
}));
const taskText = 'test task';

// mock event for input change
const mockInput = (value: string) => {
	return {
		currentTarget: { value },
	} as React.ChangeEvent<HTMLInputElement>;
};

// const mockSubmitEvent = {
// 	preventDefault: jest.fn(),
// } as React.MouseEvent<HTMLButtonElement>;

const mockSubmitEvent = {
	preventDefault: jest.fn(),
};

describe('1.useTaskForm hook', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('1. should have initial state', () => {
		const {
			result: {
				current: { value, isError },
			},
		} = renderHook(() => useTaskForm());
		// console.log('result', result);
		expect(value).toBe('');
		expect(isError).toBe(false);
	});

	test('2. should update value on input change', async () => {
		const { result } = renderHook(() => useTaskForm());

		act(() => {
			result.current.onInputChange(mockInput(taskText));
		});

		// await onInputChange({ target: { value: taskText } } as React.ChangeEvent<HTMLInputElement>);
		// const { result: { current: { value } } } = renderHook(() => useTaskForm());
		expect(result.current.value).toBe(taskText);
	});

	test('3. should set isError on submitting empty value', () => {
		const { result } = renderHook(() => useTaskForm());

		act(() => {
			result.current.onSubmit(mockSubmitEvent as any);
		});

		expect(mockSubmitEvent.preventDefault).toHaveBeenCalled();
		expect(addTaskMock).not.toHaveBeenCalled();
		expect(result.current.value).toBe('');
		expect(result.current.isError).toBe(true);
	});

	test('focuses input on error', () => {
		const { result } = renderHook(() => useTaskForm());

		const focusFn = jest.fn();
		result.current.inputRef.current = { focus: focusFn } as any;

		act(() => {
			result.current.onSubmit(mockSubmitEvent as any);
		});

		expect(focusFn).toHaveBeenCalled();
	});

	test('4. should not call addTask on submitting whitespace value', () => {
		const { result } = renderHook(() => useTaskForm());

		act(() => {
			result.current.onInputChange(mockInput('   '));
		});

		act(() => {
			result.current.onSubmit(mockSubmitEvent as any);
		});

		expect(mockSubmitEvent.preventDefault).toHaveBeenCalled();

		expect(addTaskMock).not.toHaveBeenCalled();
		expect(result.current.isError).toBe(true);
	});

	test('5. should clear error on input change after error', () => {
		const { result } = renderHook(() => useTaskForm());

		act(() => {
			result.current.onSubmit(mockSubmitEvent as any);
		});

		expect(result.current.isError).toBe(true);
		act(() => {
			result.current.onInputChange(mockInput(taskText));
		});

		expect(result.current.value).toBe(taskText);
		expect(result.current.isError).toBe(false);
	});

	test('6. should call addTask on valid submit', () => {
		const { result } = renderHook(() => useTaskForm());

		act(() => {
			result.current.onInputChange(mockInput(taskText));
		});

		expect(result.current.isError).toBe(false);
		expect(result.current.value).toBe(taskText);

		act(() => {
			result.current.onSubmit(mockSubmitEvent as any);
		});

		expect(mockSubmitEvent.preventDefault).toHaveBeenCalled();
		expect(addTaskMock).toHaveBeenNthCalledWith(1, taskText);
		expect(result.current.value).toBe('');
		expect(result.current.isError).toBe(false);
	});
});
