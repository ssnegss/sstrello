'use client';

import { DragDropContext } from '@hello-pangea/dnd';

import { useTaskDnd } from '../hooks/useTaskDnd';
import { useTasks } from '../hooks/useTasks';

import { KanbanColumn } from './KanbanColumn';
import styles from './KanbanView.module.scss';
import { COLUMNS } from '@/app/data/columns.data';

export function KanbanView() {
	const { items, setItems } = useTasks();
	const { onDragEnd } = useTaskDnd();

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className={styles.table}>
				<div className={styles.header}>
					<div>Task name</div>
					<div>Due date</div>
					<div>Priority</div>
					<div></div>
				</div>

				<div className={styles.parentsWrapper}>
					{COLUMNS.map(column => (
						<KanbanColumn
							items={items}
							label={column.label}
							value={column.value}
							setItems={setItems}
							key={column.value}
						/>
					))}
				</div>
			</div>
		</DragDropContext>
	);
}
