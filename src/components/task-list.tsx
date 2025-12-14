import type { Task } from '../App';
import { cn } from '../lib/utils';
import TaskItem from './task-item';

interface TaskListProps {
	listData: Task[];
	// setListData: React.Dispatch<React.SetStateAction<Task[]>>;
	actions: {
		deleteTask: (id: string) => void;
		completeTask: (id: string) => void;
		editTask: (id: string, title: string) => void;
	};
}

export default function TaskList({ listData, actions }: TaskListProps) {
	return (
		<div
			className={cn(
				'flex-1 flex flex-col gap-3 h-full max-h-[400px] overflow-y-auto',
				!listData?.length && 'justify-center'
			)}
		>
			{!listData?.length ? (
				<p className='text-center text-sm opacity-50' data-testid='no-tasks'>
					No tasks yet!
				</p>
			) : (
				listData.map((task) => (
					<div key={task.id} data-testid='task-item' className='w-full'>
						<TaskItem task={task} actions={actions} />
					</div>
				))
			)}
		</div>
	);
}
