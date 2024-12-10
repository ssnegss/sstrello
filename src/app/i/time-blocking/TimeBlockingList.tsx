import { DndContext, closestCenter } from '@dnd-kit/core';
import {
	SortableContext,
	verticalListSortingStrategy
} from '@dnd-kit/sortable';

import { Loader } from '@/components/ui/Loader';

import { TimeBlock } from './TimeBlock';
import styles from './TimeBlocking.module.scss';
import { calcHoursLeft } from './calc-hours-left';
import { useTimeBlockDnd } from './hooks/useTimeBlockDnd';
import { useTimeBlocks } from './hooks/useTimeBlocks';

export const TimeBlockingList = () => {
	const { items, setItems, isLoading } = useTimeBlocks();
	const { handleDragEnd, sensors } = useTimeBlockDnd(items, setItems);
	const { hoursLeft } = calcHoursLeft(items);

	if (isLoading) return <Loader />;

	return (
		<div>
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}
			>
				<div className={styles.list}>
					<SortableContext
						items={items || []}
						strategy={verticalListSortingStrategy}
					>
						{items?.length ? (
							items?.map(item => (
								<TimeBlock
									key={item.id}
									item={item}
								/>
							))
						) : (
							<div>Add the first time-block on the right form</div>
						)}
					</SortableContext>
				</div>
			</DndContext>
			<div>
				{hoursLeft > 0
					? `${hoursLeft} hours out of 24 left for sleep`
					: 'No hours left for sleep'}
			</div>
		</div>
	);
};
