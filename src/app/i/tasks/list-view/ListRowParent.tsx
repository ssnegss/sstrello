import { Draggable, Droppable } from '@hello-pangea/dnd';
import { Dispatch, SetStateAction } from 'react';

import type { ITask } from '@/types/task.types';

import { filterTasks } from '../filter-tasks';

import { ListAddRowInput } from './ListAddRowInput';
import { ListRow } from './ListRow';
import styles from './ListView.module.scss';
import { FILTERS } from '@/app/data/columns.data';

interface IListRowParent {
	value: string;
	label: string;
	items: ITask[] | undefined;
	setItems: Dispatch<SetStateAction<ITask[] | undefined>>;
}

export const ListRowParent = ({
	value,
	label,
	items,
	setItems
}: IListRowParent) => {
	return (
		<Droppable droppableId={value}>
			{provided => (
				<div
					ref={provided.innerRef}
					{...provided.droppableProps}
				>
					<div className={styles.colHeading}>
						<div className='w-full'>{label}</div>
					</div>

					{filterTasks(items, value)?.map((item, index) => (
						<Draggable
							key={item.id}
							draggableId={item.id}
							index={index}
						>
							{provided => (
								<div
									ref={provided.innerRef}
									{...provided.draggableProps}
									{...provided.dragHandleProps}
								>
									<ListRow
										key={item.id}
										item={item}
										setItems={setItems}
									/>
								</div>
							)}
						</Draggable>
					))}

					{provided.placeholder}

					{value !== 'completed' && !items?.some(item => !item.id) && (
						<ListAddRowInput
							setItems={setItems}
							filterDate={FILTERS[value] ? FILTERS[value].format() : undefined}
						/>
					)}
				</div>
			)}
		</Droppable>
	);
};
