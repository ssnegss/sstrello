import { useMutation, useQueryClient } from '@tanstack/react-query';

import { TypeTaskUpdate } from '@/types/task.types';

import { taskService } from '@/services/task.service';

export const useCreateTask = () => {
	const queryClient = useQueryClient();

	const { mutate: createTask } = useMutation({
		mutationKey: ['create task'],
		mutationFn: (data: TypeTaskUpdate) => taskService.createTask(data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['tasks']
			});
		}
	});

	return { createTask };
};
