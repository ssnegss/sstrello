'use client';

import { Loader } from '@/components/ui/Loader';

import { useProfile } from '@/hooks/useProfile';

export const Statistics = () => {
	const { data: profile, isLoading } = useProfile();

	return isLoading ? (
		<Loader />
	) : (
		<div className='grid grid-cols-4 gap-12 mt-7'>
			{profile?.statistics.length
				? profile?.statistics.map(statisticItem => (
						<div
							className='bg-border/5 rounded p-layout text-center hover:-translate-y-3 transition-transform duration-500'
							key={statisticItem.label}
						>
							<div className='text-xs'>{statisticItem.label}</div>
							<div className='text-xl font-semibold'>{statisticItem.value}</div>
						</div>
					))
				: ''}
		</div>
	);
};
