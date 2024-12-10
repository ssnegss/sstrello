import { useMutation, useQueryClient } from '@tanstack/react-query';

import { TypeTaskUpdate } from '@/types/task.types';

import { taskService } from '@/services/task.service';

type UpdateTaskMutation = {
	id: string;
	data: TypeTaskUpdate;
};

export const useUpdateTask = (key?: string) => {
	const queryClient = useQueryClient();

	const { mutate: updateTask } = useMutation({
		mutationKey: ['updateTask', key],
		mutationFn: ({ id, data }: UpdateTaskMutation) =>
			taskService.updateTask(id, data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['tasks']
			});
		}
	});

	return { updateTask };
};
