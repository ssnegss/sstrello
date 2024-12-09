import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

import type { ITask } from '@/types/task.types';

import { FILTERS } from '@/app/data/columns.data';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export const filterTasks = (tasks: ITask[] | undefined, value: string) => {
	switch (value) {
		case 'today':
			return tasks?.filter(
				item =>
					dayjs(item.createdAt).isSame(FILTERS.today, 'day') &&
					!item.isCompleted
			);

		case 'tomorrow':
			return tasks?.filter(
				item =>
					dayjs(item.createdAt).isSame(FILTERS.tomorrow, 'day') &&
					!item.isCompleted
			);

		case 'on-this-week':
			return tasks?.filter(
				item =>
					!dayjs(item.createdAt).isSame(FILTERS.today) &&
					!dayjs(item.createdAt).isSame(FILTERS.tomorrow) &&
					dayjs(item.createdAt).isSameOrBefore(FILTERS['on-this-week']) &&
					!item.isCompleted
			);

		case 'on-next-week':
			return tasks?.filter(
				item =>
					dayjs(item.createdAt).isAfter(FILTERS['on-this-week']) &&
					dayjs(item.createdAt).isSameOrBefore(FILTERS['on-next-week']) &&
					!item.isCompleted
			);

		case 'later':
			return tasks?.filter(
				item =>
					(dayjs(item.createdAt).isAfter(FILTERS['on-next-week']) ||
						!item.createdAt) &&
					!item.isCompleted
			);

		case 'completed':
			return tasks?.filter(item => item.isCompleted);

		default:
			return [];
	}
};
