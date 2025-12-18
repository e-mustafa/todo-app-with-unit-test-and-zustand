import { cn } from '@/lib/utils';
import { useRef, useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export default function TaskForm({ addTask }: { addTask: (title: string) => void }) {
	const [value, setValue] = useState('');
	const [isError, setIsError] = useState(false);

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

	return (
		<form className='flex w-full gap-2'>
			<div className='w-full grid gap-1.5'>
				<Input
					type='text'
					data-testid='task-input'
					ref={inputRef}
					value={value}
					onChange={(e) => {
						setValue(e.currentTarget.value);
						setIsError(false);
					}}
					placeholder='Write task name...'
					className={cn('border-primary/80')}
					aria-invalid={isError}
				/>
				{isError && (
					<p className='text-sm text-destructive' data-testid='error-message'>
						Task name can not be empty.
					</p>
				)}
			</div>
			<Button type='submit' onClick={onSubmit} data-testid='task-add-btn'>
				Add
			</Button>
		</form>
	);
}
