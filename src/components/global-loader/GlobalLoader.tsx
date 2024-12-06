import { useIsFetching, useIsMutating } from '@tanstack/react-query';

import { Loader } from '../ui/Loader';

export const GlobalLoader = () => {
	const isMutating = useIsMutating();
	const isFetching = useIsFetching();

	return isFetching || isMutating ? (
		<div className='fixed top-layout right-layout z-50'>
			<Loader />
		</div>
	) : null;
};
