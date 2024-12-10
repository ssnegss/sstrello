import cn from 'clsx';
import { GripVertical, Loader, Trash } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Checkbox } from '@/components/ui/Checkbox';
import { TransparentField } from '@/components/ui/field/TransparentField';
import { SingleSelect } from '@/components/ui/task-actions/SingleSelect';
import { DatePicker } from '@/components/ui/task-actions/date-picker/DatePicker';

import { type ITask, type TypeTaskUpdate } from '@/types/task.types';

import { useDeleteTask } from '../hooks/useDeleteTask';
import { useTaskDebounce } from '../hooks/useTaskDebounce';

import styles from './KanbanView.module.scss';
import { priorities } from '@/app/data/priorities.data';

interface IKanbanCard {
	item: ITask;
	setItems: Dispatch<SetStateAction<ITask[] | undefined>>;
}

export const KanbanCard = ({ item, setItems }: IKanbanCard) => {
	const { deleteTask, isDeletePending } = useDeleteTask();

	const { register, control, watch } = useForm<TypeTaskUpdate>({
		defaultValues: {
			name: item.name,
			isCompleted: item.isCompleted,
			createdAt: item.createdAt,
			priority: item.priority
		}
	});

	useTaskDebounce({ watch, itemId: item.id });
	return (
		<div
			className={cn(
				styles.card,
				{
					[styles.completed]: watch('isCompleted')
				},
				'animation-opacity'
			)}
		>
			<div className={styles.cardHeader}>
				<button aria-describedby='todo-item'>
					<GripVertical className={styles.grip} />
				</button>

				<Controller
					control={control}
					name='isCompleted'
					render={({ field: { value, onChange } }) => (
						<Checkbox
							onChange={onChange}
							checked={value}
						/>
					)}
				/>

				<TransparentField {...register('name')} />
			</div>

			<div className={styles.cardBody}>
				<Controller
					control={control}
					name='createdAt'
					render={({ field: { value, onChange } }) => (
						<DatePicker
							onChange={onChange}
							value={value || ''}
							position='left'
						/>
					)}
				/>

				<Controller
					control={control}
					name='priority'
					render={({ field: { value, onChange } }) => (
						<SingleSelect
							data={priorities.map(item => ({
								value: item,
								label: item
							}))}
							onChange={onChange}
							value={value || ''}
						/>
					)}
				/>
			</div>

			<div className={styles.cardActions}>
				<button
					onClick={() =>
						item.id ? deleteTask(item.id) : setItems(prev => prev?.slice(0, -1))
					}
					className='opacity-50 transition-opacity hover:opacity-100'
				>
					{isDeletePending ? <Loader size={15} /> : <Trash size={15} />}
				</button>
			</div>
		</div>
	);
};
