import { useEffect, useRef, useState } from 'react';
import type { Task } from '../../App';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Input } from '../ui/input';

interface TaskItemProps extends React.HTMLAttributes<HTMLDivElement> {
	task: Task;
	actions: {
		deleteTask: (id: string) => void;
		completeTask: (id: string) => void;
		editTask: (id: string, title: string) => void;
	};
}

export default function TaskItem({ task, actions }: TaskItemProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [state, setState] = useState<string>(task.title || '');
	const inputRef = useRef<HTMLInputElement>(null);

	function handleApply() {
		if (!state.trim()) {
			actions.deleteTask(task.id);
			return;
		}
		actions.editTask?.(task.id, state);
		setIsEditing(false);
	}

	useEffect(() => {
		if (isEditing) {
			inputRef?.current?.focus();
		}
	}, [isEditing]);

	return (
		<div
			data-testid='task-div'
			className='flex items-center gap-2 justify-between px-3 py-2 bg-accent/60 rounded-md max-w-full'
		>
			<Checkbox
				id={task.id}
				data-testid='task-checkbox'
				checked={task.completed}
				onCheckedChange={() => actions.completeTask(task.id)}
				className='size-5 border-primary/80'
			/>
			<div className='grow overflow-x-auto'>
				{isEditing ? (
					<Input
						type='text'
						data-testid='edit-input'
						ref={inputRef}
						value={state}
						onChange={(e) => setState(e.target.value)}
						className={cn('w-full focus:ring-0 focus-visible:ring-0')}
					/>
				) : (
					<h4
						data-testid='task-title'
						className={cn('font-medium max-w-full truncate', task.completed && 'line-through opacity-50')}
					>
						{task.title}
					</h4>
				)}
			</div>

			{isEditing ? (
				<Button size='sm' onClick={handleApply} data-testid='apply-btn'>
					Apply
				</Button>
			) : (
				<Button variant='outline' size='sm' onClick={() => setIsEditing(true)} data-testid='edit-btn'>
					Edit
				</Button>
			)}

			<Button variant='destructive' size='sm' onClick={() => actions?.deleteTask(task.id)} data-testid='delete-btn'>
				Delete
			</Button>
		</div>
	);
}
