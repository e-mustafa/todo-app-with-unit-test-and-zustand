import { TaskFormView } from './task-form-view';
import useTaskForm from './use-form-task';

export default function TaskForm() {
	const { value, isError, onInputChange, onSubmit, inputRef } = useTaskForm();
	return (
		<TaskFormView value={value} isError={isError} onInputChange={onInputChange} onSubmit={onSubmit} inputRef={inputRef} />
	);
}
