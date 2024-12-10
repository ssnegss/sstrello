import {
	DragEndEvent,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';

import type { TypeTimeBlock } from '@/types/time-block.types';

import { timeBlockService } from '@/services/time-block.service';

export const useTimeBlockDnd = (
	items: TypeTimeBlock[] | undefined,
	setItems: Dispatch<SetStateAction<TypeTimeBlock[] | undefined>>
) => {
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor)
	);

	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationKey: ['UpdateOrderTimeBlock'],
		mutationFn: (ids: string[]) => timeBlockService.updateTimeBlockOrder(ids),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['TimeBlocks']
			});
		}
	});

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		if (active.id !== over?.id && items) {
			const oldIndex = items.findIndex(item => item.id === active.id);
			const newIndex = items.findIndex(item => item.id === over?.id || '');

			if (oldIndex !== -1 && newIndex !== -1) {
				const newItems = arrayMove(items, oldIndex, newIndex);

				setItems(newItems);

				mutate(newItems.map(item => item.id));
			}
		}
	};

	return { handleDragEnd, sensors };
};
