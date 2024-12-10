import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { TypeTimeBlockUpdate } from '@/types/time-block.types';

import { timeBlockService } from '@/services/time-block.service';

export const useCreateTimeBlock = () => {
	const queryClient = useQueryClient();

	const { mutate: createTimeBlock, isPending } = useMutation({
		mutationKey: ['createTimeBlock'],
		mutationFn: (data: TypeTimeBlockUpdate) =>
			timeBlockService.createTimeBlock(data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['timeBlocks']
			});
		}
	});
	return { createTimeBlock, isPending };
};
