import { create } from 'zustand';
import { persist } from 'zustand/middleware';
interface Store {
	tasks: Task[];
	addTask: (title: Task['title']) => void;
	deleteTask: (id: Task['id']) => void;
	completeTask: (id: Task['id']) => void;
	editTask: (id: Task['id'], title: string) => void;
}

type Task = {
	id: string;
	title: string;
	completed: boolean;
};

export const useStore = create<Store>()(
	persist<Store>(
		(set) => ({
			tasks: [],
			addTask: (title: Task['title']) =>
				set((state) => {
					const NewTask = { id: Date.now().toString(), title, completed: false };
					return { tasks: [...state.tasks, NewTask] };
				}),
			completeTask: (id: Task['id']) => {
				console.log('id', id);

				return set((state) => ({
					tasks: state.tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)),
				}));
			},

			editTask: (id: Task['id'], title: string) =>
				set((state) => ({ tasks: state.tasks.map((task) => (task.id === id ? { ...task, title } : task)) })),

			deleteTask: (id: Task['id']) => set((state) => ({ tasks: state.tasks.filter((item) => item.id !== id) })),
		}),
		{ name: 'tasks-storage' }
	)
);
