import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { TypeTimeBlock } from '@/types/time-block.types';

import { timeBlockService } from '@/services/time-block.service';

export const useTimeBlocks = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['timeBlocks'],
		queryFn: () => timeBlockService.getAllTimeBlocks()
	});

	const [items, setItems] = useState<TypeTimeBlock[] | undefined>(data?.data);

	useEffect(() => {
		setItems(data?.data);
	}, [data?.data]);

	return { items, setItems, isLoading };
};
