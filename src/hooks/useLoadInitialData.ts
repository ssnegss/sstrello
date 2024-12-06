import { useEffect } from 'react';
import type { UseFormReset } from 'react-hook-form';

import type { TypeUserForm } from '@/types/auth.types';

import { useProfile } from './useProfile';

export const useLoadInitialData = (reset: UseFormReset<TypeUserForm>) => {
	const { data, isSuccess } = useProfile();

	useEffect(() => {
		if (isSuccess && data) {
			reset({
				email: data.user.email,
				name: data.user.name,
				breakInterval: data.user.breakInterval,
				intervalsCount: data.user.intervalsCount,
				workInterval: data.user.workInterval
			});
		}
	}, [isSuccess]);
};
