import { useEffect, useState } from 'react';
import TaskForm from './components/pattern-single-component/task-form';
import TaskList from './components/pattern-single-component/task-list';

export type Task = {
	id: string;
	title: string;
	completed: boolean;
};

// const tasks: Task[] = [
// 	{ id: '1', title: 'Task 1', completed: false },
// 	{ id: '2', title: 'Task 2', completed: true },
// 	{ id: '3', title: 'Task 3', completed: false },
// ];

export default function App() {
	const [listData, setListData] = useState<Task[]>(() => {
		const storedTasks = localStorage.getItem('tasks');
		return storedTasks ? JSON.parse(storedTasks) : [];
	});

	useEffect(() => {
		localStorage.setItem('tasks', JSON.stringify(listData));
	}, [listData]);

	function addTask(title: string) {
		const NewTask = { id: Date.now().toString(), title, completed: false };
		setListData([...listData, NewTask]);
	}

	function editTask(id: string, title: string) {
		setListData(listData.map((task) => (task.id === id ? { ...task, title } : task)));
	}

	function completeTask(id: string) {
		setListData(listData.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
	}

	function deleteTask(id: string) {
		setListData(listData.filter((task) => task.id !== id));
	}

	return (
		<div className='grid place-items-center min-h-dvh p-4 bg-[url("/background-01.jpg")] bg-no-repeat bg-cover'>
			<div className='fixed inset-0 bg-black/50'></div>
			<div className='flex flex-col gap-4 p-4 shadow shadow-primary/50 w-full max-w-[92dvw] sm:max-w-lg min-h-[400px] bg-background/50 backdrop-blur-md rounded-lg'>
				<h1 className='text-3xl font-bold text-center' data-testid='app-title'>
					To DO APP
				</h1>
				<TaskForm addTask={addTask} />
				<TaskList listData={listData} actions={{ editTask, completeTask, deleteTask }} />
			</div>
		</div>
	);
}
