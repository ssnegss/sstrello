import { useMutation, useQueryClient } from '@tanstack/react-query';

import { TypeTimeBlockUpdate } from '@/types/time-block.types';

import { timeBlockService } from '@/services/time-block.service';

type UpdateTimeBlockMutation = {
	id: string;
	data: TypeTimeBlockUpdate;
};

export const useUpdateTimeBlock = () => {
	const queryClient = useQueryClient();

	const { mutate: updateTimeBlock, isPending } = useMutation({
		mutationKey: ['updateTimeBlock'],
		mutationFn: ({ id, data }: UpdateTimeBlockMutation) =>
			timeBlockService.updateTimeBlock(id, data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['timeBlocks']
			});
		}
	});

	return {
		updateTimeBlock,
		isPending
	};
};
