import { Edit, GripVertical, Loader, Trash } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import type {
	TypeTimeBlock,
	TypeTimeBlockUpdate
} from '@/types/time-block.types';

import styles from './TimeBlocking.module.scss';
import { useDeleteTimeBlock } from './hooks/useDeleteTimeBlock';
import { useTimeBlockSortable } from './hooks/useTimeBlockSortable';

interface ITimeBlock {
	item: TypeTimeBlock;
}

export const TimeBlock = ({ item }: ITimeBlock) => {
	const { attributes, listeners, setNodeRef, style } = useTimeBlockSortable(
		item.id
	);

	const { reset } = useFormContext<TypeTimeBlockUpdate>();

	const { deleteTimeBlock, isDeletePending } = useDeleteTimeBlock();

	return (
		<div
			ref={setNodeRef}
			style={style}
		>
			<div
				className={styles.block}
				style={{
					backgroundColor: item.color || 'lightgray',
					height: `${item.duration}px`
				}}
			>
				<div className='flex items-center'>
					<button
						{...attributes}
						{...listeners}
						aria-describedby='time-block'
					>
						<GripVertical className={styles.grip} />
					</button>
					<div>
						{item.name}{' '}
						<i className='text-xs opacity-50'>({item.duration} min.)</i>
					</div>
				</div>

				<div className={styles.actions}>
					<button
						onClick={() => {
							reset({
								id: item.id,
								color: item.color,
								duration: item.duration,
								name: item.name,
								order: item.order
							});
						}}
						className='opacity-50 transition-opacity hover:opacity-100 mr-2'
					>
						<Edit size={16} />
					</button>
					<button
						onClick={() => deleteTimeBlock(item.id)}
						className='opacity-50 transition-opacity hover:opacity-100'
					>
						{isDeletePending ? <Loader size={16} /> : <Trash size={16} />}
					</button>
				</div>
			</div>
		</div>
	);
};
