import { useStore } from '@/store/tasks.store';
import type { Task } from '../../App';
import { cn } from '../../lib/utils';
import TaskItem from './task-item';

// interface TaskListProps {
// 	tasks: Task[];
// 	// setListData: React.Dispatch<React.SetStateAction<Task[]>>;
// 	actions: {
// 		deleteTask: (id: string) => void;
// 		completeTask: (id: string) => void;
// 		editTask: (id: string, title: string) => void;
// 	};
// }

export function TaskListView({ tasks }: { tasks: Task[] }) {
	return (
		<div
			className={cn(
				'flex-1 flex flex-col gap-3 h-full max-h-[400px] overflow-y-auto',
				!tasks?.length && 'justify-center'
			)}
		>
			{!tasks?.length ? (
				<p className='text-center text-sm opacity-50' data-testid='no-tasks'>
					No tasks yet!
				</p>
			) : (
				tasks.map((task) => (
					<div key={task.id} data-testid='task-item' className='w-full'>
						<TaskItem task={task} />
					</div>
				))
			)}
		</div>
	);
}

export default function TaskList() {
	const { tasks } = useStore();
	return <TaskListView tasks={tasks} />;
}
