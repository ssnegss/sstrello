import { useMutation, useQueryClient } from '@tanstack/react-query';

import { timeBlockService } from '@/services/time-block.service';

export const useDeleteTimeBlock = () => {
	const queryClient = useQueryClient();

	const { mutate: deleteTimeBlock, isPending } = useMutation({
		mutationKey: ['deleteTimeBlock'],
		mutationFn: (id: string) => timeBlockService.deleteTimeBlock(id),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['timeBlocks']
			});
		}
	});

	return { deleteTimeBlock, isPending };
};
