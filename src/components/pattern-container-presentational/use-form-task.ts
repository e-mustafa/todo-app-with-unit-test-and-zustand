import { useStore } from '@/store/tasks.store';
import { useRef, useState } from 'react';

export default function useTaskForm() {
	const [value, setValue] = useState('');
	const [isError, setIsError] = useState(false);

	const { addTask } = useStore();
	const inputRef = useRef<HTMLInputElement>(null);

	function onSubmit(event: React.MouseEvent<HTMLButtonElement>) {
		event.preventDefault();
		if (!value.trim()) {
			setIsError(true);
			inputRef?.current?.focus();
			return;
		}
		setIsError(false);
		addTask(value!);
		setValue('');
		inputRef?.current?.focus();
	}

	function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		setValue(e.currentTarget.value);
		setIsError(false);
	}

	return {
		value,
		isError,
		onInputChange,
		onSubmit,
		inputRef,
	};
}
