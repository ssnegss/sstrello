import { type Dispatch, type SetStateAction } from 'react';

import type { ITask } from '@/types/task.types';

import styles from './KanbanView.module.scss';

interface IKanbanAddCardInput {
	filterDate?: string;
	setItems: Dispatch<SetStateAction<ITask[] | undefined>>;
}

export function KanbanAddCardInput({ setItems, filterDate }: IKanbanAddCardInput) {
	const addRow = () => {
		setItems(prev => {
			if (!prev) return;

			return [
				...prev,
				{
					id: '',
					name: '',
					isCompleted: false,
					createdAt: filterDate
				}
			];
		});
	};

	return (
		<div className={styles.addRow}>
			<button
				onClick={addRow}
				className='italic opacity-40 text-sm'
			>
				Add task...
			</button>
		</div>
	);
}
