import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface TaskFormViewProps {
	value: string;
	isError: boolean;
	onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
	inputRef?: React.RefObject<HTMLInputElement | null>;
}

export function TaskFormView({ value, isError, onInputChange, onSubmit, inputRef }: TaskFormViewProps) {
	return (
		<form className='flex w-full gap-2'>
			<div className='w-full grid gap-1.5'>
				<Input
					type='text'
					data-testid='task-input'
					ref={inputRef}
					value={value}
					onChange={(e) => onInputChange(e)}
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

			<Button type='button' onClick={onSubmit} data-testid='task-add-btn'>
				Add
			</Button>
		</form>
	);
}
