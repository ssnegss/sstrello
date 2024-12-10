import debounce from 'lodash.debounce';
import { useCallback, useEffect } from 'react';
import { UseFormWatch } from 'react-hook-form';

import type { TypeTaskUpdate } from '@/types/task.types';

import { useCreateTask } from './useCreateTask';
import { useUpdateTask } from './useUpdateTask';

interface IUseTaskDebounce {
	itemId: string;
	watch: UseFormWatch<TypeTaskUpdate>;
}

export const useTaskDebounce = ({ itemId, watch }: IUseTaskDebounce) => {
	const { createTask } = useCreateTask();
	const { updateTask } = useUpdateTask();

	const debounceCreateTask = useCallback(
		debounce((formData: TypeTaskUpdate) => {
			createTask(formData);
		}, 444),
		[]
	);

	const debounceUpdateTask = useCallback(
		debounce((formData: TypeTaskUpdate) => {
			updateTask({ id: itemId, data: formData });
		}, 444),
		[]
	);

	useEffect(() => {
		const { unsubscribe } = watch(formData => {
			if (itemId) {
				debounceUpdateTask({
					...formData,
					priority: formData.priority || undefined
				});
			} else {
				if (formData.name) {
					debounceCreateTask(formData);
				}
			}
		});

		return () => {
			unsubscribe();
		};
	}, [watch(), debounceCreateTask, debounceUpdateTask]);
};
